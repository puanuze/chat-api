import Validator from 'fastest-validator'
import { UserLoginSchema, UserRegisterSchema } from './schemas/user'

const validator = new Validator({
  useNewCustomCheckerFunction: true,
  defaults: {
    object: {
      strict: 'remove',
    },
  },
  messages: {
    required: '{field} is required',
    string: '{field} must be a string',
    stringEnum: '{field} must be one of the following {expected}',
    number: '{field} must be a number',
    date: '{field} must be a date',
    array: '{field} must be an array',
  },
})

// User
export const UserRegisterValidator = validator.compile(UserRegisterSchema)
export const UserLoginValidator = validator.compile(UserLoginSchema)
