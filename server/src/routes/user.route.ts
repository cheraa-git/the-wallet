import { Request, Response, Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'

export const userRouter = Router({ mergeParams: true })

userRouter.get('/', async (req: Request, res: Response) => {
  res.send('user router is working')
})
userRouter.patch('/:userId', authMiddleware, )
