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
  loading: true,
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

export const useTransactionState = () => {
  const state = useAppSelector(state => state.transaction)
  const totalAmount = state.transactions.reduce((acc, transaction) => {
    if (transaction.type === 'expense') {
      acc -= transaction.amount
    } else if (transaction.type === 'income') {
      acc += transaction.amount
    }
    return acc
  }, 0)
  return { ...state, totalAmount }
}

