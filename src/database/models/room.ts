import { Schema, model } from 'mongoose'
import { userSchema } from './user'

const roomSchema = new Schema({
  name: { type: String, required: true },
  users: [userSchema],
})

export const Room = model('Room', roomSchema)
