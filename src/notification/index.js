const email = require('./email')

const notificationMethods = {
  email
}

const getNotificator = (notificationType, notificationOptions = notificationMethods) => {
  const notificator = notificationOptions[notificationType]
  if (notificator) {
    return notificator
  } else {
    return () => {
      console.log('Método de notificação não implementado')
    }
  }
}

module.exports = {
  notificationMethods,
  getNotificator
}
