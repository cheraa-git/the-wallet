import { ISheet } from '../types'

export type GetSheetsBody = {}
export type GetSheetsResponse = ISheet[]

export type CreateSheetBody = Omit<ISheet, '_id' | 'createdAt' | 'updatedAt' | 'userId'>
export type CreateSheetResponse = ISheet

export interface UpdateSheetBody extends Partial<ISheet> {
  _id: string
}
export type UpdateSheetResponse = ISheet

export type RemoveSheetBody = {}
export type RemoveSheetResponse = { _id: string }
