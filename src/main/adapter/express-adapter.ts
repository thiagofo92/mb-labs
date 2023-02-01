import { type Request, type Response } from 'express'
import { type RequestInputModel } from '@/app/model/input'
import { type ResponseOutPutModel } from '@/app/model/output'
type FunctionController = (
  request: RequestInputModel
) => Promise<ResponseOutPutModel>

export function ExpressAdapter (controller: FunctionController) {
  return async function (request: Request, response: Response): Promise<any> {
    try {
      const { body, params, query } = request

      const result = await controller({ body, params, query })

      return response.status(result.statusCode).json(result.data)
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: 'Internal Error' })
    }
  }
}
