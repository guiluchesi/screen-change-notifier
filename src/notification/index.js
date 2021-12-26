const email = require('./email')

const notificationMethods = new Map([
  ['email', email]
])

/**
 * Get the notificator method based on the name informed
 * @param  {string} notificationType - The name of the notificator method
 * @param  {Map<string, function>} notificationOptions - The options of notificator methods (default: notificationMethods)
 * @returns {function} The notificator method
 */
const getNotificator = (notificationType, notificationOptions = notificationMethods) => {
  const notificator = notificationOptions.get(notificationType)
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
