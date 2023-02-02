import { badRequest } from '@/app/helpers/http-helpers'
import { type NextFunction, type Request, type Response } from 'express'
import * as Yup from 'yup'

const loginSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(8)
})

export function loginCreateMiddleware (request: Request, response: Response, next: NextFunction): void {
  loginSchema.validate(request.body, { abortEarly: false })
    .then(_ => { next() })
    .catch(({ errors }) => {
      const params: string = errors.map((item: any) => item).join(', ')
      const message = `Invalid parameter ${params}`
      const result = badRequest(message)
      response.status(result.statusCode).json(result.data)
    })
}

export function loginValidateMiddleware (request: Request, response: Response, next: NextFunction): void {
  loginSchema.validate(request.body, { abortEarly: false })
    .then(_ => { next() })
    .catch(({ errors }) => {
      const params: string = errors.map((item: any) => item).join(', ')
      const message = `Invalid parameter ${params}`
      const result = badRequest(message)
      response.status(result.statusCode).json(result.data)
    })
}

export function loginValidToken (request: Request, response: Response, next: NextFunction): void {

}
