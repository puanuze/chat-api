import { User as UserModel } from '../models'

export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
}

export class UserRepository {
  static async postUser(user: User) {
    return UserModel.create(user)
  }

  static async getUserByEmail(email: string): Promise<User> {
    return UserModel.findOne({ email }).exec()
  }
}
