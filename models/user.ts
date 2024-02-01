import mongoose, { Document, Schema } from 'mongoose'

interface User {
  email: string
  name: string
  id: string
  accountId: string
}

const userSchema: any = new mongoose.Schema<User>({
  email: {
    type: String,
    lowercase: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  accountId: {
    type: String,
  },
})

export const User = mongoose.model<User & Document>('users', userSchema)
