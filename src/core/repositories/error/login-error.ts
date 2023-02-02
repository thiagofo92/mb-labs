export class LoginCreateRepositoryError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'LoginCreateError'
  }
}

export class LoginCreateUniqueFieldRepositoryError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'LoginCreateUniqueFieldRepositoryError'
  }
}

export class LoginValidateRepositoryError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'LoginValidateError'
  }
}
