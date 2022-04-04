import { User as UserModel } from '../models'

export type User = {
  _id: string
  username: string
}

export class UserRepository {
  static async postUser(user: User) {
    return UserModel.create(user)
  }

  static async getUserByUsername(username: string): Promise<User> {
    return UserModel.findOne({ username }).exec()
  }

  static async getUserById(id: string): Promise<any> {
    return UserModel.findOne({ _id: id }).exec()
  }
}
