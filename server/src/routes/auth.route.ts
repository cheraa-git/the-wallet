import { Request, Response, Router } from 'express'
import { authController } from '../controllers/auth.controller'
import { check } from 'express-validator'
import { ErrorMessages } from '../../../common/errorMessages'


export const authRouter = Router({ mergeParams: true })

authRouter.get('/', async (req: Request, res: Response) => {
  res.send('auth router is working')
})

authRouter.post('/signup', [
  check('email', ErrorMessages.INVALID_EMAIL).normalizeEmail().isEmail(),
  check('password', ErrorMessages.INVALID_PASSWORD).isLength({ min: 6 }),
  check('name', ErrorMessages.INVALID_DATA).isLength({ min: 2 }),
  check('surname', ErrorMessages.INVALID_DATA).isLength({ min: 2 })
], authController.signUp)

authRouter.post('/signin', [
  check('email', ErrorMessages.INVALID_EMAIL).normalizeEmail().isEmail(),
  check('password', ErrorMessages.INVALID_PASSWORD).exists()
], authController.signIn)

authRouter.post('/refresh_token', authController.refreshToken)
