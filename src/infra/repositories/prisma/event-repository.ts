import { type Event } from '@prisma/client'
import { type EventContractRepository } from '@/core/repositories'
import { EventFindAllError, EventFindByTypeError, EventFindByRangeOfDateError } from '@/core/repositories/error'
import { type Either, left, right } from '@/shared/error/either'
import { connection } from './connection/connection'
import { type EventOutPutModel } from '@/app/model/output'

type PrismaEventOutPut = Array<Event & {
  EventType: {
    type: string
  }
}>

export class EventPrismaRepository implements EventContractRepository {
  async findAll (): Promise<Either<EventFindAllError, EventOutPutModel[]>> {
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

      const output = this.formatOutPut(result)

      return right(output)
    } catch (error: any) {
      return left(new EventFindAllError(error.message))
    }
  }

  async findByType (): Promise<Either<EventFindByTypeError, EventOutPutModel[]>> {
    try {
      const result = await connection.event.findMany({
        where: {

        },
        include: {
          EventType: {
            select: {
              type: true
            }
          }
        }
      })

      const output = this.formatOutPut(result)

      return right(output)
    } catch (error: any) {
      return left(new EventFindByTypeError(error.message))
    }
  }

  async findByRangeOfDate (): Promise<Either<EventFindByRangeOfDateError, EventOutPutModel[]>> {
    try {
      const result = await connection.event.findMany({
        where: {

        },
        include: {
          EventType: {
            select: {
              type: true
            }
          }
        }
      })

      const output = this.formatOutPut(result)

      return right(output)
    } catch (error: any) {
      return left(new EventFindByRangeOfDateError(error.message))
    }
  }

  private formatOutPut (input: PrismaEventOutPut): EventOutPutModel [] {
    return input.map<EventOutPutModel>(item => ({
      id: item.id,
      name: item.name,
      type: item.EventType.type,
      date: item.date,
      price: item.price
    }))
  }
}
