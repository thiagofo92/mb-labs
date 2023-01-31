import { type EventOutPutModel } from '@/app/model/output'
import { type EventContractRepository } from '@/core/repositories'
import { EventFindAllError, EventFindByRangeOfDateError, EventFindByTypeError } from '@/core/repositories/error'
import { EventPrismaRepository } from '@/infra/repositories'
import { left, right } from '@/shared/error/either'
import { describe, test, expect, vi, beforeAll, afterAll, beforeEach, type MockedObject } from 'vitest'

vi.mock('@/infra/repositories')

interface Factory {
  sut: MockedObject<EventContractRepository>
  mockedData: EventOutPutModel[]
}

function factory (): Factory {
  const repository = new EventPrismaRepository()
  const sut = vi.mocked(repository)
  const mockedData = [{
    id: 1,
    date: new Date(),
    type: 'universidade',
    name: 'USP',
    price: '1111'
  }]
  return { sut, mockedData }
}

describe('# Event repository', () => {
  beforeAll(() => {
    vi.useFakeTimers()
  })
  afterAll(() => {
    vi.useRealTimers()
  })

  beforeEach(() => {
    vi.resetAllMocks()
  })

  test('Success to find all', async () => {
    const { sut, mockedData } = factory()

    sut.findAll.mockResolvedValueOnce(right(mockedData))

    const result = await sut.findAll()

    const expected: EventOutPutModel [] = [{
      id: 1,
      date: new Date(),
      type: 'universidade',
      name: 'USP',
      price: '1111'
    }]

    expect(result.value).toStrictEqual(expected)
  })

  test('Success to find by type', async () => {
    const { sut, mockedData } = factory()

    sut.findByType.mockResolvedValueOnce(right(mockedData))

    const result = await sut.findByType('universidade')

    const expected: EventOutPutModel [] = [{
      id: 1,
      date: new Date(),
      type: 'universidade',
      name: 'USP',
      price: '1111'
    }]

    expect(result.value).toStrictEqual(expected)
  })

  test('Success to find by range of date', async () => {
    const { sut, mockedData } = factory()
    const content = {
      startDate: new Date(),
      endDate: new Date()
    }

    sut.findByRangeOfDate.mockResolvedValueOnce(right(mockedData))

    const result = await sut.findByRangeOfDate(content)

    const expected: EventOutPutModel [] = [{
      id: 1,
      date: new Date(),
      type: 'universidade',
      name: 'USP',
      price: '1111'
    }]

    expect(result.value).toStrictEqual(expected)
  })

  test('Error to find all', async () => {
    const { sut } = factory()

    sut.findAll.mockResolvedValueOnce(left(new EventFindAllError('Test')))
    const result = await sut.findAll()

    expect(result.value).instanceOf(EventFindAllError)
  })

  test('Error to find by type', async () => {
    const { sut } = factory()

    sut.findByType.mockResolvedValueOnce(left(new EventFindByTypeError('Test')))
    const result = await sut.findByType('')

    expect(result.value).instanceOf(EventFindByTypeError)
  })

  test('Error to find by range of date', async () => {
    const { sut } = factory()

    sut.findByRangeOfDate.mockResolvedValueOnce(left(new EventFindByRangeOfDateError('Test')))
    const result = await sut.findByRangeOfDate({} as any)

    expect(result.value).instanceOf(EventFindByRangeOfDateError)
  })
})
