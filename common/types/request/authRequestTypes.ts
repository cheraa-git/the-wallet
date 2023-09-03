import { IUser, Tokens } from '../types'


export interface SignupBody {
  email: string
  password: string
  name: string
  surname: string
}

export interface SignupResponse {
  tokens: Tokens
  user: IUser
}

export interface LoginBody {
  email: string
  password: string
}

export interface LoginResponse {
  tokens: Tokens
  user: IUser
}

export interface RefreshTokenBody {
  refreshToken: string
}

export type RefreshTokenResponse = Tokens

export type AutologinBody = {}
export type AutologinResponse = IUser

export interface EditProfileInfoBody extends Partial<IUser> {
  _id: string
  oldPassword: string
  password?: string
}

export type EditProfileInfoResponse = IUser


export interface EditProfileAvatarBody {
  avatar: string
}

export type EditProfileAvatarResponse = EditProfileAvatarBody
