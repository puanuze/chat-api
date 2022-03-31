import Router from 'koa-router'
import { healthRouter } from './health'
import { userRouter } from './user'
import { messageRouter } from './message'

const router = new Router()

router.use('/health', healthRouter.routes())
router.use('/api/user', userRouter.routes())
router.use('/api/message', messageRouter.routes())

export default router
