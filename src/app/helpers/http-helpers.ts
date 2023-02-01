import { type ResponseOutPutModel } from '../model/output/responde-output-model'

export function successResponse (data: any): ResponseOutPutModel {
  return {
    statusCode: 200,
    data
  }
}

export function createdReponse (data: any): ResponseOutPutModel {
  return {
    statusCode: 201,
    data
  }
}

export function internalError (data: string): ResponseOutPutModel {
  console.log(data)

  return {
    statusCode: 500,
    data: 'Internal Error'
  }
}

export function notFound (): ResponseOutPutModel {
  return {
    statusCode: 404,
    data: 'Not Found'
  }
}

export function notAuthorized (): ResponseOutPutModel {
  return {
    statusCode: 401,
    data: 'Not Authorized'
  }
}

export function forbbinded (): ResponseOutPutModel {
  return {
    statusCode: 403,
    data: 'Forbbinded'
  }
}

export function badRequest (data: any): ResponseOutPutModel {
  return {
    statusCode: 400,
    data
  }
}
