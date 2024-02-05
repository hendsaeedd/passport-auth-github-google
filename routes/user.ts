import express from 'express'
import {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  updateUser,
} from '../controllers/user'

const router = express.Router()

//register user
router.post('/register', registerUser)

//login user
router.post('/login', loginUser)

//get all users firstname
router.get('/users', getAllUsers)

//delete user
router.delete('/:name', deleteUser)

//update user
router.patch('/:name', updateUser)

export { router }
