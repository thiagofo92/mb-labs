import { type OrderUseCaseContract } from '@/core/use-case'

export class OrderController {
  constructor (private readonly orderUseCase: OrderUseCaseContract) {}
}
