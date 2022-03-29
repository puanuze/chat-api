import { Server } from 'socket.io'

const io = new Server({
  cors: {
    origin: '*',
  },
})

io.use((socket: any, next) => {
  const { username } = socket.handshake.auth
  console.log('Here username', username)
  if (!username) {
    next(new Error('Invalid username'))
  }

  /* eslint no-param-reassign: "error" */
  socket.username = username
  next()
})

io.on('connection', (socket) => {
  const users: any = []
  io.of('/').sockets.forEach((item: any) => {
    users.push({
      userID: item.id,
      username: item.username,
    })
  })
  socket.emit('users', users)
})

export default io
