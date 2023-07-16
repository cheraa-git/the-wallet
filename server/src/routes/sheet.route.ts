import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import { sheetController } from '../controllers/sheet.controller'

export const sheetRouter = Router({ mergeParams: true })

sheetRouter.get('/', authMiddleware, sheetController.getAll)
sheetRouter.post('/', authMiddleware, sheetController.create)
sheetRouter.patch('/:sheetId', authMiddleware, sheetController.update)
sheetRouter.delete('/:sheetId', authMiddleware, sheetController.remove)



