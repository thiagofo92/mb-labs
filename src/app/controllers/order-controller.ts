import { type OrderUseCaseContract } from '@/core/use-case'
import { type ResponseOutPutModel } from '../model/output/responde-output-model'
import { internalError, successResponse } from '../helpers/http-helpers'
import { type RequestInputModel } from '../model/input/request-input-model'
import { type OrderExecuteInput } from '../model/input'

export class OrderController {
  constructor (private readonly orderUseCase: OrderUseCaseContract) {}

  async execute ({ body }: RequestInputModel<OrderExecuteInput>): Promise<ResponseOutPutModel> {
    const result = await this.orderUseCase.execute(body)

    if (result.isLeft()) return internalError()

    return successResponse(result.value)
  }
}
