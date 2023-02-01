export class EventUseCaseNotFoundError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'EventUseCaseNotFoundError'
  }
}
