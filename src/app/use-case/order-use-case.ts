import { type OrderExecuteError } from '@/core/repositories/error'
import { type OrderContractRepository } from '@/core/repositories/order-repository'
import { type OrderUseCaseContract } from '@/core/use-case'
import { right, type Either, left } from '@/shared/error/either'
import { type OrderExecuteInput } from '../model/input'

export class OrderUseCase implements OrderUseCaseContract {
  constructor (private readonly orderRepository: OrderContractRepository) {}
  async execute (input: OrderExecuteInput): Promise<Either<OrderExecuteError, boolean>> {
    const result = await this.orderRepository.execute(input)
    if (result.isLeft()) return left(result.value)

    return right(result.value)
  }
}
