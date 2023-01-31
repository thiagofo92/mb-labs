import { type LoginEntity } from '@/core/entities'
import { LoginCreateRepositoryError, LoginValidateRepositoryError } from '@/core/repositories/error'
import { type LoginContractRepository } from '@/core/repositories/login-repository'
import { left, right, type Either } from '@/shared/error/either'
import { connection } from './connection/connection'
import { type LoginCreateOutPutModel } from '@/app/model/output'

export class LoginPrismaRepository implements LoginContractRepository {
  async create (input: LoginEntity): Promise<Either<LoginCreateRepositoryError, LoginCreateOutPutModel>> {
    try {
      const result = await connection.login.create({
        data: {
          id: input.id,
          email: input.email,
          password: input.password
        }
      })
      return right({ id: result.id })
    } catch (error: any) {
      return left(new LoginCreateRepositoryError(error.message))
    }
  }

  async validate (input: LoginEntity): Promise<Either<LoginValidateRepositoryError, { id: string } | null>> {
    try {
      const result = await connection.login.findFirst({
        where: {
          email: input.email,
          password: input.password
        }
      })
      if (result) return right({ id: result.id })

      return right(null)
    } catch (error: any) {
      return left(new LoginValidateRepositoryError(error.message))
    }
  }
}
