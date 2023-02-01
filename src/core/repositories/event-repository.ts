import { type Either } from '@/shared/error/either'
import { type EventOutPutModel } from '../../app/model/output'
import { type EventRangeOfDateInput } from '@/app/model/input'
import {
  type EventFindAllRepositoryError,
  type EventFindByRangeOfDateRepositoryError,
  type EventFindByTypeRepositoryError
} from './error'
export interface EventContractRepository {
  findAll: () => Promise<Either<EventFindAllRepositoryError, EventOutPutModel[] | null>>
  findByType: (input: string) => Promise<Either<EventFindByTypeRepositoryError, EventOutPutModel[] | null>>
  findByRangeOfDate: (input: EventRangeOfDateInput) => Promise<
  Either<EventFindByRangeOfDateRepositoryError, EventOutPutModel[] | null>>
}
