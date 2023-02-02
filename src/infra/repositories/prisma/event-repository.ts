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

interface FormatDateAndTime {
  locale: string
  optionsDate: Intl.DateTimeFormatOptions
  optionsHour: Intl.DateTimeFormatOptions
}
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
            gte: new Date(input.startDate),
            lte: new Date(input.endDate)
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
    const format: FormatDateAndTime = {
      locale: 'pt-BR',
      optionsDate: {
        timeZone: 'UTC',
        dateStyle: 'short'
      },
      optionsHour: {
        timeZone: 'UTC',
        timeStyle: 'medium'
      }
    }
    return input.map<EventOutPutModel>(item => {
      return {
        id: item.id,
        name: item.name,
        type: item.EventType.type,
        startDate: item.startDate.toLocaleDateString(format.locale, format.optionsDate),
        endDate: item.endDate.toLocaleDateString(format.locale, format.optionsDate),
        startHour: item.startHour.toLocaleTimeString(format.locale, format.optionsHour),
        endHour: item.endHour.toLocaleTimeString(format.locale, format.optionsHour),
        price: String(item.price)
      }
    })
  }
}
