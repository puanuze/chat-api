import Router from 'koa-router'
import { UserController } from '../controllers'

export const userRouter = new Router()

userRouter.get('/:id', UserController.getUser)
userRouter.post('/', UserController.postUser)
userRouter.get('/:id/connections', UserController.getConnectionsForUser)
