export class TokenServiceCreateError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'TokenServiceCreateError'
  }
}

export class TokenServiceDecodeError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'TokenServiceDecodeError'
  }
}
