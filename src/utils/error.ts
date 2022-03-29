export class HttpError extends Error {
  status: number

  errorMessage: string

  errors: string[] | undefined

  constructor(status: number, message: string, errors?: any[]) {
    super(message)
    this.errorMessage = message
    this.status = status
    this.errors = errors
  }
}
