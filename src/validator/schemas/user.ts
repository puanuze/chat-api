import { ValidationSchema } from 'fastest-validator'

export const UserRegisterSchema: ValidationSchema = {
  firstName: { type: 'number' },
  lastName: { type: 'string' },
  email: { type: 'email' },
  password: { type: 'string' },
}

export const UserLoginSchema: ValidationSchema = {
  email: { type: 'email' },
  password: { type: 'string' },
}
