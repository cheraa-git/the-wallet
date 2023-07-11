import { Request, Response, Router } from 'express'
import { authController } from '../controllers/auth.controller'
import { check } from 'express-validator'
import { errorMessages } from '../../../common/errorMessages'


export const authRouter = Router({ mergeParams: true })

authRouter.get('/', async (req: Request, res: Response) => {
  res.send('auth router is working')
})

authRouter.post('/signup', [
  check('email', errorMessages.INVALID_EMAIL).normalizeEmail().isEmail(),
  check('password', errorMessages.INVALID_PASSWORD).isLength({ min: 6 }),
  check('name', errorMessages.INVALID_DATA).isLength({ min: 2 }),
  check('surname', errorMessages.INVALID_DATA).isLength({ min: 2 })
], authController.signUp)

authRouter.post('/signin', [
  check('email', errorMessages.INVALID_EMAIL).normalizeEmail().isEmail(),
  check('password', errorMessages.INVALID_PASSWORD).exists()
], authController.signIn)

authRouter.post('/refresh_token', authController.refreshToken)
