export interface IUser {
  _id: string
  email: string
  name: string
  surname: string
  avatar?: string
}

export interface Tokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
  userId: string
}

export interface ErrorResponse {
  message: string
  data?: any
}
