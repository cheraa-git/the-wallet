import { ControllerHandler } from '../types/types'
import { ErrorMessages } from '../../../common/errorMessages'
import {
  CreateTransactionBody,
  CreateTransactionResponse,
  GetTransactionsResponse,
  RemoveTransactionResponse,
  UpdateTransactionBody,
  UpdateTransactionResponse
} from '../../../common/types/request/transactionRequestTypes'
import { Transaction } from '../models/Transaction'
import { Sheet } from '../models/Sheet'
import { ITransaction } from '../../../common/types/types'
import { validationHandler } from '../utils/validation'
import { Category } from '../models/Category'

class TransactionController {
  getBySheetId: ControllerHandler<{}, GetTransactionsResponse> = async (req, res) => {
    try {
      const sheetId = req.query.sheetId
      if (!sheetId) return res.status(400).send({ message: ErrorMessages.INVALID_DATA })

      const ownerUserId = (await Sheet.findOne({ _id: sheetId }))?.userId?.toJSON()
      if (req.user?._id !== ownerUserId) return res.status(500).send({ message: ErrorMessages.UNAUTHORIZED })

      const transactions = await Transaction.find({ sheetId }) as ITransaction[]
      res.send(transactions)
    } catch (error) {
      res.status(500).send({ message: ErrorMessages.UNEXPECTED_ERROR, data: error })
    }
  }

  create: ControllerHandler<CreateTransactionBody, CreateTransactionResponse> = async (req, res) => {
    try {
      if (validationHandler(req, res)) return
      const newTransaction: ITransaction = (await Transaction.create(req.body)).toJSON()
      res.send(newTransaction)
    } catch (error) {
      res.status(500).send({ message: ErrorMessages.UNEXPECTED_ERROR, data: error })
    }
  }

  update: ControllerHandler<UpdateTransactionBody, UpdateTransactionResponse> = async (req, res) => {
    try {
      if (validationHandler(req, res)) return
      const ownerUserId = (await Sheet.findOne({ _id: req.body.sheetId }))?.userId?.toJSON()
      if (req.user?._id !== ownerUserId) return res.status(500).send({ message: ErrorMessages.UNAUTHORIZED })

      const updatedTransaction = await Transaction.findByIdAndUpdate(req.body._id, req.body, { new: true })
      res.send(updatedTransaction?.toJSON())
    } catch (error) {
      res.status(500).send({ message: ErrorMessages.UNEXPECTED_ERROR, data: error })
    }
  }

  remove: ControllerHandler<{}, RemoveTransactionResponse> = async (req, res) => {
    try {
      if (validationHandler(req, res)) return
      const transactionId = req.params.transactionId
      const removingTransaction = await Category.findOne({ _id: transactionId })
      const ownerUserId = (await Sheet.findOne({ _id: removingTransaction?.sheetId }))?.userId?.toJSON()
      if (!removingTransaction || req.user?._id !== ownerUserId) {
        return res.status(401).send({ message: ErrorMessages.UNAUTHORIZED })
      }
      await removingTransaction.deleteOne()
      res.send({ _id: transactionId })
    } catch (error) {
      res.status(500).send({ message: ErrorMessages.UNEXPECTED_ERROR, data: error })
    }
  }

}

export const transactionController = new TransactionController()
