import { Tokens } from '../../../common/types/types'

const ACCESS_KEY = 'jwt-access-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'
const USERID_KEY = 'user-local-id'

export const localStorageService = {
  setTokens: ({ refreshToken, accessToken, userId, expiresIn = 3600 }: Tokens) => {
    const expiresDate = String(Date.now() + expiresIn * 1000)
    localStorage.setItem(USERID_KEY, userId)
    localStorage.setItem(ACCESS_KEY, accessToken)
    localStorage.setItem(REFRESH_KEY, refreshToken)
    localStorage.setItem(EXPIRES_KEY, expiresDate)
  },

  removeAuthData: () => {
    localStorage.removeItem(ACCESS_KEY)
    localStorage.removeItem(REFRESH_KEY)
    localStorage.removeItem(EXPIRES_KEY)
    localStorage.removeItem(USERID_KEY)
  },

  getAccessToken: () => {
    return localStorage.getItem(ACCESS_KEY)
  },

  getRefreshToken: () => {
    return localStorage.getItem(REFRESH_KEY)
  },

  getTokenExpiresDate: () => {
    return localStorage.getItem(EXPIRES_KEY)
  },

  getUserId: () => {
    return localStorage.getItem(USERID_KEY)
  }
}
