import { NextFunction, Request, Response } from 'express'

interface CustomRequest extends Request {
  user?: { _id: string }
}

export type ControllerHandler = (req: CustomRequest, res: Response, next: NextFunction) => void | any
