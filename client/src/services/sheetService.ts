import { api } from './httpService'
import {
  CreateSheetBody,
  CreateSheetResponse,
  GetSheetsResponse,
  RemoveSheetResponse,
  UpdateSheetBody,
  UpdateSheetResponse
} from '../../../common/types/request/sheetRequestTypes'

export const sheetService = {
  get: async (): Promise<GetSheetsResponse> => {
    const { data } = await api.get('/sheet')
    return data
  },

  create: async (newSheet: CreateSheetBody): Promise<CreateSheetResponse> => {
    const { data } = await api.post('/sheet', newSheet)
    return data
  },

  update: async (sheet: UpdateSheetBody): Promise<UpdateSheetResponse> => {
    const { data } = await api.patch(`/sheet${sheet._id}`, sheet)
    return data
  },

  remove: async (sheetId: string): Promise<RemoveSheetResponse> => {
    const { data } = await api.delete(`/sheet${sheetId}`)
    return data
  }
}
