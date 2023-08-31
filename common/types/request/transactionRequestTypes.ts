import { ITransaction } from '../types'

export type GetTransactionsResponse = ITransaction[]

export type GetOneTransactionResponse = ITransaction

export type CreateTransactionBody = Omit<ITransaction, '_id' | 'createdAt' | 'updatedAt'>
export type CreateTransactionResponse = ITransaction

export interface UpdateTransactionBody extends Partial<ITransaction> {
  _id: string
}

export type UpdateTransactionResponse = ITransaction

export type RemoveTransactionResponse = { _id: string }
