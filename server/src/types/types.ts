import { NextFunction, Request, Response } from 'express'
import { ErrorResponse } from '../../../common/types/types'

interface CustomRequest<RequestBody> extends Request<any, any, RequestBody> {
  user?: { _id: string }
}

export interface ControllerHandler<RequestBody = any, ResponseBody = any> {
  (req: CustomRequest<RequestBody>, res: Response<ResponseBody | ErrorResponse>, next: NextFunction): void | any
}


