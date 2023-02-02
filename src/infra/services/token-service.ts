import { type TokenServiceContract } from '@/core/services'
import { TokenServiceDecodeError, TokenServiceCreateError } from '@/core/services/errors'
import { left, type Either, right } from '@/shared/error/either'

export class TokenService implements TokenServiceContract {
  async create (id: string): Promise<Either<TokenServiceCreateError, string>> {
    try {
      return right('AUTHORIZED')
    } catch (error: any) {
      return left(new TokenServiceCreateError(error.message))
    }
  }

  async decode (token: string): Promise<Either<TokenServiceDecodeError, boolean>> {
    try {
      return right(true)
    } catch (error: any) {
      return left(new TokenServiceDecodeError(error.message))
    }
  }
}
