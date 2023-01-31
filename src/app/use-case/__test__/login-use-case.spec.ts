import { type LoginUseCaseContract } from '@/core/use-case'
import { type MockedObject, describe, expect, test, vi, beforeEach } from 'vitest'
import { LoginUseCase } from '../login-use-case'
import { type LoginContractRepository } from '@/core/repositories/login-repository'
import { LoginPrismaRepository } from '@/infra/repositories/prisma'
import { left, right } from '@/shared/error/either'
import { type LoginCreateInput } from '@/app/model/input'
import { TokenService } from '@/infra/services/token-service'
import { LoginCreateRepositoryError, LoginValidateRepositoryError } from '@/core/repositories/error'
import { type TokenServiceContract } from '@/core/services'
import { TokenServiceCreateError } from '@/core/services/errors'
import {
  LoginCreateUseCaseError,
  LoginValidateNotAuthorizedUseCaseError,
  LoginValidateTokenUseCaseError
} from '@/core/use-case/error'

interface Factory {
  sut: LoginUseCaseContract
  repositoryMocked: MockedObject<LoginContractRepository>
  tokenServiceMocked: MockedObject<TokenServiceContract>
}

function factory (): Factory {
  const repositoryMocked = vi.mocked(new LoginPrismaRepository())
  const tokenServiceMocked = vi.mocked(new TokenService())
  const sut = new LoginUseCase(repositoryMocked, tokenServiceMocked)

  return { sut, repositoryMocked, tokenServiceMocked }
}

vi.mock('@/infra/repositories/prisma')
vi.mock('@/infra/services/token-service')

describe('# Login usecase', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  test('Success to create the login', async () => {
    const { sut, repositoryMocked, tokenServiceMocked } = factory()

    repositoryMocked.create.mockResolvedValueOnce(right({
      id: ''
    }))
    tokenServiceMocked.create.mockResolvedValueOnce(right('token'))
    const input: LoginCreateInput = {
      email: 'teste@teste.com',
      password: '1234'
    }

    const result = await sut.create(input)

    const expected = { id: '' }
    expect(result.value).toStrictEqual(expected)
  })

  test('Error to create the login', async () => {
    const { sut, repositoryMocked } = factory()

    repositoryMocked.create.mockResolvedValueOnce(left(new LoginCreateRepositoryError('Teste')))

    const input: LoginCreateInput = {
      email: 'teste@teste.com',
      password: '1234'
    }

    const result = await sut.create(input)

    expect(result.value).instanceOf(LoginCreateUseCaseError)
  })

  test('Login not authorized', async () => {
    const { sut, repositoryMocked } = factory()

    repositoryMocked.validate.mockResolvedValueOnce(right(null))

    const input: LoginCreateInput = {
      email: 'teste@teste.com',
      password: '1234'
    }

    const result = await sut.validate(input)

    expect(result.value).instanceOf(LoginValidateNotAuthorizedUseCaseError)
  })

  test('Login internal error', async () => {
    const { sut, repositoryMocked } = factory()

    repositoryMocked.validate.mockResolvedValueOnce(left(new LoginValidateRepositoryError('Test')))

    const input: LoginCreateInput = {
      email: 'teste@teste.com',
      password: '1234'
    }

    const result = await sut.validate(input)

    expect(result.value).instanceOf(LoginValidateRepositoryError)
  })

  test('Error to generate token', async () => {
    const { sut, repositoryMocked, tokenServiceMocked } = factory()

    repositoryMocked.validate.mockResolvedValueOnce(right({ id: 'test' }))
    tokenServiceMocked.create.mockResolvedValue(left(new TokenServiceCreateError('Test')))
    const input: LoginCreateInput = {
      email: 'teste@teste.com',
      password: '1234'
    }

    const result = await sut.validate(input)

    expect(result.value).instanceOf(LoginValidateTokenUseCaseError)
  })
})
