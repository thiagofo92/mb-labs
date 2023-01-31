import { type EventOutPutModel } from '@/app/model/output'
import { EventPrismaRepository } from '@/infra/repositories'
import { describe, test, expect } from 'vitest'

describe('# Event repository', () => {
  test('Success to find all', async () => {
    const repository = new EventPrismaRepository()

    const result = await repository.findAll()

    const expected: EventOutPutModel [] = [{
      id: 0,
      date: new Date(),
      type: 'empresa',
      name: 'a',
      price: 1111
    }]

    expect(result.value).toStrictEqual(expected)
  })
  test.todo('Success to find by type')
  test.todo('Success to find by range of date')
})
