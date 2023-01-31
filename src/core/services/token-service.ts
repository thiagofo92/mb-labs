import { type Either } from '@/shared/error/either'
import { type TokenServiceCreateError, type TokenServiceDecodeError } from './errors'

export interface TokenServiceContract {
  create: (id: string) => Promise<Either<TokenServiceCreateError, string>>
  decode: (token: string) => Promise<Either<TokenServiceDecodeError, boolean>>
}
