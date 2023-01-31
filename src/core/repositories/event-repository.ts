import { type Either } from '@/shared/error/either'
import { type EventFindAllError, type EventFindByRangeOfDateError, type EventFindByTypeError } from './error'
import { type EventOutPutModel } from '../../app/model/output'
import { type EventRangeOfDateInput } from '@/app/model/input'

export interface EventContractRepository {
  findAll: () => Promise<Either<EventFindAllError, EventOutPutModel[]>>
  findByType: (input: string) => Promise<Either<EventFindByTypeError, EventOutPutModel[]>>
  findByRangeOfDate: (input: EventRangeOfDateInput) => Promise<Either<EventFindByRangeOfDateError, EventOutPutModel[]>>
}
