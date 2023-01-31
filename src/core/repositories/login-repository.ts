import { type Either } from '@/shared/error/either'
import { type LoginValidateError, type LoginCreateError } from './error'
import { type LoginCreateOutPutModel } from '@/app/model/output/login-output-model'
import { type LoginEntity } from '../entities'

export interface LoginContractRepository {
  create: (input: LoginEntity) => Promise<Either<LoginCreateError, LoginCreateOutPutModel>>
  validate: (input: LoginEntity) => Promise<Either<LoginValidateError, boolean>>
}
