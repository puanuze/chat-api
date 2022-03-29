import { User } from '../models'

export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
}

export class UserRepository {
  static async postUser(user: User) {
    return User.create(user)
  }

  static async getUserByEmail(email: string) {
    return User.findOne({ email }).exec()
  }
}
