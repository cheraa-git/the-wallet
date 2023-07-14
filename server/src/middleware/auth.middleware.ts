import { tokenService } from '../services/token.service'
import { ErrorMessages } from '../../../common/errorMessages'
import { ControllerHandler } from '../types/types'

export const authMiddleware: ControllerHandler = (req, res, next) => {
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
      return res.status(401).json({ message: ErrorMessages.UNAUTHORIZED })
    }
    req.user = data
    next()
  } catch (error) {
    return res.status(401).json({ message: ErrorMessages.UNAUTHORIZED })
  }
}
