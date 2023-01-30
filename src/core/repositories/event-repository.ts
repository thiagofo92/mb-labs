import { type Either } from '@/shared/error/either'
import { type EventFindAllError, type EventFindByRangeOfDateError, type EventFindByTypeError } from './error'

export interface EventContractRepository {
  findAll: () => Promise<Either<EventFindAllError, unknown>>
  findByType: () => Promise<Either<EventFindByTypeError, unknown>>
  findByRangeOfDate: () => Promise<Either<EventFindByRangeOfDateError, unknown>>
}
