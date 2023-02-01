export class EventFindAllRepositoryError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'EventFindAllRepositoryError'
  }
}

export class EventFindByTypeRepositoryError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'EventFindByTypeRepositoryError'
  }
}

export class EventFindByRangeOfDateRepositoryError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'EventFindByRangeOfDateRepositoryError'
  }
}
