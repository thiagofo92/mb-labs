export type RequestParams = 'body' | 'params' | 'query'

export type RequestInputModel<T = any> = Record<RequestParams, T>
