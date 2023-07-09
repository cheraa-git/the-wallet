import { Request, Response, Router } from 'express'

export const userRouter = Router({ mergeParams: true })

userRouter.get('/', async (req: Request, res: Response) => {
  res.send('user router is working')
})
