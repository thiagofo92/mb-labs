import { type EventUseCaseContract } from '@/core/use-case'
import { type EventRangeOfDateInput } from '../model/input'
import { type EventContractRepository } from '@/core/repositories'

export class EventUseCase implements EventUseCaseContract {
  constructor (private readonly eventRepository: EventContractRepository) {}

  async findAll (): Promise<unknown> {

  }

  async findByType (type: string): Promise<unknown> {

  }

  async findByRangeOfDate (input: EventRangeOfDateInput): Promise<unknown> {

  }
}
