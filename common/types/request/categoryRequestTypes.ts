import { ICategory } from '../types'

export type GetCategoriesResponse = ICategory[]

export type CreateCategoryBody = Omit<ICategory, '_id'>
export type CreateCategoryResponse = ICategory

export type UpdateCategoryBody = Partial<ICategory>
export type UpdateCategoryResponse = ICategory

export type RemoveCategoryResponse = { _id: string }
