import { badRequest } from '@/app/helpers/http-helpers'
import { type NextFunction, type Request, type Response } from 'express'
import * as Yup from 'yup'

const orderCreateSchema = Yup.object().shape({
  idLogin: Yup.string().required(),
  idEvent: Yup.number().required(),
  amount: Yup.number().required(),
  payment: Yup.string().required()
})

export function OrderCreateMiddleware (request: Request, response: Response, next: NextFunction): void {
  orderCreateSchema.validate(request.body, { abortEarly: false })
    .then(_ => { next() })
    .catch(({ errors }) => {
      const params: string = errors.map((item: any) => item.path).join(', ')
      const message = `Invalid parameter ${params}`
      const result = badRequest(message)
      response.status(result.statusCode).json(result.data)
    })
}
