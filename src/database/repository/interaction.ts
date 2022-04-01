import { Interaction } from '../models'

export class InteractionRepository {
  static async getUserInteractionWith(userId: string, targetUserId: string) {
    return Interaction.findOne({ userId, with: targetUserId })
  }

  static async updateUserInteraction(userId: string, targetUserId: string): Promise<any> {
    return Interaction.updateOne({ userId }, { with: targetUserId })
  }

  static async createUserInteraction(userId: string, targetUserId: string): Promise<any> {
    return Interaction.create({ userId }, { with: targetUserId })
  }
}
