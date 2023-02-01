import { type MockedObject, describe, expect, test, vi, beforeEach, afterAll } from 'vitest'

import { type EventContractRepository } from '@/core/repositories'
import { type EventUseCaseContract } from '@/core/use-case'
import { EventPrismaRepository } from '@/infra/repositories/prisma'
import { EventUseCase } from '../event-use-case'
import { left, right } from '@/shared/error/either'
import { type EventOutPutModel } from '@/app/model/output'
import { EventUseCaseNotFoundError } from '@/core/use-case/error'
import {
  EventFindAllRepositoryError,
  EventFindByRangeOfDateRepositoryError,
  EventFindByTypeRepositoryError
} from '@/core/repositories/error'

interface Factory {
  sut: EventUseCaseContract
  repositoryMocked: MockedObject<EventContractRepository>
}

function factory (): Factory {
  const repositoryMocked = vi.mocked(new EventPrismaRepository())
  const sut = new EventUseCase(repositoryMocked)

  return { sut, repositoryMocked }
}

vi.mock('@/infra/repositories/prisma/event-repository')

describe('# Event usecase', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    vi.useFakeTimers()
  })

  afterAll(() => {
    vi.useRealTimers()
  })
  test('Success find all event', async () => {
    const { sut, repositoryMocked } = factory()

    const fake: EventOutPutModel[] = [{
      id: 1,
      name: 'USP',
      date: new Date(),
      price: '111.11',
      type: 'empresa'
    }]

    repositoryMocked.findAll.mockResolvedValueOnce(right(fake))
    const result = await sut.findAll()

    const expected: EventOutPutModel[] = [{
      id: 1,
      name: 'USP',
      date: new Date(),
      price: '111.11',
      type: 'empresa'
    }]

    expect(result.value).toStrictEqual(expected)
  })

  test('Not found - FindAll', async () => {
    const { sut, repositoryMocked } = factory()

    repositoryMocked.findAll.mockResolvedValueOnce(right(null))
    const result = await sut.findAll()

    expect(result.value).instanceOf(EventUseCaseNotFoundError)
  })

  test('Error to find all event', async () => {
    const { sut, repositoryMocked } = factory()

    repositoryMocked.findAll.mockResolvedValueOnce(left(new EventFindAllRepositoryError('Test')))
    const result = await sut.findAll()

    expect(result.value).instanceOf(EventFindAllRepositoryError)
  })

  test('Success find by type event', async () => {
    const { sut, repositoryMocked } = factory()

    const fake: EventOutPutModel[] = [{
      id: 1,
      name: 'USP',
      date: new Date(),
      price: '111.11',
      type: 'empresa'
    }]

    repositoryMocked.findByType.mockResolvedValueOnce(right(fake))
    const result = await sut.findByType('empresa')

    const expected: EventOutPutModel[] = [{
      id: 1,
      name: 'USP',
      date: new Date(),
      price: '111.11',
      type: 'empresa'
    }]

    expect(result.value).toStrictEqual(expected)
  })

  test('Not found - Find by type', async () => {
    const { sut, repositoryMocked } = factory()

    repositoryMocked.findByType.mockResolvedValueOnce(right(null))
    const result = await sut.findByType('')

    expect(result.value).instanceOf(EventUseCaseNotFoundError)
  })

  test('Error to find by type event', async () => {
    const { sut, repositoryMocked } = factory()

    repositoryMocked.findByType.mockResolvedValueOnce(left(new EventFindByTypeRepositoryError('Test')))
    const result = await sut.findByType('')

    expect(result.value).instanceOf(EventFindByTypeRepositoryError)
  })

  test('Success find by range of date event', async () => {
    const { sut, repositoryMocked } = factory()

    const fake: EventOutPutModel[] = [{
      id: 1,
      name: 'USP',
      date: new Date(),
      price: '111.11',
      type: 'empresa'
    }]

    repositoryMocked.findByRangeOfDate.mockResolvedValueOnce(right(fake))
    const result = await sut.findByRangeOfDate({
      startDate: new Date(),
      endDate: new Date()
    })

    const expected: EventOutPutModel[] = [{
      id: 1,
      name: 'USP',
      date: new Date(),
      price: '111.11',
      type: 'empresa'
    }]

    expect(result.value).toStrictEqual(expected)
  })

  test('Not found - Find by range of date', async () => {
    const { sut, repositoryMocked } = factory()

    repositoryMocked.findByRangeOfDate.mockResolvedValueOnce(right(null))
    const result = await sut.findByRangeOfDate({
      startDate: new Date(),
      endDate: new Date()
    })

    expect(result.value).instanceOf(EventUseCaseNotFoundError)
  })

  test('Error to find by range of date event', async () => {
    const { sut, repositoryMocked } = factory()

    repositoryMocked.findByRangeOfDate.mockResolvedValueOnce(left(new EventFindByRangeOfDateRepositoryError('Test')))
    const result = await sut.findByRangeOfDate({} as any)

    expect(result.value).instanceOf(EventFindByRangeOfDateRepositoryError)
  })
})
