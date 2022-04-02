/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import { Context } from 'koa'
import { InteractionRepository } from '../database/repository'

export class InteractionController {
  static async getInteractionForUser(ctx: Context) {
    const { request, response } = ctx
    const { userId, targetUserId } = request.query
    if (!userId || !targetUserId) {
      ctx.throw(400, { errorMessage: 'Invalid ids' })
    }

    const res = await InteractionRepository.getUserInteractionWith(userId as string, targetUserId as string)

    let responseData = {}

    if (res) {
      responseData = {
        id: res._id,
        userId: res.userId,
        with: res.with,
        lastInteractionTime: res.lastInteractionTime,
      }
    }

    response.body = responseData
  }
}
