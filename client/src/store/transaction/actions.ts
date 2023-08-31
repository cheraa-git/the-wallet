import { AppDispatch } from '../store'
import {
  addTransaction,
  removeStateTransaction,
  setTransaction,
  setTransactionError,
  setTransactionLoading,
  setTransactions
} from './slice'
import { transactionService } from '../../services/transactionService'
import { CreateTransactionBody, UpdateTransactionBody } from '../../../../common/types/request/transactionRequestTypes'


const errorHandler = (error: any, dispatch: AppDispatch) => {
  const message = error?.response?.data?.message
  if (message) {
    dispatch(setTransactionError(message))
  } else {
    dispatch(setTransactionError('UNEXPECTED_ERROR'))
  }
  dispatch(setTransactionLoading(false))
}


export const loadTransactions = (sheetId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setTransactionLoading(true))
    const transactions = await transactionService.get(sheetId)
    dispatch(setTransactions(transactions))
    dispatch(setTransactionLoading(false))
  } catch (error) {
    errorHandler(error, dispatch)
  }
}

export const getOneTransaction = (transactionId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setTransactionLoading(true))
    const transaction = await transactionService.getOneById(transactionId)
    dispatch(setTransactions([transaction]))
    dispatch(setTransactionLoading(false))
  } catch (error) {
    errorHandler(error, dispatch)
  }
}


export const createTransaction = (payload: CreateTransactionBody) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setTransactionLoading(true))
    const newTransaction = await transactionService.create(payload)
    dispatch(addTransaction(newTransaction))
    dispatch(setTransactionLoading(false))
  } catch (error) {
    errorHandler(error, dispatch)
  }
}

export const updateTransaction = (payload: UpdateTransactionBody) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setTransactionLoading(true))
    const newTransaction = await transactionService.update(payload)
    dispatch(setTransaction(newTransaction))
    dispatch(setTransactionLoading(false))
  } catch (error) {
    errorHandler(error, dispatch)
  }
}


export const removeTransaction = (transactionId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setTransactionLoading(true))
    const { _id: removedTransactionId } = await transactionService.remove(transactionId)
    dispatch(removeStateTransaction(removedTransactionId))
    dispatch(setTransactionLoading(false))
  } catch (error) {
    errorHandler(error, dispatch)
  }
}
