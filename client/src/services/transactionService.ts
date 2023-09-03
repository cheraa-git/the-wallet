import { api } from './httpService'
import {
  CreateTransactionBody,
  CreateTransactionResponse,
  GetOneTransactionResponse,
  GetTransactionsResponse,
  RemoveTransactionResponse,
  UpdateTransactionBody,
  UpdateTransactionResponse
} from '../../../common/types/request/transactionRequestTypes'

export const transactionService = {
  get: async (): Promise<GetTransactionsResponse> => {
    const { data } = await api.get('/transaction')
    return data
  },

  getOneById: async (transactionId: string): Promise<GetOneTransactionResponse> => {
    const { data } = await api.get(`/transaction/${transactionId}`)
    return data
  },

  create: async (payload: CreateTransactionBody): Promise<CreateTransactionResponse> => {
    const { data } = await api.post('/transaction', payload)
    return data
  },

  update: async (payload: UpdateTransactionBody): Promise<UpdateTransactionResponse> => {
    const { data } = await api.patch('/transaction', payload)
    return data
  },

  remove: async (transactionId: string): Promise<RemoveTransactionResponse> => {
    const { data } = await api.delete(`/transaction/${transactionId}`)
    return data
  }
}
