export class LoginCreateError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'LoginCreateError'
  }
}

export class LoginValidateError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'LoginValidateError'
  }
}
