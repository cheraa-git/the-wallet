import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import { categoryController } from '../controllers/category.controller'
import { check } from 'express-validator'
import { ErrorMessages } from '../../../common/errorMessages'

export const categoryRouter = Router({ mergeParams: true })

categoryRouter.get('/', authMiddleware, categoryController.getBySheetId)
categoryRouter.post('/', [
  authMiddleware,
  check('sheetId', ErrorMessages.INVALID_DATA).exists(),
  check('name', ErrorMessages.INVALID_DATA).exists(),
  check('type', ErrorMessages.INVALID_DATA).exists()
], categoryController.createCategory)
categoryRouter.patch('/', [
  authMiddleware,
  check('_id', ErrorMessages.INVALID_DATA).exists(),
  check('sheetId', ErrorMessages.INVALID_DATA).exists()
], categoryController.updateCategory)
categoryRouter.delete('/:categoryId', authMiddleware, categoryController.removeCategory)


