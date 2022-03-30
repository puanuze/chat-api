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
  const { userId, sessionId } = socket.handshake.auth

  if (!userId && !sessionId) {
    next(new Error('invalid request'))
  }

  let session
  if (sessionId) {
    session = await SessionRepository.findSession(sessionId)
  } else {
    session = await SessionRepository.findSessionForUser(userId)
  }

  if (session) {
    socket.sessionId = session.sessionId
    socket.userId = session.user._id.toJSON()
    socket.username = session.user.username
    next()
  }

  // create new session
  session = await SessionRepository.addSession(userId)
  socket.sessionId = session.sessionId
  socket.userId = session.user._id.toJSON()
  socket.username = session.user.username

  next()
})

io.on('connection', (socket: any) => {
  socket.join(socket.userId)

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
