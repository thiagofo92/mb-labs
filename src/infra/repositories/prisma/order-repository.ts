import { OrderExecuteError } from '@/core/repositories/error/order-error'
import { type OrderContractRepository } from '@/core/repositories/order-repository'
import { right, left, type Either } from '@/shared/error/either'
import { connection } from './connection/connection'
import { type OrderEntity } from '@/core/entities'

export class OrderPrismaRepository implements OrderContractRepository {
  async execute (input: OrderEntity): Promise<Either<OrderExecuteError, boolean>> {
    try {
      await connection.order.create({
        data: {
          idLogin: input.idLogin,
          idEvent: input.idEvent,
          payment: input.payment,
          amount: input.amount
        }
      })

      return right(true)
    } catch (error: any) {
      return left(new OrderExecuteError(error.message))
    }
  }
}
