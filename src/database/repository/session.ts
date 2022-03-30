import { User as UserModel, Session as SessionModel } from '../models'
import { v4 } from 'uuid'

type Session = {
  _id: string
  sessionId: string
  userId: string
}

export class SessionRepository {
  static async addSession(userId: string) {
    const sessionId = v4()
    return SessionModel.create({ sessionId, userId })
  }

  static async findSession(sessionId: string): Promise<Session> {
    return UserModel.findOne({ sessionId }).populate('User').exec()
  }
}
