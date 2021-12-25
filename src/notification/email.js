require("dotenv").config()

const nodemailer = require("nodemailer")

const notifyByEmail = () => {
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
    subject: 'Importação finalizada',
    html: '<h1>A importação acabou</h1>'
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