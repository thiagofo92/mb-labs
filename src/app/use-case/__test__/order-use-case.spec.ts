import { type OrderContractRepository } from '@/core/repositories/order-repository'
import { type OrderUseCaseContract } from '@/core/use-case'
import { OrderPrismaRepository } from '@/infra/repositories/prisma'
import { type MockedObject, describe, expect, test, vi } from 'vitest'
import { OrderUseCase } from '../order-use-case'
import { type OrderExecuteInput } from '@/app/model/input'
import { left, right } from '@/shared/error/either'
import { OrderExecuteError } from '@/core/repositories/error'

interface Factory {
  orderRepository: MockedObject<OrderContractRepository>
  sut: OrderUseCaseContract
}

function factory (): Factory {
  const orderRepository = vi.mocked(new OrderPrismaRepository())
  const sut = new OrderUseCase(orderRepository)

  return { sut, orderRepository }
}

vi.mock('@/infra/repositories/prisma')

describe('# Order usecase', () => {
  test('Success to execute the order', async () => {
    const { sut, orderRepository } = factory()
    const input: OrderExecuteInput = {
      idLogin: '',
      idEvent: 0,
      amount: 0,
      payment: ''
    }

    orderRepository.execute.mockResolvedValueOnce(right(true))
    const result = await sut.execute(input)

    expect(result.value).toBeTruthy()
  })
  test('Error to execute the order', async () => {
    const { sut, orderRepository } = factory()
    const input: OrderExecuteInput = {
      idLogin: '',
      idEvent: 0,
      amount: 0,
      payment: ''
    }

    orderRepository.execute.mockResolvedValueOnce(left(new OrderExecuteError('')))
    const result = await sut.execute(input)

    expect(result.value).toBeTruthy()
  })
})
