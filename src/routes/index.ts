import Router from 'koa-router'
import { healthRouter } from './health'
import { userRouter } from './user'

const router = new Router()

router.use('/health', healthRouter.routes())
router.use('/api/user', userRouter.routes())

export default router
