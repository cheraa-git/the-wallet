import axios from 'axios'
import { localStorageService } from './localStorageService'
import { authService } from './authService'

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT
})

api.interceptors.request.use(async (config) => {
  const expiresDate = localStorageService.getTokenExpiresDate() || 0
  const refreshToken = localStorageService.getRefreshToken()
  if (refreshToken && +expiresDate < Date.now()) {
    const tokens = await authService.refresh({ refreshToken })

    localStorageService.setTokens({
      refreshToken: tokens.refreshToken,
      userId: tokens.userId,
      expiresIn: tokens.expiresIn,
      accessToken: tokens.accessToken
    })
  }
  const accessToken = localStorageService.getAccessToken()
  if (accessToken) {
    config.headers.Authorization = 'Bearer ' + accessToken
  }
  return config
}, error => {
  return Promise.reject(error)
})
