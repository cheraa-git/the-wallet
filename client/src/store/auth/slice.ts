import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../../../common/types/types'
import { useAppSelector } from '../store'
import { localStorageService } from '../../services/localStorageService'

export interface AuthState {
  currentUser: IUser | null
  loading: boolean
  error: string | null
  profileLoading: boolean
  profileError: string | null
}

const initialState: AuthState = {
  currentUser: null,
  loading: true,
  error: null,
  profileLoading: false,
  profileError: null
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
    },
    setProfileLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.profileLoading = payload
    },
    setProfileError: (state, { payload }: PayloadAction<string | null>) => {
      state.profileError = payload
    },
    setProfileAvatar: (state, { payload }: PayloadAction<string>) => {
      if (state.currentUser) {
        state.currentUser.avatar = payload
      }
    },
    setProfileInfo: (state, { payload }: PayloadAction<Partial<IUser>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...payload }
      }
    }
  }
})


export const {
  setAuthLoading,
  setCurrentUser,
  setAuthError,
  logout,
  setProfileLoading,
  setProfileError,
  setProfileAvatar,
  setProfileInfo
} = authSlice.actions

export const AuthReducer = authSlice.reducer


export const useAuthState = () => {
  const state = useAppSelector(state => state.auth)
  const isAuth = Boolean(state.currentUser && state.currentUser?._id && state.currentUser.email)
  return { ...state, isAuth }
}
