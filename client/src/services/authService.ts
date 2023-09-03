import { api } from './httpService'
import {
  AutologinResponse,
  EditProfileAvatarResponse,
  EditProfileInfoBody,
  EditProfileInfoResponse,
  LoginBody,
  LoginResponse,
  RefreshTokenBody,
  RefreshTokenResponse,
  SignupBody,
  SignupResponse
} from '../../../common/types/request/authRequestTypes'

export const authService = {
  signup: async (payload: SignupBody): Promise<SignupResponse> => {
    const { data } = await api.post('/auth/signup', payload, { headers: { 'ignore-interceptors': 'ignore' } })
    return data
  },
  login: async (payload: LoginBody): Promise<LoginResponse> => {
    const { data } = await api.post('/auth/login', payload, { headers: { 'ignore-interceptors': 'ignore' } })
    return data
  },
  refresh: async (payload: RefreshTokenBody): Promise<RefreshTokenResponse> => {
    const { data } = await api.post('/auth/refresh_token', payload, { headers: { 'ignore-interceptors': 'ignore' } })
    return data
  },
  autologin: async (): Promise<AutologinResponse> => {
    const { data } = await api.post('/auth/autologin', { headers: { 'ignore-interceptors': 'ignore' } })
    return data
  },
  editAvatar: async (avatar: string): Promise<EditProfileAvatarResponse> => {
    const { data } = await api.patch('/auth/profile_avatar', { avatar })
    return data
  },
  editInfo: async (userData: EditProfileInfoBody): Promise<EditProfileInfoResponse> => {
    const { data } = await api.patch('/auth/profile_info', userData)
    return data
  }
}
