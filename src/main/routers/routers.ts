import { type Router } from 'express'

export class Routers {
  constructor (private readonly router: Router) {}

  private event (): void {
    this.router.get('')
    this.router.get('')
    this.router.get('')
  }

  private order (): void {
    this.router.post('')
  }

  private login (): void {
    this.router.post('')
    this.router.post('')
  }

  build (): Router {
    return this.router
  }
}
