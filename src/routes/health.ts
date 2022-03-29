import Router from 'koa-router'
// import { Context } from 'koa';
import { healthCheck } from '../controllers'

export const healthRouter = new Router()

healthRouter.get('/', healthCheck)
