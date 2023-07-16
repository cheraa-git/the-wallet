import { AppDispatch } from '../store'
import { addSheet, setSheetError, setSheetLoading, setSheets } from './slice'
import { sheetService } from '../../services/sheetService'
import { CreateSheetBody, UpdateSheetBody } from '../../../../common/types/request/sheetRequestTypes'

const errorHandler = (error: any, dispatch: AppDispatch) => {
  const message = error?.response?.data?.message
  if (message) {
    dispatch(setSheetError(message))
  } else {
    dispatch(setSheetError('UNEXPECTED_ERROR'))
  }
  dispatch(setSheetLoading(false))
}

export const getSheets = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setSheetLoading(true))
    const sheets = await sheetService.get()
    dispatch(setSheets(sheets))
    dispatch(setSheetLoading(false))
  } catch (error) {
    errorHandler(error, dispatch)
  }
}

export const createSheet = (sheetData: CreateSheetBody) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setSheetLoading(true))
    const newSheet = await sheetService.create(sheetData)
    dispatch(addSheet(newSheet))
    dispatch(setSheetLoading(false))
  } catch (error) {
    errorHandler(error, dispatch)
  }
}

export const updateSheet = (sheetData: UpdateSheetBody) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setSheetLoading(true))
    const updatedSheet = await sheetService.update(sheetData)
    dispatch(updateSheet(updatedSheet))
    dispatch(setSheetLoading(false))
  } catch (error) {
    errorHandler(error, dispatch)
  }
}

export const removeSheet = (sheetId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setSheetLoading(true))
    const { _id: removedSheetId } = await sheetService.remove(sheetId)
    dispatch(removeSheet(removedSheetId))
    dispatch(setSheetLoading(false))
  } catch (error) {
    errorHandler(error, dispatch)
  }
}
