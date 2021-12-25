const pixelmatch = require('pixelmatch')

const notificationHelpers = require('./notification')
const screenshot = require('./screenshot')

const startApp = async () => {
  const pixelsChangedThreshold = 75000
  const msToNextPrint = 3000
  const notificationType = 'email'

  console.log('Tirando print de base')
  const baseScreenshot = await screenshot(msToNextPrint)

  let lastPixelChanged = 0
  let screenChanged = false

  while (!screenChanged) {
    console.log('Tirando print de comparação')
    const currentScreen = await screenshot(msToNextPrint)

    console.log('Comparando telas')
    const pixelsChanged = pixelmatch(
      currentScreen.data,
      baseScreenshot.data,
      null,
      currentScreen.width,
      currentScreen.height
    );

    if (pixelsChanged !== lastPixelChanged) {
      console.log('Quantidade de pixels mudados', pixelsChanged)
      lastPixelChanged = pixelsChanged
    }

    if (pixelsChanged > pixelsChangedThreshold) {
      console.log('Tela diferente')
      const notificator = notificationHelpers[notificationType]
      if (notificator) {
        notificator()
      } else {
        console.log('Método de notificação não implementado')
      }
      screenChanged = true
    }
  }
}

startApp()
