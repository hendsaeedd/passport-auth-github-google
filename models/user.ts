import mongoose, { Document, Schema } from 'mongoose'

interface User {
  email: string
  name: string
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
  accountId: {
    type: String,
  },
})

export const User = mongoose.model<User & Document>('users', userSchema)
