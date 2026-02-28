const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')


const port = 5000

const app = express()

require('dotenv').config()


// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: 'New Contact Message',
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `
    })

    res.json({ message: 'Email sent successfully!' })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error sending email' })
  }
})


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})


