export class OrderExecuteError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'OrderExecuteError'
  }
}
