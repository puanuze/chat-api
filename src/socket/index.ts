import { Server } from 'socket.io'

const io = new Server({
  cors: {
    origin: '*',
  },
})

io.use((socket: any, next) => {
  const { username } = socket.handshake.auth
  if (!username) {
    next(new Error('Invalid username'))
  }

  /* eslint no-param-reassign: "error" */
  socket.username = username
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

  socket.emit('users', users)
  socket.broadcast.emit('user connected', {
    id: socket.id,
    username: socket.username,
    connected: true,
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('user disconnected', {
      id: socket.id,
      username: socket.username,
    })
  })

  socket.on('private message', ({ content, to }: any) => {
    socket.to(to).emit('private message', {
      content,
      from: socket.id,
    })
  })
})

export default io
