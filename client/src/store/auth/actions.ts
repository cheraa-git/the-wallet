import { AppDispatch, GetState } from '../store'
import { EditProfileInfoBody, LoginBody, SignupBody } from '../../../../common/types/request/authRequestTypes'
import {
  setAuthError,
  setAuthLoading,
  setCurrentUser,
  setProfileAvatar,
  setProfileError,
  setProfileInfo,
  setProfileLoading
} from './slice'
import { authService } from '../../services/authService'
import { localStorageService } from '../../services/localStorageService'
import { firebaseService } from '../../firebase/firebaseService'

const errorHandler = (error: any, dispatch: AppDispatch) => {
  const message = error?.response?.data?.message
  if (message) {
    dispatch(setAuthError(message))
  } else {
    dispatch(setAuthError('UNEXPECTED_ERROR'))
  }
  dispatch(setAuthLoading(false))
}

export const signup = (payload: SignupBody) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setAuthLoading(true))
    const data = await authService.signup(payload)
    localStorageService.setTokens(data.tokens)
    dispatch(setCurrentUser(data.user))
    dispatch(setAuthLoading(false))
  } catch (error) {
    errorHandler(error, dispatch)
  }
}

export const login = (payload: LoginBody) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setAuthLoading(true))
    const data = await authService.login(payload)
    localStorageService.setTokens(data.tokens)
    dispatch(setCurrentUser(data.user))
    dispatch(setAuthLoading(false))
  } catch (error) {
    errorHandler(error, dispatch)
  }
}

export const autologin = () => async (dispatch: AppDispatch) => {
  try {
    const accessToken = localStorageService.getAccessToken()
    if (!accessToken) return dispatch(setAuthLoading(false))
    const currentUser = await authService.autologin()
    dispatch(setCurrentUser(currentUser))
    dispatch(setAuthLoading(false))
  } catch (error) {
    errorHandler(error, dispatch)
  }
}

export const editProfileImage = (image?: File) => async (dispatch: AppDispatch, getState: GetState) => {
  try {
    dispatch(setProfileLoading(true))
    let avatarUrl = await firebaseService.saveImageToCloud(image)
    const currentUser = getState().auth.currentUser
    if (currentUser?.avatar) {
      await firebaseService.deleteImageFromCloud(currentUser.avatar)
    }
    const { avatar } = await authService.editAvatar(avatarUrl)
    dispatch(setProfileAvatar(avatar))
    dispatch(setProfileLoading(false))
  } catch (error: any) {
    const message = error?.response?.data?.message
    if (message) {
      dispatch(setProfileError(message))
    } else {
      dispatch(setProfileError('UNEXPECTED_ERROR'))
    }
    dispatch(setProfileLoading(false))
  }
}

export const editProfileInfo = (userData: EditProfileInfoBody) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setProfileLoading(true))
    const updatedUser = await authService.editInfo(userData)
    dispatch(setProfileInfo(updatedUser))
    dispatch(setProfileLoading(false))
  } catch (error: any) {
    const message = error?.response?.data?.message
    if (message) {
      dispatch(setProfileError(message))
    } else {
      dispatch(setProfileError('UNEXPECTED_ERROR'))
    }
    dispatch(setProfileLoading(false))
  }
}

