import { Request, Response, Router } from 'express'

export const sheetRouter = Router({ mergeParams: true })

sheetRouter.get('/', async (req: Request, res: Response) => {
  res.send('sheet router is working')
})



