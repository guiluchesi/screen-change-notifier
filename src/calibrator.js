const PNG = require('pngjs').PNG
const fs = require('fs')
const pixelmatch = require('pixelmatch')

/**
 * Compare two images and log the amout of pixel changed between the images
 * @param  {string} imageBasePath - The path to the base image
 * @param  {string} imageTocComparePath - The path to the image to compare with
 */
const calibrator = (imageBasePath, imageTocComparePath) => {
  const screen1 = PNG.sync.read(fs.readFileSync(imageBasePath))
  const screen2 = PNG.sync.read(fs.readFileSync(imageTocComparePath))

  const pixelChanged = pixelmatch(
    screen1.data,
    screen2.data,
    null,
    screen1.width,
    screen1.height
  )

  console.log('Amount of pixels changed:', pixelChanged)
}

calibrator('../img1.png', '../img2.png')
