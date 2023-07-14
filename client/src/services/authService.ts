import { api } from './httpService'
import {
  AutologinResponse,
  LoginBody,
  LoginResponse,
  RefreshTokenBody,
  RefreshTokenResponse,
  SignupBody,
  SignupResponse
} from '../../../common/types/request/authRequestTypes'

export const authService = {
  signup: async (payload: SignupBody): Promise<SignupResponse> => {
    const { data } = await api.post('/auth/signup', payload)
    return data
  },
  login: async (payload: LoginBody): Promise<LoginResponse> => {
    const { data } = await api.post('/auth/login', payload)
    return data
  },
  refresh: async (payload: RefreshTokenBody): Promise<RefreshTokenResponse> => {
    const { data } = await api.post('/auth/login', payload)
    return data
  },
  autologin: async (): Promise<AutologinResponse> => {
    const { data } = await api.post('/auth/autologin')
    return data
  }
}
