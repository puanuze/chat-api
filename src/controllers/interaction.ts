import { Context } from 'koa'
import { InteractionRepository } from '../database/repository'
import { HttpResponse } from '../utils/types'

export class InteractionController {
  static async getInteractionForUser(ctx: Context) {
    const { request, response } = ctx
    const { userId, targetUserId } = request.query
    if (!userId || !targetUserId) {
      ctx.throw(400, { errorMessage: 'Invalid ids' })
    }

    const user = await InteractionRepository.getUserInteractionWith(userId as string, targetUserId as string)

    const responseData: HttpResponse = {
      data: user,
    }
    response.body = responseData
  }
}
