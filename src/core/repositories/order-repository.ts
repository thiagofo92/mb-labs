import { type Either } from '@/shared/error/either'
import { type OrderExecuteError } from './error/order-error'

export interface OrderContractRepository {
  execute: () => Promise<Either<OrderExecuteError, unknown>>
}
