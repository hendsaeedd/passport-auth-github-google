import mongoose, { Document, Schema } from 'mongoose'

interface User {
  email: string
  name: string
  username: string
  accountId: string
}

const userSchema: any = new mongoose.Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  accountId: {
    type: String,
  },
})

export const User = mongoose.model<User & Document>('users', userSchema)
