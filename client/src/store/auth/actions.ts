import { AppDispatch } from '../store'
import { LoginBody, SignupBody } from '../../../../common/types/request/authRequestTypes'
import { setAuthError, setAuthLoading, setCurrentUser } from './slice'
import { authService } from '../../services/authService'
import { localStorageService } from '../../services/localStorageService'

const errorHandler = (error: any, dispatch: AppDispatch) => {
  const message = error?.response?.data?.message
  if (message) {
    dispatch(setAuthError(message))
  } else {
    dispatch(setAuthError('UNEXPECTED_ERROR')) // todo: придумать как импортировать ErrorMessages
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
    if (!accessToken) return
    dispatch(setAuthLoading(true))
    const currentUser = await authService.autologin()
    dispatch(setCurrentUser(currentUser))
    dispatch(setAuthLoading(false))
  } catch (error) {
    errorHandler(error, dispatch)
  }
}
