import Router from 'koa-router'
import { UserController } from '../controllers'

export const userRouter = new Router()

userRouter.post('/', UserController.postUser)
userRouter.get('/:id/connections', UserController.getConnectionsForUser)
