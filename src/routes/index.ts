import Router from 'koa-router'
import { healthRouter } from './health'
import { userRouter } from './user'
import { messageRouter } from './message'
import { interactionRouter } from './interaction'

const router = new Router()

router.use('/health', healthRouter.routes())
router.use('/api/user', userRouter.routes())
router.use('/api/message', messageRouter.routes())
router.use('/api/interaction', interactionRouter.routes())

export default router
