require("dotenv").config()

const nodemailer = require("nodemailer")

const notifyByEmail = ({ subject, message }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject,
    html: `<h1>${message}</h1>`
  }

  transporter.sendMail(mailOptions, function (err) {
    if (err) {
      console.log(err)
      return
    }

    console.log('Notificação enviada');
  });
}

module.exports = notifyByEmail