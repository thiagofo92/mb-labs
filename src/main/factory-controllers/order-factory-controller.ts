import { OrderController } from '@/app/controllers'
import { OrderUseCase } from '@/app/use-case'
import { OrderPrismaRepository } from '@/infra/repositories/prisma'

export function OrderFactoryController (): OrderController {
  const repository = new OrderPrismaRepository()
  const usecase = new OrderUseCase(repository)
  const controller = new OrderController(usecase)
  return controller
}
