/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import { EventFactoryController, LoginFactoryController, OrderFactoryController } from '../factory-controllers'
import { ExpressAdapter } from '../adapter/express-adapter'

export class Routers {
  constructor (private readonly router: Router) {}

  private event (): void {
    const controller = EventFactoryController()
    this.router.get('/event/find-all', ExpressAdapter(controller.findAll.bind(controller)))
    this.router.get('/event/by-type', ExpressAdapter(controller.findByType.bind(controller)))
    this.router.get('/event/by-date', ExpressAdapter(controller.findByRangeOfDate.bind(controller)))
  }

  private order (): void {
    const controller = OrderFactoryController()
    this.router.post('/order/execute', ExpressAdapter(controller.execute.bind(controller)))
  }

  private login (): void {
    const controller = LoginFactoryController()
    this.router.post('/login/create', ExpressAdapter(controller.create.bind(controller)))
    this.router.post('/login/validate', ExpressAdapter(controller.create.bind(controller)))
  }

  build (): Router {
    for (const method of this.getRouterMethods()) {
      const func: any = Reflect.get(this, method)
      func()
    }

    return this.router
  }

  private getRouterMethods (): string[] {
    const except = ['constructor', 'build', 'getRouterMethods']
    return Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(item => !except.includes(item))
  }
}
