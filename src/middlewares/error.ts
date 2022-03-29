import { Context } from 'koa'
import { HttpResponse } from '../utils/types'

export async function errorHandlingMiddleware(ctx: Context, next: any) {
  const { response } = ctx

  try {
    await next()
  } catch (error: any) {
    const errors: string[] = []
    if (error.errors?.length) {
      error.errors.forEach((err: any) => {
        if (err.message) {
          errors.push(err.message)
        }
      })
    }

    ctx.log.error({ message: error.errorMessage || error.message, extra: errors, stack: error.stack })

    const res: HttpResponse = {
      message: error.errorMessage || 'Internal Server Error',
      errors,
    }

    response.status = error.status || 500

    if (error.name === 'BadRequestError' && !error.errorMessage) {
      res.message = 'Bad request'
    }
    if (error.name === 'JsonWebTokenError') {
      res.message = 'Unauthorized'
      response.status = 401
    }

    response.body = res
  }
}
