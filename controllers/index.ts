import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
})

export const mailOptions = (to: string, token: string) => ({
  from: process.env.EMAIL,
  to,
  subject: 'Account Registration Confirmation',
  html: `<div>
    <h1>Hello</h1>
    <p>Thank you for registering an account with our website!</p>
    <p>Please click <a href="http://localhost:3000/?token=${token}">here</a> to confirm your email address.</p>
  </div>`,
})
