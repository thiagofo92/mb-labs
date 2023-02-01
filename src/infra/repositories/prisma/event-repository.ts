import { type Event } from '@prisma/client'
import { type EventContractRepository } from '@/core/repositories'
import { type Either, left, right } from '@/shared/error/either'
import { connection } from './connection/connection'
import { type EventOutPutModel } from '@/app/model/output'
import { type EventRangeOfDateInput } from '@/app/model/input'
import {
  EventFindAllRepositoryError,
  EventFindByTypeRepositoryError,
  EventFindByRangeOfDateRepositoryError
} from '@/core/repositories/error'

type PrismaEventOutPut = Array<Event & {
  EventType: {
    type: string
  }
}>

export class EventPrismaRepository implements EventContractRepository {
  async findAll ():
  Promise<Either<EventFindAllRepositoryError, EventOutPutModel[] | null>> {
    try {
      const result = await connection.event.findMany({
        include: {
          EventType: {
            select: {
              type: true
            }
          }
        }
      })

      if (result.length <= 0) return right(null)

      const output = this.formatOutPut(result)

      return right(output)
    } catch (error: any) {
      return left(new EventFindAllRepositoryError(error.message))
    }
  }

  async findByType (input: string):
  Promise<Either<EventFindByTypeRepositoryError, EventOutPutModel[] | null>> {
    try {
      const result = await connection.event.findMany({
        where: {
          EventType: {
            type: input
          }
        },
        include: {
          EventType: {
            select: {
              type: true
            }
          }
        }
      })

      if (result.length <= 0) return right(null)

      const output = this.formatOutPut(result)

      return right(output)
    } catch (error: any) {
      return left(new EventFindByTypeRepositoryError(error.message))
    }
  }

  async findByRangeOfDate (input: EventRangeOfDateInput):
  Promise<Either<EventFindByRangeOfDateRepositoryError, EventOutPutModel[] | null>> {
    try {
      const result = await connection.event.findMany({
        where: {
          startDate: {
            gte: input.startDate,
            lte: input.endDate
          }
        },
        include: {
          EventType: {
            select: {
              type: true
            }
          }
        }
      })

      if (result.length <= 0) return right(null)

      const output = this.formatOutPut(result)

      return right(output)
    } catch (error: any) {
      return left(new EventFindByRangeOfDateRepositoryError(error.message))
    }
  }

  private formatOutPut (input: PrismaEventOutPut): EventOutPutModel [] {
    return input.map<EventOutPutModel>(item => ({
      id: item.id,
      name: item.name,
      type: item.EventType.type,
      startDate: item.startDate,
      endDate: item.endDate,
      startHour: item.startHour,
      endHour: item.endHour,
      price: String(item.price)
    }))
  }
}
