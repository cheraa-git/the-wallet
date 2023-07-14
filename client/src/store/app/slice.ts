import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PaletteMode } from '@mui/material'
import { RootState, useAppSelector } from '../store'

export interface AppState {
  theme: PaletteMode
}

const initialState: AppState = {
  theme: localStorage.getItem('APP_THEME') as PaletteMode || 'dark'
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


export const useApp = () => {
  const state = useAppSelector((state: RootState) => state.app)
  const isDark = state.theme === 'dark'
  return {...state, isDark}
}

