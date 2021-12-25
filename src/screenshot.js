const desktopScreenshot = require('screenshot-desktop')
const PNG = require('pngjs').PNG

const { timeout } = require('./helpers')

const getScreenshotDetails = async (msToNextPrint = 3000) => {
  await timeout(msToNextPrint)
  const screenshotBuffer = await desktopScreenshot({ format: 'png' })
  const screenshot = PNG.sync.read(screenshotBuffer)
  return screenshot
}

module.exports = getScreenshotDetails
