import { type Either } from '@/shared/error/either'
import { type OrderExecuteError } from './error/order-error'
import { type OrderEntity } from '../entities'

export interface OrderContractRepository {
  execute: (input: OrderEntity) => Promise<Either<OrderExecuteError, boolean>>
}
