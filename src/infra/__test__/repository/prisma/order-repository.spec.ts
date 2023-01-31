import { type OrderEntity } from '@/core/entities'
import { OrderExecuteError } from '@/core/repositories/error/order-error'
import { type OrderContractRepository } from '@/core/repositories/order-repository'
import { OrderPrismaRepository } from '@/infra/repositories/prisma/order-repository'
import { left, right } from '@/shared/error/either'
import { describe, test, expect, vi, beforeEach, type MockedObject } from 'vitest'

interface Factory {
  sut: MockedObject<OrderContractRepository>
}

function factory (): Factory {
  const sut = vi.mocked(new OrderPrismaRepository())
  return { sut }
}

vi.mock('@/infra/repositories/prisma/order-repository')

describe('# Order repository', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  test('Success to execute order to an event', async () => {
    const { sut } = factory()
    const content: OrderEntity = {
      idLogin: '',
      idEvent: 0,
      amount: 0,
      payment: ''
    }

    sut.execute.mockResolvedValueOnce(right(true))

    const result = await sut.execute(content)

    const expected = true

    expect(result.value).toStrictEqual(expected)
  })

  test('Error when try to execute a order to an event', async () => {
    const { sut } = factory()
    const content: OrderEntity = {
      idLogin: '',
      idEvent: 0,
      amount: 0,
      payment: ''
    }

    sut.execute.mockResolvedValueOnce(left(new OrderExecuteError('Test')))

    const result = await sut.execute(content)

    expect(result.value).instanceOf(OrderExecuteError)
  })
})
