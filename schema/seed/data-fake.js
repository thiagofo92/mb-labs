const { randomUUID } = require('node:crypto');
const { PrismaClient } = require('@prisma/client')

;(async () => {
  const connection = new PrismaClient();
  try {
    const login = await connection.login.create({
      data: {
        id: randomUUID(),
        email: 'test@test.com.br',
        password: '123456789'
      }
    });

    const eventTypeCompany = await connection.eventType.create({
      data:
        { type: 'empresa' }
    });

    const startDate = new Date();
    const endDate = new Date();

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
            id: eventTypeCompany.id
          }
        }
      }
    });

    const eventTypeUniversity = await connection.eventType.create({
      data:
        { type: 'universidade' }
    });

    await connection.event.create({
      data: {
        name: 'Feira de ciência',
        startDate,
        endDate,
        startHour: startDate,
        endHour: endDate,
        price: '1111.24',
        EventType: {
          connect: {
            id: eventTypeUniversity.id
          }
        }
      }
    });

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
    });
  } catch (error) {
    console.log(error);
  } finally {
    await connection.$disconnect();
  }
})();
