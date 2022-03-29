import { Context } from 'koa'
import { compare } from 'bcryptjs'
import { UserRepository } from '../database/repository'
import { UserLoginValidator } from '../validator'
import { createToken } from '../utils/jwt'
import { HttpResponse } from '../utils/types'

export class AuthController {
  static async authenticateUser(ctx: Context) {
    const { request, response } = ctx
    const data = { ...request.body }

    const result = UserLoginValidator(data)
    if (result !== true) {
      ctx.throw(400, { errors: result })
    }

    const user = await UserRepository.getUserByEmail(data.email)
    if (!user) {
      ctx.throw(400, { errorMessage: 'Invalid email or password' })
    }

    if (!(await compare(data.password, user.password))) {
      ctx.throw(400, { errorMessage: 'Invalid email or password' })
    }

    const responseData: HttpResponse = {
      data: createToken(user.id, user.email),
    }
    response.body = responseData
  }
}
