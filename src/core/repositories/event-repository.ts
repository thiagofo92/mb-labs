import { type Either } from '@/shared/error/either'
import { type EventFindAllError, type EventFindByRangeOfDateError, type EventFindByTypeError } from './error'
import { type EventOutPutModel } from '../../app/model/output'

export interface EventContractRepository {
  findAll: () => Promise<Either<EventFindAllError, EventOutPutModel[]>>
  findByType: () => Promise<Either<EventFindByTypeError, EventOutPutModel[]>>
  findByRangeOfDate: () => Promise<Either<EventFindByRangeOfDateError, EventOutPutModel[]>>
}
