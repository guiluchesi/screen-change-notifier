const pixelmatch = require('pixelmatch')

/**
 * Compare two screenshots and return whether they are equal or not based on a threshold
 * @param {Buffer} screen1 - The base screenshot
 * @param {Buffer} screen2 - The screenshot to compare with
 * @param {integer} threshold - The threshold in pixels to consider the screen different
 * @returns {boolean} Whether the two screens are similar
 */
const screenChangeExceedsThreshold = (screen1, screen2, threshold) => {
  const pixelChanged = pixelmatch(
    screen1.data,
    screen2.data,
    null,
    screen1.width,
    screen1.height
  )

  console.log('Amount of pixels changed:', pixelChanged)
  return pixelChanged > threshold
}

module.exports = screenChangeExceedsThreshold
