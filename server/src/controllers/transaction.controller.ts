import { ControllerHandler } from '../types/types'
import { ErrorMessages } from '../../../common/errorMessages'
import {
  CreateTransactionBody,
  CreateTransactionResponse,
  GetOneTransactionResponse,
  GetTransactionsResponse,
  RemoveTransactionResponse,
  UpdateTransactionBody,
  UpdateTransactionResponse
} from '../../../common/types/request/transactionRequestTypes'
import { Transaction } from '../models/Transaction'
import { Sheet } from '../models/Sheet'
import { ITransaction } from '../../../common/types/types'
import { validationHandler } from '../utils/validation'

class TransactionController {
  getByUserId: ControllerHandler<{}, GetTransactionsResponse> = async (req, res) => {
    try {
      const userId = req.user?._id
      const sheetsIds = (await Sheet.find({ userId }))?.map(sheet => sheet._id.toString())
      const transactions = await Transaction.find({ sheetId: sheetsIds }) as ITransaction[]
      res.send(transactions)
    } catch (error) {
      res.status(500).send({ message: ErrorMessages.UNEXPECTED_ERROR, data: error })
    }
  }

  getOneById: ControllerHandler<{}, GetOneTransactionResponse> = async (req, res) => {
    try {
      const transactionId = req.params.transactionId
      const transaction = (await Transaction.findOne({ _id: transactionId }))?.toJSON() as ITransaction
      res.send(transaction)
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
      const removingTransaction = await Transaction.findOne({ _id: transactionId })
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
