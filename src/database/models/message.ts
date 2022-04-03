import { Schema, model } from 'mongoose'
import { userSchema } from './user'

const messageSchema = new Schema(
  {
    content: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: Schema.Types.ObjectId, ref: 'User' },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: [
        function (this: any) {
          return !this.to
        },
        'RoomId is required if not private message',
      ],
    },
    seenBy: [userSchema],
  },
  { timestamps: true },
)

export const Message = model('Message', messageSchema)
