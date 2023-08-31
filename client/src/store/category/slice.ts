import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICategory } from '../../../../common/types/types'
import { useAppSelector } from '../store'

export interface CategoryState {
  categories: ICategory[]
  loading: boolean
  error: string | null
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategoryLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload
    },
    setCategoryError: (state, { payload }: PayloadAction<string | null>) => {
      state.error = payload
    },
    setCategories: (state, { payload }: PayloadAction<ICategory[]>) => {
      state.categories = payload
    },
    addCategory: (state, { payload }: PayloadAction<ICategory>) => {
      state.categories = [...state.categories, payload]
    },
    setCategory: (state, { payload }: PayloadAction<ICategory>) => {
      state.categories = state.categories.map(category => category._id === payload._id ? payload : category)
    },
  }
})


export const {
  setCategoryLoading,
  setCategoryError,
  setCategory,
  addCategory,
  setCategories
} = categorySlice.actions

export const CategoryReducer = categorySlice.reducer

export const useCategoryState = () => {
  const state = useAppSelector(state => state.category)
  const sortedCategories = [...state.categories].sort((a, b) => a.name.localeCompare(b.name))

  const selectCategoryByName = (categoryName: string) => {
    return state.categories.find(c => c.name === categoryName)
  }

  const selectCategoryById = (categoryId: string) => {
    return state.categories.find(c => c._id === categoryId)
  }

  return { ...state, categories: sortedCategories, selectCategoryByName, selectCategoryById }
}


