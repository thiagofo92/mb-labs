import { OrderExecuteError } from '@/core/repositories/error/order-error'
import { type OrderContractRepository } from '@/core/repositories/order-repository'
import { right, left, type Either } from '@/shared/error/either'

export class OrderPrismaRepository implements OrderContractRepository {
  async execute (): Promise<Either<OrderExecuteError, unknown>> {
    try {
      return right('')
    } catch (error: any) {
      return left(new OrderExecuteError(error.message))
    }
  }
}
