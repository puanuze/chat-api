import Router from 'koa-router'
import { UserController } from '../controllers'

export const userRouter = new Router()

userRouter.post('/', UserController.postUser)
userRouter.post('/:id/connections', UserController.postUser)
