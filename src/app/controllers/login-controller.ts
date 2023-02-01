import { type LoginUseCaseContract } from '@/core/use-case'
import { type ResponseOutPutModel } from '../model/output/responde-output-model'
import { createdReponse, internalError, notAuthorized, successResponse } from '../helpers/http-helpers'
import { LoginValidateNotAuthorizedUseCaseError } from '@/core/use-case/error'
import { type RequestInputModel } from '../model/input/request-input-model'
import { type LoginValidateInput, type LoginCreateInput } from '../model/input'

export class LoginController {
  constructor (private readonly loginUseCase: LoginUseCaseContract) {}

  async create ({ body }: RequestInputModel<LoginCreateInput>): Promise<ResponseOutPutModel> {
    const result = await this.loginUseCase.create(body)

    if (result.isLeft()) return this.checkErrors(result.value)

    return createdReponse(result.value)
  }

  async validate ({ body }: RequestInputModel<LoginValidateInput>): Promise<ResponseOutPutModel> {
    const result = await this.loginUseCase.validate(body)

    if (result.isLeft()) return this.checkErrors(result.value)

    return successResponse(result.value)
  }

  private checkErrors (instance: Error): ResponseOutPutModel {
    if (instance instanceof LoginValidateNotAuthorizedUseCaseError) return notAuthorized()

    return internalError(instance.message)
  }
}
