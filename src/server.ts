import logger from 'koa-pino-logger'
import initApp, { IAppConfig } from './app'
import { PORT } from './config'
import { initDatabase } from './database'

async function start() {
  const loggingMiddleware = logger({ autoLogging: false })
  const log = loggingMiddleware.logger

  try {
    await initDatabase()

    const appConfig: IAppConfig = {
      loggingMiddleware,
    }
    const app = initApp(appConfig)

    const server = app.listen(PORT, () => {
      log.info(`Server started at port ${PORT}`)
    })

    process.on('SIGTERM', () => {
      server.close(async () => {
        process.exit(0)
      })
    })
  } catch (error: any) {
    log.fatal(error)
  }
}

start()
