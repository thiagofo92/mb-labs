import { type OrderContractRepository } from '@/core/repositories/order-repository'
import { type OrderUseCaseContract } from '@/core/use-case'

export class OrderUseCase implements OrderUseCaseContract {
  constructor (private readonly orderRepository: OrderContractRepository) {}
}
