import { Types } from 'mongoose'
import { Interaction } from '../models'

export class InteractionRepository {
  static async getUserInteractionWith(userId: string, targetUserId: string) {
    return Interaction.findOne({ userId: new Types.ObjectId(userId) }, { with: new Types.ObjectId(targetUserId) })
  }

  static async updateUserInteraction(id: string, userId: string, targetUserId: string): Promise<any> {
    return Interaction.updateOne(
      {
        _id: id,
        userId: new Types.ObjectId(userId),
        with: new Types.ObjectId(targetUserId),
      },
      {
        lastInteractionTime: new Date(),
      },
    )
  }

  static async createUserInteraction(userId: string, targetUserId: string): Promise<any> {
    return Interaction.create({ userId: new Types.ObjectId(userId), with: new Types.ObjectId(targetUserId) })
  }
}
