import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import { transactionController } from '../controllers/transaction.controller'
import { check } from 'express-validator'
import { ErrorMessages } from '../../../common/errorMessages'

export const transactionRouter = Router({ mergeParams: true })

transactionRouter.get('/', authMiddleware, transactionController.getBySheetId)

transactionRouter.post('/', [
  authMiddleware,
  check('sheetId', ErrorMessages.INVALID_DATA).exists(),
  check('categoryId', ErrorMessages.INVALID_DATA).exists(),
  check('type', ErrorMessages.INVALID_DATA).exists(),
  check('amount', ErrorMessages.INVALID_DATA).exists().isNumeric()
], transactionController.create)

transactionRouter.patch('/', [
  authMiddleware,
  check('_id', ErrorMessages.INVALID_DATA).exists()
], transactionController.update)

transactionRouter.delete('/:transactionId', authMiddleware, transactionController.remove)
transactionRouter.get('/:transactionId', authMiddleware, transactionController.getOneById)


