import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISheet } from '../../../../common/types/types'
import { useAppSelector } from '../store'

export interface SheetState {
  sheets: ISheet[]
  loading: boolean
  error: string | null
}

const initialState: SheetState = {
  sheets: [],
  loading: true,
  error: null
}

export const sheetSlice = createSlice({
  name: 'sheet',
  initialState,
  reducers: {
    setSheetLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload
    },
    setSheets: (state, { payload }: PayloadAction<ISheet[]>) => {
      state.sheets = payload
    },
    addSheet: (state, { payload }: PayloadAction<ISheet>) => {
      state.sheets = [payload, ...state.sheets]
    },
    updateStateSheet: (state, { payload }: PayloadAction<ISheet>) => {
      state.sheets = state.sheets.map(sheet => sheet._id === payload._id ? payload : sheet)
    },
    removeStateSheet: (state, { payload }: PayloadAction<string>) => {
      state.sheets = state.sheets.filter(sheet => sheet._id !== payload)
    },
    setSheetError: (state, { payload }: PayloadAction<string | null>) => {
      state.error = payload
    }
  }
})


export const { setSheetLoading, setSheets, removeStateSheet, updateStateSheet, addSheet, setSheetError } = sheetSlice.actions

export const SheetReducer = sheetSlice.reducer

export const useSheetState = () => {
  const state = useAppSelector(state => state.sheet)
  return { ...state }
}

