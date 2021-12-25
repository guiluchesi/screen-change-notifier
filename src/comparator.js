const pixelmatch = require('pixelmatch')

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
