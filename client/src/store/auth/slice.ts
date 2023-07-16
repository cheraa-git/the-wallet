import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../../../common/types/types'
import { useAppSelector } from '../store'
import { localStorageService } from '../../services/localStorageService'

export interface AuthState {
  currentUser: IUser | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  currentUser: null,
  loading: true,
  error: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload
    },
    setCurrentUser: (state, { payload }: PayloadAction<IUser>) => {
      state.currentUser = payload
    },
    setAuthError: (state, { payload }: PayloadAction<string | null>) => {
      state.error = payload
    },
    logout: (state) => {
      state.currentUser = null
      localStorageService.removeAuthData()
    }
  }
})


export const { setAuthLoading, setCurrentUser, setAuthError, logout } = authSlice.actions

export const AuthReducer = authSlice.reducer


export const useAuthState = () => {
  const state = useAppSelector(state => state.auth)
  const isAuth = Boolean(state.currentUser?._id && state.currentUser.email)
  return { ...state, isAuth }
}
