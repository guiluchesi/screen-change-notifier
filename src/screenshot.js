const desktopScreenshot = require('screenshot-desktop')
const PNG = require('pngjs').PNG

const { timeout } = require('./helpers')

const takeScreenshot = async (msToNextPrint = 3000) => {
  await timeout(msToNextPrint)
  const screenshotBuffer = await desktopScreenshot({ format: 'png' })
  return screenshotBuffer
}

const getScreenshotDetails = async (msToNextPrint = 3000) => {
  const screenshotBuffer = await takeScreenshot(msToNextPrint)
  const screenshot = PNG.sync.read(screenshotBuffer)
  return screenshot
}

module.exports = getScreenshotDetails