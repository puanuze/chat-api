import { Server } from 'socket.io'
import { log } from '../utils/logger'

const io = new Server({
  cors: {
    origin: '*',
  },
})

io.on('connection', () => {
  log.info('A user connected')
})

export default io
