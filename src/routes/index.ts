import Router from 'koa-router'
import { healthRouter } from './health'
import { userRouter } from './user'
import { authMiddleware } from '../middlewares'

const router = new Router()

router.use('/health', healthRouter.routes())
router.use('/api/user', authMiddleware, userRouter.routes())

export default router
