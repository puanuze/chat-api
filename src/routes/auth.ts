import Router from 'koa-router'
import { AuthController } from '../controllers/auth'

export const authRouter = new Router()

authRouter.post('/', AuthController.authenticateUser)
