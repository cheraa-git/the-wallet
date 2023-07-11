import { model, Schema } from 'mongoose'

const schema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  avatar: String
}, {
  timestamps: true
})

export const User = model('User', schema)
