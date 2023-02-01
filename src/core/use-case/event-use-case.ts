import { type EventOutPutModel } from '@/app/model/output'
import { type Either } from '@/shared/error/either'
import { type EventUseCaseNotFoundError } from './error'
import {
  type EventFindAllRepositoryError,
  type EventFindByTypeRepositoryError,
  type EventFindByRangeOfDateRepositoryError
} from '../repositories/error'
import { type EventRangeOfDateInput } from '@/app/model/input'

export interface EventUseCaseContract {
  findAll: () => Promise<Either<
  EventFindAllRepositoryError | EventUseCaseNotFoundError,
  unknown>>
  findByType: (type: string) => Promise<Either<
  EventFindByTypeRepositoryError | EventUseCaseNotFoundError,
  EventOutPutModel[]>>
  findByRangeOfDate: (input: EventRangeOfDateInput) => Promise<Either<
  EventFindByRangeOfDateRepositoryError | EventUseCaseNotFoundError,
  EventOutPutModel[]
  >>
}
