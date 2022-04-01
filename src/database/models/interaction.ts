import { Schema, model } from 'mongoose'

const inteactionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  with: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  lastInteractionTime: { type: Schema.Types.Date, default: new Date() },
})

export const Interaction = model('Interaction', inteactionSchema)
