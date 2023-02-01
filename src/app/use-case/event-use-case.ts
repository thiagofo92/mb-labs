import { type EventUseCaseContract } from '@/core/use-case'
import { type EventRangeOfDateInput } from '../model/input'
import { type EventContractRepository } from '@/core/repositories'
import { right, type Either, left } from '@/shared/error/either'
import {
  type EventFindByTypeRepositoryError,
  type EventFindAllRepositoryError,
  type EventFindByRangeOfDateRepositoryError
} from '@/core/repositories/error'
import { type EventOutPutModel } from '../model/output'
import { EventUseCaseNotFoundError } from '@/core/use-case/error'

export class EventUseCase implements EventUseCaseContract {
  constructor (private readonly eventRepository: EventContractRepository) {}

  async findAll (): Promise<Either<
  EventFindAllRepositoryError | EventUseCaseNotFoundError,
  unknown>> {
    const result = await this.eventRepository.findAll()

    if (result.isLeft()) return left(result.value)

    if (!result.value) return left(new EventUseCaseNotFoundError('Not Found'))

    return right(result.value)
  }

  async findByType (type: string): Promise<Either<
  EventFindByTypeRepositoryError | EventUseCaseNotFoundError,
  EventOutPutModel[]>> {
    const result = await this.eventRepository.findByType(type)

    if (result.isLeft()) return left(result.value)

    if (!result.value) return left(new EventUseCaseNotFoundError('Not Found'))

    return right(result.value)
  }

  async findByRangeOfDate (input: EventRangeOfDateInput): Promise<
  Either<EventFindByRangeOfDateRepositoryError | EventUseCaseNotFoundError,
  EventOutPutModel[]
  >> {
    const result = await this.eventRepository.findByRangeOfDate(input)

    if (result.isLeft()) return left(result.value)

    if (!result.value) return left(new EventUseCaseNotFoundError('Not Found'))

    return right(result.value)
  }
}
