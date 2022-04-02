import { Context } from 'koa'
import { InteractionRepository, UserRepository } from '../database/repository'
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

    const existingUser = await UserRepository.getUserByUsername(data.username)
    if (existingUser) {
      ctx.throw(400, { errorMessage: 'User with the username already exists' })
    }

    const user = await UserRepository.postUser(data)

    const responseData: HttpResponse = {
      data: user,
    }
    response.body = responseData
  }

  static async getConnectionsForUser(ctx: Context) {
    const { request, response, params } = ctx
    const { id } = params

    const connections = await InteractionRepository.getConnectionsForUser(id)

    const responseData: HttpResponse = {
      data: connections,
    }
    response.body = responseData
  }
}
