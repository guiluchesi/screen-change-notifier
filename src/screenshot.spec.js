const desktopScreenshot = require('screenshot-desktop')
const { setTimeout } = require('timers/promises')
const png = require('pngjs')

const getScreenshotDetails = require('./screenshot')

jest.mock('screenshot-desktop')
jest.mock('pngjs')
jest.mock('timers/promises')

describe('Desktop screenshot', () => {
  const mockScreenshotBuffer = Buffer.from('screenshot')
  const PNGMock = png.PNG.mockImplementation(() => ({
    sync: jest.fn().mockReturnThis(),
    read: jest.fn()
  }))

  beforeAll(() => {
    desktopScreenshot.mockResolvedValue(mockScreenshotBuffer)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call the timeout with the msToNextPrint', async () => {
    await getScreenshotDetails(1000)

    expect(setTimeout).toBeCalledWith(1000)
  })

  it('should take the screenshot as png', async () => {
    await getScreenshotDetails()

    expect(desktopScreenshot).toBeCalledWith({ format: 'png' })
  })

  it('should get screenshot details', async () => {
    await getScreenshotDetails()

    expect(PNGMock.sync.read).toBeCalledWith(mockScreenshotBuffer)
  })

  it('should return an object with the screenshot details', async () => {
    const screenDetails = {
      width: 1
    }
    PNGMock.sync.read.mockReturnValueOnce(screenDetails)

    const screenshot = await getScreenshotDetails()

    expect(screenshot).toEqual(screenDetails)
  })
})
