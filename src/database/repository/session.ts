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
    return SessionModel.create({ sessionId, userId })
  }

  static async findSession(sessionId: string): Promise<Session> {
    return SessionModel.findOne({ sessionId }).populate('user').exec()
  }
}
