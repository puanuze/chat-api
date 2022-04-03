/* eslint no-param-reassign: "error" */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import { Server } from 'socket.io'
import { InteractionRepository, Message, MessageRepository, UserRepository } from '../database/repository'

const io = new Server({
  cors: {
    origin: '*',
  },
})

io.use(async (socket: any, next) => {
  const { userId } = socket.handshake.auth
  console.log(`User with id ${userId} connected`)

  if (!userId) {
    return next(new Error('invalid request'))
  }

  const user = await UserRepository.getUserById(userId)

  if (!user) {
    return next(new Error('invalid request'))
  }

  socket.userId = user._id
  socket.username = user.username

  return next()
})

io.on('connection', async (socket: any) => {
  socket.join(socket.userId)

  const users: any = []
  const userMap: { [userId: string]: boolean } = {}
  io.of('/').sockets.forEach((item: any) => {
    if (item.userId !== socket.userId && !userMap[item.userId]) {
      users.push({
        id: item.userId,
        username: item.username,
        connected: true,
      })
      userMap[item.userId] = true
    }
  })

  // Emit sessionId and userId
  socket.emit('session', {
    userId: socket.userId,
    username: socket.username,
  })

  // Emit active users
  socket.emit('users', users)

  // Handle user connect
  const existingSocketConnections = await io.in(socket.userId).allSockets()
  if (!(existingSocketConnections.size > 1)) {
    socket.broadcast.emit('user connected', {
      id: socket.userId,
      username: socket.username,
      connected: true,
    })
  }

  // Handle user disconnect
  socket.on('disconnect', async () => {
    const socketConnections = await io.in(socket.userId).allSockets()
    if (socketConnections.size > 0) {
      return
    }

    socket.broadcast.emit('user disconnected', {
      id: socket.userId,
      username: socket.username,
    })
  })

  // Handle private message
  socket.on('private message', async ({ content, to }: any) => {
    if (!to) {
      return
    }
    const message = await MessageRepository.postMessage({ content, sender: socket.userId, to } as Message)
    socket.to(to).emit('private message', message)
  })

  // Handle interaction
  socket.on('interaction', async ({ userId, targetUserId }: any) => {
    if (!userId && !targetUserId) {
      return
    }

    const interaction = await InteractionRepository.getUserInteractionWith(userId, targetUserId)
    let res
    if (!interaction) {
      ;[res] = await Promise.all([
        InteractionRepository.createUserInteraction(userId, targetUserId, new Date()),
        InteractionRepository.createUserInteraction(targetUserId, userId, null),
      ])
    } else {
      res = await InteractionRepository.updateUserInteraction(interaction._id, userId, targetUserId)
    }
    socket.to(targetUserId).emit('interaction', res)
  })
})

export default io
