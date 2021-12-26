const { getNotificator, notificationMethods } = require('./')

describe('Get notificator', () => {
  it('should return the notificator required', () => {
    const notificator = getNotificator('email')

    expect(notificator).toBe(notificationMethods.get('email'))
  })

  it('should return a function that log that the method is not implemented', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementationOnce(jest.fn)

    const notificator = getNotificator('test')
    notificator()

    expect(notificator).toEqual(expect.any(Function))
    expect(logSpy).toBeCalledWith('Método de notificação não implementado')
  })
})
