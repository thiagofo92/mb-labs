/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import { EventFactoryController, LoginFactoryController, OrderFactoryController } from '../factory-controllers'
import { ExpressAdapter } from '../adapter/express-adapter'
import { EventByRangeOfDateMiddleware, EventByTypeMiddleware } from './middleware/schema/event-schema'
import { loginCreateMiddleware, loginValidateMiddleware } from './middleware/schema/login-schema'
import { OrderCreateMiddleware } from './middleware/schema/order-schema'

export class Routers {
  constructor (private readonly router: Router) {}

  private event (): void {
    const controller = EventFactoryController()
    this.router.get('/event/find-all', ExpressAdapter(controller.findAll.bind(controller)))
    this.router.get('/event/by-type', EventByTypeMiddleware, ExpressAdapter(controller.findByType.bind(controller)))
    this.router.get('/event/by-date', EventByRangeOfDateMiddleware, ExpressAdapter(controller.findByRangeOfDate.bind(controller)))
  }

  private order (): void {
    const controller = OrderFactoryController()
    this.router.post('/order/execute', OrderCreateMiddleware, ExpressAdapter(controller.execute.bind(controller)))
  }

  private login (): void {
    const controller = LoginFactoryController()
    this.router.post('/login/create', loginCreateMiddleware, ExpressAdapter(controller.create.bind(controller)))
    this.router.post('/login/validate', loginValidateMiddleware, ExpressAdapter(controller.validate.bind(controller)))
  }

  build (): Router {
    for (const method of this.getRouterMethods()) {
      const func: any = Reflect.get(this, method)
      func.apply(this)
    }

    return this.router
  }

  private getRouterMethods (): string[] {
    const except = ['constructor', 'build', 'getRouterMethods']
    return Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(item => !except.includes(item))
  }
}
