export class LoginCreateUseCaseError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'LoginCreateUseCaseErro'
  }
}

export class LoginValidateUseCaseError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'LoginValidateUseCaseError'
  }
}

export class LoginValidateNotAuthorizedUseCaseError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'LoginValidateNotAuthorizedUseCaseError'
  }
}

export class LoginValidateTokenUseCaseError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'LoginValidateTokenUseCaseError'
  }
}
