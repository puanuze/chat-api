import { Context } from 'koa'

export async function healthCheck(ctx: Context) {
  ctx.body = { status: 'healthy' }
}
