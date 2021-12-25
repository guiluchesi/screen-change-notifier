const PNG = require('pngjs').PNG
const fs = require('fs')
const pixelmatch = require('pixelmatch')

const screen1 = PNG.sync.read(fs.readFileSync('../img1.png'))
const screen2 = PNG.sync.read(fs.readFileSync('../img2.png'))

const pixelChanged = pixelmatch(
  screen1.data,
  screen2.data,
  null,
  screen1.width,
  screen1.height
);

console.log('Amount of pixels changed:', pixelChanged)