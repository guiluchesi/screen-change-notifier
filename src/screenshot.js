const desktopScreenshot = require('screenshot-desktop')
const PNG = require('pngjs').PNG

const { timeout } = require('./helpers')

/**
 * Take a sreenshot and process it returning its data
 * @param  {integer} msToNextPrint - The time to wait before taking the screenshot in milliseconds (default: 3000)
 * @returns {Promise<object>} The screenshot data with sizes and buffer
 */
const getScreenshotDetails = async (msToNextPrint = 3000) => {
  await timeout(msToNextPrint)
  const screenshotBuffer = await desktopScreenshot({ format: 'png' })
  const screenshot = PNG.sync.read(screenshotBuffer)
  return screenshot
}

module.exports = getScreenshotDetails
