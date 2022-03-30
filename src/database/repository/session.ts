import { Types } from 'mongoose'
import { v4 } from 'uuid'
import { Session as SessionModel } from '../models'

type Session = {
  _id: string
  sessionId: string
  user: any
}

export class SessionRepository {
  static async addSession(userId: string) {
    const sessionId = v4()
    return SessionModel.create({ sessionId, user: userId })
  }

  static async findSession(sessionId: string): Promise<Session> {
    return SessionModel.findOne({ sessionId }).populate('user').exec()
  }

  static async findSessionForUser(userId: string): Promise<Session> {
    return SessionModel.findOne({ user: { _id: new Types.ObjectId(userId) } })
      .populate('user')
      .exec()
  }
}
