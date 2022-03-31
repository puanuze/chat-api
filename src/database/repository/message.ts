import { Types } from 'mongoose'
import { Message as MessageModel } from '../models'

export type Message = {
  _id: string
  content: string
  sender: string
  to: string
  createdAt: string
  updatedAt: string
}

export class MessageRepository {
  static async postMessage(message: Message) {
    return MessageModel.create(message)
  }

  static async getMessagesForUser(userIds: [string, string]): Promise<Message[]> {
    const [user1, user2] = [new Types.ObjectId(userIds[0]), new Types.ObjectId(userIds[1])]

    return MessageModel.find({
      $or: [{ sender: user1 }, { sender: user2 }, { to: user1 }, { to: user2 }],
    }).exec()
  }
}
