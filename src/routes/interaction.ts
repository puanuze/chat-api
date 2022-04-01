import Router from 'koa-router'
import { InteractionController } from '../controllers'

export const interactionRouter = new Router()

interactionRouter.get('/', InteractionController.getInteractionForUser)
