export class EventFindAllError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'EventFindAllError'
  }
}

export class EventFindByTypeError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'EventFindByTypeError'
  }
}

export class EventFindByRangeOfDateError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'EventFindByRangeOfDateError'
  }
}
