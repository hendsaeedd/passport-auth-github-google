import { RequestHandler } from 'express'
import { User } from '../models/user'
import { transporter, mailOptions } from './index'
import dotenv from 'dotenv'

dotenv.config()

//function to generate a random token
const generateToken = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  )
}

export const registerUser: RequestHandler = async (req, res) => {
  try {
    const { name, email, username } = req.body

    const newUser = await User.create({
      name,
      email,
      username,
    })

    const token = generateToken()
    await sendConfirmationEmail(email, token)

    res.json({ message: 'User was registered successfully', newUser })
  } catch (error: any) {
    console.error('Error registering user:', error)
    res.status(400).json({ error: error.message })
  }
}

export const sendConfirmationEmail = async (email: string, token: string) => {
  try {
    const confirmationMailOptions = mailOptions(email, token)
    await transporter.sendMail(confirmationMailOptions)
    console.log('Confirmation email sent successfully to:', email)
  } catch (error) {
    console.error('Error sending confirmation email:', error)
    throw new Error('Failed to send confirmation email')
  }
}

export const loginUser: RequestHandler = async (req, res) => {
  try {
    const { name, email } = req.body
    const loginUser = await new User({
      name,
      email,
    })

    res.json({ message: 'User was logged in successfully', loginUser })
  } catch (error: any) {
    res.status(401).json(error.message)
  }
}

export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error: any) {
    res.json({ error: error.message })
  }
}

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const deletedUser = await User.deleteOne({ name: req.params.name })
    res.json({ message: 'User deleted successfully', deletedUser })
  } catch (error: any) {
    res.json({ error: error.message })
  }
}

export const updateUser: RequestHandler = async (req, res) => {
  try {
    const user = await User.updateOne({ name: req.params.name }, req.body)
    res.json(user)
  } catch (error: any) {
    res.json(error.message)
  }
}
