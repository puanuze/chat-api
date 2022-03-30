/* eslint no-param-reassign: "error" */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import { Server } from 'socket.io'
import { SessionRepository } from '../database/repository'

const io = new Server({
  cors: {
    origin: '*',
  },
})

io.use(async (socket: any, next) => {
  const { userId, sessionId } = socket.handshake.auth.sessionId
  if (sessionId) {
    const session = await SessionRepository.findSession(sessionId)
    if (session) {
      socket.sessionId = session.sessionId
      socket.userId = session.user._id.toJSON()
      next()
    }
  }
  const { username } = socket.handshake.auth
  if (!username) {
    next(new Error('invalid username'))
  }
  // create new session
  const session = await SessionRepository.addSession(userId)
  socket.sessionId = session._id
  socket.userId = session.user._id.toJSON()

  next()
})

io.on('connection', (socket: any) => {
  const users: any = []
  io.of('/').sockets.forEach((item: any) => {
    users.push({
      id: item.id,
      username: item.username,
      connected: true,
    })
  })

  // Emit sessionId and userId
  socket.emit('session', {
    sessionId: socket.sessionId,
    userId: socket.userId,
  })

  // Emit active users
  socket.emit('users', users)

  // Handle user connect
  socket.broadcast.emit('user connected', {
    id: socket.id,
    username: socket.username,
    connected: true,
  })

  // Handle user disconnect
  socket.on('disconnect', () => {
    socket.broadcast.emit('user disconnected', {
      id: socket.id,
      username: socket.username,
    })
  })

  // Handle private message
  socket.on('private message', ({ content, to }: any) => {
    socket.to(to).to(socket.userId).emit('private message', {
      content,
      from: socket.id,
      to,
    })
  })
})

export default io
