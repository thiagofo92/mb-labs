import { type OrderExecuteInput } from '@/app/model/input'
import { type Either } from '@/shared/error/either'
import { type OrderExecuteError } from '../repositories/error'

export interface OrderUseCaseContract {
  execute: (input: OrderExecuteInput) => Promise<Either<OrderExecuteError, boolean>>
}
