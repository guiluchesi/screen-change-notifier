const { getNotificator } = require('./notification')
const screenshot = require('./screenshot')
const screenChangeExceedsThreshold = require('./comparator')

const app = async (appConfiguration) => {
  const {
    notificationType,
    msDelayToScreenshot,
    pixelsChangedThreshold,
    timeoutInMinutes
  } = appConfiguration

  const notificator = getNotificator(notificationType)
  const timerStart = process.hrtime()
  const timeoutInSeconds = timeoutInMinutes * 60

  console.log('Tirando print de base')
  const baseScreenshot = await screenshot(msDelayToScreenshot)

  let screenChanged = false
  while (!screenChanged) {
    console.log('Tirando print de comparação')
    const currentScreen = await screenshot(msDelayToScreenshot)

    console.log('Comparando telas')
    screenChanged = screenChangeExceedsThreshold(currentScreen, baseScreenshot, pixelsChangedThreshold)

    if (screenChanged) {
      console.log('Tela diferente')
      notificator({
        subject: 'Importação finalizada',
        message: 'A importação acabou'
      })
      return
    }

    const [secondsPassed] = process.hrtime(timerStart)
    console.log(secondsPassed)
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

module.exports = app
