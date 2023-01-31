import { type Either } from '@/shared/error/either'
import { type LoginValidateRepositoryError, type LoginCreateRepositoryError } from './error'
import { type LoginCreateOutPutModel } from '@/app/model/output/login-output-model'
import { type LoginEntity } from '../entities'

export interface LoginContractRepository {
  create: (input: LoginEntity) => Promise<Either<LoginCreateRepositoryError, LoginCreateOutPutModel>>
  validate: (input: LoginEntity) => Promise<Either<LoginValidateRepositoryError, { id: string } | null>>
}
