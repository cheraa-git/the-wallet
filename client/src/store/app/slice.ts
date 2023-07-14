import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PaletteMode } from '@mui/material'

export interface AppState {
  theme: PaletteMode
  loading: boolean
}

const initialState: AppState = {
  theme: localStorage.getItem('APP_THEME') as PaletteMode || 'dark',
  loading: false
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state, { payload }: PayloadAction<PaletteMode>) => {
      localStorage.setItem('APP_THEME', payload)
      state.theme = payload
    }
  }
})

export const { setTheme } = appSlice.actions

export const AppReducer = appSlice.reducer


