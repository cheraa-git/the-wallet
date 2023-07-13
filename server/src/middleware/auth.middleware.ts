import { NextFunction, Request, Response } from 'express'
import { tokenService } from '../services/token.service'
import { ErrorMessages } from '../../../common/errorMessages'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next()
  }
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: ErrorMessages.UNAUTHORIZED })
    }
    const data = tokenService.validateAccess(token)
    if (!data || !data._id) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    req.body.currentUserId = data._id
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
