import { RequestHandler } from 'express'
import { User } from '../models/user'

export const registerUser: RequestHandler = async (req, res) => {
  try {
    const { name, email } = req.body

    const newUser = await User.create({
      name,
      email,
    })

    res.json({ message: 'User was registered successfully', newUser })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
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
