import { LoginValidateRepositoryError } from '@/core/repositories/error'
import { type LoginContractRepository } from '@/core/repositories/login-repository'
import { type LoginUseCaseContract } from '@/core/use-case'
import {
  LoginCreateUseCaseError,
  LoginValidateNotAuthorizedUseCaseError,
  LoginValidateTokenUseCaseError
} from '@/core/use-case/error'
import { left, right, type Either } from '@/shared/error/either'
import { LoginEntity } from '@/core/entities'
import { type TokenServiceContract } from '@/core/services'

import { type LoginValidateOutPutModel, type LoginCreateOutPutModel } from '../model/output'
import { type LoginCreateInput } from '../model/input'

export class LoginUseCase implements LoginUseCaseContract {
  constructor (private readonly loginRepository: LoginContractRepository, private readonly tokenService: TokenServiceContract) {}
  async create (input: LoginCreateInput): Promise<Either<LoginCreateUseCaseError, LoginCreateOutPutModel>> {
    const login = new LoginEntity(input)
    const result = await this.loginRepository.create(login)

    if (result.isLeft()) return left(new LoginCreateUseCaseError('Internal Error'))

    return right(result.value)
  }

  async validate (input: LoginCreateInput): Promise<Either<
  LoginValidateRepositoryError | LoginValidateNotAuthorizedUseCaseError | LoginValidateTokenUseCaseError,
  LoginValidateOutPutModel>> {
    const login = new LoginEntity(input)
    const isAuthorized = await this.loginRepository.validate(login)

    if (isAuthorized.isLeft()) return left(new LoginValidateRepositoryError('Internal Error'))

    if (!isAuthorized.value) return left(new LoginValidateNotAuthorizedUseCaseError('Not authorized'))

    const token = await this.tokenService.create(isAuthorized.value.id)

    if (token.isLeft()) return left(new LoginValidateTokenUseCaseError(token.value.message))

    const result = {
      idLogin: isAuthorized.value.id,
      token: token.value
    }

    return right(result)
  }
}
