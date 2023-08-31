import { AppDispatch } from '../store'
import { addCategory, setCategories, setCategory, setCategoryError, setCategoryLoading } from './slice'
import { categoryService } from '../../services/categoryService'
import { CreateCategoryBody, UpdateCategoryBody } from '../../../../common/types/request/categoryRequestTypes'

const errorHandler = (error: any, dispatch: AppDispatch) => {
  const message = error?.response?.data?.message
  if (message) {
    dispatch(setCategoryError(message))
  } else {
    dispatch(setCategoryError('UNEXPECTED_ERROR'))
  }
  dispatch(setCategoryLoading(false))
}

export const loadCategories = (sheetId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setCategoryLoading(true))
    const categories = await categoryService.getAll(sheetId)
    dispatch(setCategories(categories))
    dispatch(setCategoryLoading(false))
  } catch (error) {
    errorHandler(error, dispatch)
  }
}

export const createCategory = (payload: CreateCategoryBody) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setCategoryLoading(true))
    const category = await categoryService.create(payload)
    dispatch(addCategory(category))
    dispatch(setCategoryLoading(false))
  } catch (error) {
    errorHandler(error, dispatch)
  }
}

export const updateCategory = (payload: UpdateCategoryBody) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setCategoryLoading(true))
    const category = await categoryService.update(payload)
    dispatch(setCategory(category))
    dispatch(setCategoryLoading(false))
  } catch (error) {
    errorHandler(error, dispatch)
  }
}
