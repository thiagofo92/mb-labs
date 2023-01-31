import { type EventUseCaseContract } from '@/core/use-case'

export class EventController {
  constructor (private readonly eventUseCase: EventUseCaseContract) {}
}
