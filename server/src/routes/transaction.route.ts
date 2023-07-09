import { Request, Response, Router } from 'express'

export const transactionRouter = Router({ mergeParams: true })

transactionRouter.get('/', async (req: Request, res: Response) => {
  res.send('transaction router is working')
})

