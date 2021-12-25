const pixelmatch = require('pixelmatch')
const screenChangeExceedsThreshold = require('./comparator')

jest.mock('pixelmatch')

describe('Screen comparator', () => {
  const threshold = 2000
  const pixelsChanged = 1000
  const screen1 = {
    data: Buffer.from('screen-1.png'),
    width: 100,
    height: 100
  }

  const screen2 = {
    ...screen1,
    data: Buffer.from('screen-2.png')
  }

  const logSpy = jest.spyOn(console, 'log')

  beforeAll(() => {
    logSpy.mockImplementation(jest.fn)
    pixelmatch.mockReturnValue(pixelsChanged)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('comparare both screens passed as params', () => {
    screenChangeExceedsThreshold(screen1, screen2, threshold)

    expect(pixelmatch)
      .toBeCalledWith(
        screen1.data,
        screen2.data,
        null,
        screen1.width,
        screen1.height
      )
  })

  it('should log the amount of pixels changed', () => {
    screenChangeExceedsThreshold(screen1, screen2, threshold)

    expect(logSpy).toBeCalledWith('Amount of pixels changed:', pixelsChanged)
  })

  it('return if the screen change is bigger than the threshold', () => {
    let result = screenChangeExceedsThreshold(screen1, screen2, threshold)
    expect(result).toBe(false)

    pixelmatch.mockReturnValue(threshold + 1)
    result = screenChangeExceedsThreshold(screen1, screen2, threshold)
    expect(result).toBe(true)
  })
})
