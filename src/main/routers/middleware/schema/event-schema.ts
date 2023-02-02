import { badRequest } from '@/app/helpers/http-helpers'
import { type NextFunction, type Response, type Request } from 'express'

import * as Yup from 'yup'

const eventByTypeSchema = Yup.object().shape({
  type: Yup.string().required()
})

const eventByRangeOfDate = Yup.object().shape({
  startDate: Yup.date().required(),
  endDate: Yup.date().required()
})

export function EventByRangeOfDateMiddleware (request: Request, response: Response, next: NextFunction): void {
  eventByRangeOfDate.validate(request.query, { abortEarly: false })
    .then(_ => { next() })
    .catch(({ errors }) => {
      const params: string = errors.map((item: any) => item).join(', ')
      const message = `Invalid parameter ${params}`
      const result = badRequest(message)
      response.status(result.statusCode).json(result.data)
    })
}

export function EventByTypeMiddleware (request: Request, response: Response, next: NextFunction): void {
  eventByTypeSchema.validate(request.query, { abortEarly: false })
    .then(_ => { next() })
    .catch(({ errors }) => {
      const params: string = errors.map((item: any) => item).join(', ')
      const message = `Invalid parameter ${params}`
      const result = badRequest(message)
      response.status(result.statusCode).json(result.data)
    })
}
