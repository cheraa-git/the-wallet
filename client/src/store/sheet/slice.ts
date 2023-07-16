import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISheet } from '../../../../common/types/types'

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
    updateSheet: (state, { payload }: PayloadAction<ISheet>) => {
      state.sheets = state.sheets.map(sheet => sheet._id === payload._id ? payload : sheet)
    },
    removeSheet: (state, { payload }: PayloadAction<string>) => {
      state.sheets = state.sheets.filter(sheet => sheet._id !== payload)
    },
    setSheetError: (state, { payload }: PayloadAction<string | null>) => {
      state.error = payload
    }
  }
})


export const { setSheetLoading, setSheets, removeSheet, updateSheet, addSheet, setSheetError } = sheetSlice.actions

export const SheetReducer = sheetSlice.reducer

