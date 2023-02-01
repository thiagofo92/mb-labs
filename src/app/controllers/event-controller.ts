import { type EventUseCaseContract } from '@/core/use-case'
import { internalError, notFound, successResponse } from '../helpers/http-helpers'
import { type ResponseOutPutModel } from '../model/output/responde-output-model'
import { EventUseCaseNotFoundError } from '@/core/use-case/error'
import { type RequestInputModel } from '../model/input/request-input-model'
import { type EventRangeOfDateInput } from '../model/input'

export class EventController {
  constructor (private readonly eventUseCase: EventUseCaseContract) {}

  async findAll (): Promise<ResponseOutPutModel> {
    const result = await this.eventUseCase.findAll()

    if (result.isLeft()) return this.checkErrors(result.value)

    return successResponse(result.value)
  }

  async findByType ({ query }: RequestInputModel<{ type: string }>): Promise<ResponseOutPutModel> {
    const result = await this.eventUseCase.findByType(query.type)

    if (result.isLeft()) return this.checkErrors(result.value)

    return successResponse(result.value)
  }

  async findByRangeOfDate ({ query }: RequestInputModel<EventRangeOfDateInput>): Promise<ResponseOutPutModel> {
    const result = await this.eventUseCase.findByRangeOfDate(query)

    if (result.isLeft()) return this.checkErrors(result.value)

    return successResponse(result.value)
  }

  private checkErrors (instance: Error): ResponseOutPutModel {
    if (instance instanceof EventUseCaseNotFoundError) return notFound()

    return internalError()
  }
}
