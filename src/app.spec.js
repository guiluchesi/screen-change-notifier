const { getNotificator } = require('./notification')
const screenshot = require('./screenshot')
const screenChangeExceedsThreshold = require('./comparator')

const app = require('./app')

jest.mock('./notification')
jest.mock('./screenshot')
jest.mock('./comparator')

describe('Screen change notifier', () => {
  const appConfiguration = {
    notificationType: 'email',
    timeoutInMinutes: 5,
    msDelayToScreenshot: 3000,
    pixelsChangedThreshold: 75000
  }

  const logSpy = jest.spyOn(console, 'log')
  const timerSpy = jest.spyOn(process, 'hrtime')
  const mockNotificator = jest.fn()
  const mockScreen = {
    data: Buffer.from('screen'),
    width: 1920,
    height: 1080
  }

  beforeAll(() => {
    logSpy.mockImplementation(jest.fn)
    getNotificator.mockReturnValue(mockNotificator)
    screenshot.mockResolvedValue(mockScreen)
    screenChangeExceedsThreshold.mockReturnValue(true)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should get a notificator based on the notification prop type', async () => {
    await app(appConfiguration)
    expect(getNotificator).toBeCalledWith(appConfiguration.notificationType)

    const telegramConfig = {
      ...appConfiguration,
      notificationType: 'telegram'
    }
    await app(telegramConfig)
    expect(getNotificator).toBeCalledWith(telegramConfig.notificationType)
  })

  it('should start a timer', async () => {
    await app(appConfiguration)

    expect(timerSpy).toBeCalled()
  })

  it('should take a screenshot to be the comparison base with a given delay', async () => {
    await app(appConfiguration)

    expect(screenshot).toBeCalledTimes(2)
    expect(screenshot).toBeCalledWith(appConfiguration.msDelayToScreenshot)

    screenshot.mockClear()
    const lowerDelayConfig = {
      ...appConfiguration,
      msDelayToScreenshot: 1000
    }

    await app(lowerDelayConfig)

    expect(screenshot).toBeCalledTimes(2)
    expect(screenshot).toBeCalledWith(lowerDelayConfig.msDelayToScreenshot)
  })

  it('should take another screenshot and compare it to the base while the screen hasn\'t changed', async () => {
    screenChangeExceedsThreshold
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)

    await app(appConfiguration)

    expect(screenshot).toBeCalledTimes(3)
    expect(screenChangeExceedsThreshold).toBeCalledTimes(2)
    expect(screenChangeExceedsThreshold).toBeCalledWith(mockScreen, mockScreen, appConfiguration.pixelsChangedThreshold)
  })

  it('should call the notificator if the screen has changed', async () => {
    await app(appConfiguration)

    const sucessfulNotification = {
      subject: 'Importação finalizada',
      message: 'A importação acabou'
    }
    expect(mockNotificator).toBeCalledWith(sucessfulNotification)
  })

  it('should stop the loop if the timeout is reached', async () => {
    const timeoutSeconds = appConfiguration.timeoutInMinutes * 60 + 1
    timerSpy.mockReturnValueOnce([0, 0]).mockReturnValueOnce([timeoutSeconds, 0])
    screenChangeExceedsThreshold.mockReturnValueOnce(false)

    await app(appConfiguration)

    const timeoutNotification = {
      subject: 'Timeout estourado',
      message: 'Provavelmente alguma coisa deu errado.'
    }
    expect(mockNotificator).toBeCalledWith(timeoutNotification)
  })
})
