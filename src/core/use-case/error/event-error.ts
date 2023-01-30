export class EventUseCaseError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'EventUseCaseError'
  }
}
