import { type LoginUseCaseContract } from '@/core/use-case'

export class LoginController {
  constructor (private readonly LoginUseCase: LoginUseCaseContract) {}
}
