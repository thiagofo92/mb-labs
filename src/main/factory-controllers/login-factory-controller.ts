import { LoginController } from '@/app/controllers'
import { LoginUseCase } from '@/app/use-case'
import { LoginPrismaRepository } from '@/infra/repositories/prisma/'
import { TokenService } from '@/infra/services/token-service'

export function LoginFactoryController (): LoginController {
  const repository = new LoginPrismaRepository()
  const service = new TokenService()
  const usecase = new LoginUseCase(repository, service)
  const controller = new LoginController(usecase)
  return controller
}
