import { randomUUID } from 'crypto'
import { connection } from '../connection/connection'

void (async () => {
  try {
    const login = await connection.login.create({
      data: {
        id: randomUUID(),
        email: 'test@test.com.br',
        password: '1234567'
      }
    })

    const eventType = await connection.eventType.create({
      data:
        { type: 'empresa' }
    })
    const startDate = new Date()
    const endDate = new Date()

    const event = await connection.event.create({
      data: {
        name: 'Palestra',
        startDate,
        endDate,
        startHour: startDate,
        endHour: endDate,
        price: '1111.24',
        EventType: {
          connect: {
            id: eventType.id
          }
        }
      }
    })

    await connection.order.create({
      data: {
        Login: {
          connect: {
            id: login.id
          }
        },
        Event: {
          connect: {
            id: event.id
          }
        },
        payment: 'boleto',
        amount: 1
      }
    })
  } catch (error) {
    console.log(error)
  } finally {
    await connection.$disconnect()
  }
})()
