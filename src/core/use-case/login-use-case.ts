import { type LoginCreateInput, type LoginValidateInput } from '@/app/model/input'
import { type LoginValidateOutPutModel, type LoginCreateOutPutModel } from '@/app/model/output'
import { type Either } from '@/shared/error/either'
import {
  type LoginValidateNotAuthorizedUseCaseError,
  type LoginCreateUseCaseError,
  type LoginValidateTokenUseCaseError
} from './error'
import { type LoginValidateRepositoryError } from '../repositories/error'

export interface LoginUseCaseContract {
  create: (input: LoginCreateInput) => Promise<Either<LoginCreateUseCaseError, LoginCreateOutPutModel>>
  validate: (input: LoginValidateInput) => Promise<Either<
  LoginValidateRepositoryError | LoginValidateNotAuthorizedUseCaseError | LoginValidateTokenUseCaseError,
  LoginValidateOutPutModel>>
}
