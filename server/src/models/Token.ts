import { model, Schema } from 'mongoose'

const schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true }
}, {
  timestamps: true
})

export const Token = model('Token', schema)
