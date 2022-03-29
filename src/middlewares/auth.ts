import { Context } from 'koa'
import { verify } from 'jsonwebtoken'
import { JWT_SECRET } from '../config'

export async function authMiddleware(ctx: Context, next: any) {
  const { request } = ctx
  const { authorization } = request.header
  const token = authorization?.split('Bearer ')[1] ?? ''

  const isValidToken = verify(token, JWT_SECRET)

  if (!token || (token && !isValidToken)) {
    ctx.throw(401, { errorMessage: 'Unauthorized' })
  }

  await next()
}
