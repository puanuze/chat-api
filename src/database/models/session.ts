import { Schema, model } from 'mongoose'

const sessionSchema = new Schema({
  sessionId: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

export const Session = model('Session', sessionSchema)
