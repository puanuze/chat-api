import { Context } from 'koa'
import { hash } from 'bcryptjs'
import { UserRepository } from '../database/repository'
import { UserRegisterValidator } from '../validator'
import { HttpResponse } from '../utils/types'

export class UserController {
  static async postUser(ctx: Context) {
    const { request, response } = ctx
    const data = { ...request.body }

    const result = await UserRegisterValidator(data)
    if (result !== true) {
      ctx.throw(400, { errors: result })
    }

    const existingUser = await UserRepository.getUserByEmail(data.email)
    if (existingUser) {
      ctx.throw(400, { errorMessage: 'User with the email already exists' })
    }

    data.password = await hash(data.password, 10)

    const user = UserRepository.postUser(data)

    const responseData: HttpResponse = {
      data: user,
    }
    response.body = responseData
  }
}
