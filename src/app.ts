import Koa, { Middleware } from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import { errorHandlingMiddleware } from './middlewares'
import router from './routes'

export interface IAppConfig {
  loggingMiddleware: Middleware
}

export default function initApp(config: IAppConfig) {
  const app = new Koa()
  app.use(bodyParser())
  app.use(
    cors({
      origin: '*',
    }),
  )

  app.use(config.loggingMiddleware)
  app.use(
    bodyParser({
      enableTypes: ['json', 'form', 'text'],
    }),
  )
  app.use(errorHandlingMiddleware)

  app.use(router.routes()).use(router.allowedMethods())

  return app
}
