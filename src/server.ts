import logger from 'koa-pino-logger'
import http from 'http'
import initApp, { IAppConfig } from './app'
import { PORT } from './config'
import { initDatabase } from './database'
import io from './socket'

async function start() {
  const loggingMiddleware = logger({ autoLogging: false })
  const log = loggingMiddleware.logger

  try {
    await initDatabase()

    const appConfig: IAppConfig = {
      loggingMiddleware,
    }
    const app = initApp(appConfig)
    const server = http.createServer(app.callback())

    io.attach(server)

    server.listen(PORT, () => {
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
