import { sign } from 'jsonwebtoken'
import { JWT_SECRET } from '../config'

export function createToken(id: string, email: string) {
  return sign({ id, email }, JWT_SECRET, { expiresIn: '2d' })
}
