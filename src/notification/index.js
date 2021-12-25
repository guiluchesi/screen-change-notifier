const email = require('./email')

const notiationMethods = {
  email
}

const getNotificator = (notificationType) => {
  const notificator = notiationMethods[notificationType]
  if (notificator) {
    return notificator
  } else {
    return () => {
      console.log('Método de notificação não implementado')
    }
  }
}

module.exports = getNotificator