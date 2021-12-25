const pixelmatch = require('pixelmatch')

const getNotificator = require('./notification')
const screenshot = require('./screenshot')

const startApp = async () => {
  const pixelsChangedThreshold = 75000
  const msToNextPrint = 3000
  const timeoutInMinutes = 10
  const timeoutInSeconds = timeoutInMinutes * 60
  const notificationType = 'email'
  const notificator = getNotificator(notificationType)
  const timerStart = process.hrtime()

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
      notificator({
        subject: 'Importação finalizada',
        message: 'A importação acabou'
      })
      screenChanged = true
    }

    const [secondsPassed] = process.hrtime(timerStart)
    if (secondsPassed > timeoutInSeconds) {
      console.log('Timeout')
      notificator({
        subject: 'Timeout estourado',
        message: 'Provavelmente alguma coisa deu errado.'
      })
      screenChanged = true
    }
  }
}

startApp()
