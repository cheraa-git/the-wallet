import { Request, Response, Router } from 'express'

export const authRouter = Router({ mergeParams: true })

authRouter.get('/', async (req: Request, res: Response) => {
  res.send('auth router is working')
})
