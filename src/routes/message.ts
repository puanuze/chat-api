import Router from 'koa-router'
import { MessageController } from '../controllers'

export const messageRouter = new Router()

messageRouter.get('/', MessageController.getMessage)
