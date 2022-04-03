import { Schema, model } from 'mongoose'

export const userSchema = new Schema({
  username: { type: String, required: true },
  session: {
    type: Schema.Types.ObjectId,
    ref: 'Session',
  },
})

export const User = model('User', userSchema)
