import { HydratedDocument, model, Schema } from 'mongoose'

interface UserModel {
  name: string
  surname: string
  email: string
  password: string
  avatar?: string
}

const schema = {
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: String
}


export const User = model('User', new Schema(schema, { timestamps: true }))
export type UserModelType = HydratedDocument<UserModel>
