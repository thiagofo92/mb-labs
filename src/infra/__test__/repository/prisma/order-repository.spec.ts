import { OrderPrismaRepository } from '@/infra/repositories/prisma/order-repository'
import { describe, test, expect } from 'vitest'

describe('# Order repository', () => {
  test('Order an event', async () => {
    const order = new OrderPrismaRepository()

    const result = await order.execute()

    const expected = ''

    expect(result.value).toStrictEqual(expected)
  })
})
