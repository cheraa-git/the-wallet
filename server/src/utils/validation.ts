import { validationResult } from 'express-validator'
import { Request, Response } from 'express'

export const validationHandler = (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) return false
  res.status(500).send({
    message: errors.array()[0].msg
  })
  return true
}
