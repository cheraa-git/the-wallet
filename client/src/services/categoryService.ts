import { api } from './httpService'
import {
  CreateCategoryBody,
  CreateCategoryResponse,
  GetCategoriesResponse,
  RemoveCategoryResponse,
  UpdateCategoryBody,
  UpdateCategoryResponse
} from '../../../common/types/request/categoryRequestTypes'

export const categoryService = {
  getAll: async (sheetId: string): Promise<GetCategoriesResponse> => {
    const { data } = await api.get(`/category?sheetId=${sheetId}`)
    return data
  },

  create: async (payload: CreateCategoryBody): Promise<CreateCategoryResponse> => {
    const { data } = await api.post('/category', payload)
    return data
  },

  update: async (payload: UpdateCategoryBody): Promise<UpdateCategoryResponse> => {
    const { data } = await api.patch('/category', payload)
    return data
  },

  remove: async (categoryId: string): Promise<RemoveCategoryResponse> => {
    const { data } = await api.delete(`/category/${categoryId}`)
    return data
  }
}
