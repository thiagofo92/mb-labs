import { EventController } from '@/app/controllers'
import { EventUseCase } from '@/app/use-case'
import { EventPrismaRepository } from '@/infra/repositories/prisma'

export function EventFactoryController (): EventController {
  const repository = new EventPrismaRepository()
  const usecase = new EventUseCase(repository)
  const controller = new EventController(usecase)
  return controller
}
