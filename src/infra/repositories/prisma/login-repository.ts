import { type LoginEntity } from '@/core/entities'
import { LoginCreateError, LoginValidateError } from '@/core/repositories/error'
import { type LoginContractRepository } from '@/core/repositories/login-repository'
import { left, right, type Either } from '@/shared/error/either'
import { connection } from './connection/connection'
import { type LoginCreateOutPutModel } from '@/app/model/output'

export class LoginPrismaRepository implements LoginContractRepository {
  async create (input: LoginEntity): Promise<Either<LoginCreateError, LoginCreateOutPutModel>> {
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
      return left(new LoginCreateError(error.message))
    }
  }

  async validate (input: LoginEntity): Promise<Either<LoginValidateError, boolean>> {
    try {
      const result = await connection.login.findFirst({
        where: {
          email: input.email,
          password: input.password
        }
      })
      if (result) return right(true)

      return right(false)
    } catch (error: any) {
      return left(new LoginValidateError(error.message))
    }
  }
}
