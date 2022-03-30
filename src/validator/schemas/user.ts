import { ValidationSchema } from 'fastest-validator'

export const UserRegisterSchema: ValidationSchema = {
  username: { type: 'string' },
}
