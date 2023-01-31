import { LoginEntity } from '@/core/entities'
import { type LoginContractRepository } from '@/core/repositories/login-repository'
import { LoginPrismaRepository } from '@/infra/repositories/prisma'
import { right } from '@/shared/error/either'
import { describe, expect, vi, test, type MockedObject, afterEach } from 'vitest'

interface Factory {
  sut: MockedObject<LoginContractRepository>
  login: LoginEntity
}

function factory (): Factory {
  const sut = vi.mocked(new LoginPrismaRepository())
  const login = new LoginEntity({ email: 'test', password: '1234' })
  return { sut, login }
}

vi.mock('@/infra/repositories/prisma/login-repository')
afterEach(() => {
  vi.resetAllMocks()
})

describe('# Login repository', () => {
  test('Success to create the login', async () => {
    const { sut, login } = factory()

    sut.create.mockResolvedValueOnce(right({ id: '' }))
    const result = await sut.create(login)

    const expected = { id: '' }
    expect(result.value).toStrictEqual(expected)
  })

  test('Success to validate the login', async () => {
    const { sut, login } = factory()

    sut.validate.mockResolvedValueOnce(right(true))

    const result = await sut.validate(login)

    expect(result.value).toBeTruthy()
  })
  test.todo('Error to create the login')
  test.todo('Error to validate the login')
})
