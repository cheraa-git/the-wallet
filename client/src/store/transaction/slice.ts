import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useAppSelector } from '../store'
import { ITransaction } from '../../../../common/types/types'

export interface TransactionState {
  transactions: ITransaction[]
  loading: boolean
  error: string | null
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null
}

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransactionLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload
    },
    setTransactionError: (state, { payload }: PayloadAction<string | null>) => {
      state.error = payload
    },
    setTransactions: (state, { payload }: PayloadAction<ITransaction[]>) => {
      state.transactions = payload
    },
    addTransaction: (state, { payload }: PayloadAction<ITransaction>) => {
      state.transactions = [payload, ...state.transactions]
    },
    setTransaction: (state, { payload }: PayloadAction<ITransaction>) => {
      state.transactions = state.transactions.map(transaction => transaction._id === payload._id ? payload : transaction)
    },
    removeStateTransaction: (state, { payload }: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(t => t._id !== payload)
    }
  }
})


export const {
  setTransactionLoading,
  setTransactionError,
  setTransaction,
  addTransaction,
  setTransactions,
  removeStateTransaction
} = transactionSlice.actions

export const TransactionReducer = transactionSlice.reducer

export const useTransactionState = (sheetId?: string) => {
  const state = { ...useAppSelector(state => state.transaction) }

  if (sheetId) {
    state.transactions = state.transactions.filter(t => t.sheetId === sheetId)
  }
  let totalAmount = 0
  let expenseAmount = 0
  let expenseCount = 0
  let incomeAmount = 0
  let incomeCount = 0

  state.transactions.forEach(transaction => {
    if (transaction.type === 'expense') {
      totalAmount -= transaction.amount
      expenseAmount -= transaction.amount
      expenseCount++
    } else if (transaction.type === 'income') {
      totalAmount += transaction.amount
      incomeAmount += transaction.amount
      incomeCount++
    }
  })

  return { ...state, totalAmount, expenseAmount, expenseCount, incomeAmount, incomeCount }
}

