/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import { Types } from 'mongoose'
import { Interaction } from '../models'

export class InteractionRepository {
  static async getUserInteractionWith(userId: string, targetUserId: string) {
    return Interaction.findOne().where({ userId: new Types.ObjectId(userId), with: new Types.ObjectId(targetUserId) })
  }

  static async updateUserInteraction(id: string, userId: string, targetUserId: string): Promise<any> {
    return Interaction.findOneAndUpdate(
      {
        _id: id,
        userId: new Types.ObjectId(userId),
        with: new Types.ObjectId(targetUserId),
      },
      {
        lastInteractionTime: new Date(),
      },
      { new: true },
    )
  }

  static async createUserInteraction(
    userId: string,
    targetUserId: string,
    lastInteractionTime: Date | null,
  ): Promise<any> {
    return Interaction.create({
      userId: new Types.ObjectId(userId),
      with: new Types.ObjectId(targetUserId),
      lastInteractionTime,
    })
  }

  static async getConnectionsForUser(userId: string): Promise<any> {
    const response = await Interaction.find()
      .select('with')
      .where({ userId, with: { $nin: userId } })
      .setOptions({ lean: true })
      .populate('with')
      .transform((res) => {
        const result: any[] = []
        res.forEach((interaction) => {
          result.push({
            id: interaction.with._id,
            username: interaction.with.username,
          })
        })
        return result
      })
      .exec()
    return Promise.resolve(response)
  }
}
