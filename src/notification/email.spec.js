require('dotenv').config()

const nodemailer = require('nodemailer')
const emailNotificator = require('./email')

jest.mock('nodemailer')

describe('Email notificator', () => {
  const params = {
    subject: 'Teste de notificação',
    message: 'Mensagem de teste'
  }

  const mockSendMail = jest.fn().mockReturnThis()

  beforeAll(() => {
    nodemailer.createTransport.mockImplementation(() => ({
      sendMail: mockSendMail
    }))
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should user\'s env variables to authenticate', () => {
    emailNotificator(params)

    const expectedAuth = {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
    const mailTransporter = nodemailer.createTransport.mock.calls[0][0]
    expect(mailTransporter.auth).toEqual(expectedAuth)
  })

  it('should send an email using the subject and message passed by params', () => {
    emailNotificator(params)

    expect(mockSendMail).toHaveBeenCalled()

    const mailConfiguration = mockSendMail.mock.calls[0][0]
    const expectedMessage = `<h1>${params.message}</h1>`
    expect(mailConfiguration.subject).toBe(params.subject)
    expect(mailConfiguration.html).toBe(expectedMessage)
  })
})
