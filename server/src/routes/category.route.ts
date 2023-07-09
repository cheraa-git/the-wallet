import { Request, Response, Router } from 'express'

export const categoryRouter = Router({ mergeParams: true })

categoryRouter.get('/', async (req: Request, res: Response) => {
  res.send('category router is working')
})


