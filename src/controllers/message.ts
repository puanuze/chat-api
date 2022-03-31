import { Context } from 'koa'
import { MessageRepository } from '../database/repository'
import { HttpResponse } from '../utils/types'

export class MessageController {
  static async getMessage(ctx: Context) {
    const { request, response } = ctx
    const { ids } = request.query
    if (typeof ids !== 'string') {
      ctx.throw(400, { errorMessage: 'Invalid ids' })
    }
    const userIds = JSON.parse(ids)

    if (!userIds.length && userIds.length !== 2) {
      ctx.throw(400, { errorMessage: 'Invalid ids' })
    }

    const user = await MessageRepository.getMessagesForUser(userIds)

    const responseData: HttpResponse = {
      data: user,
    }
    response.body = responseData
  }
}
