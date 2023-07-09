import { Router } from 'express'
import { authRouter } from './auth.route'
import { userRouter } from './user.route'
import { sheetRouter } from './sheet.route'
import { categoryRouter } from './category.route'
import { transactionRouter } from './transaction.route'

const router = Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/sheet', sheetRouter)
router.use('/category', categoryRouter)
router.use('/transaction', transactionRouter)

export default router
