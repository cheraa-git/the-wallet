import { model, Schema } from 'mongoose'

const schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  type: { type: String, required: true },
  description: String,
}, {
  timestamps: true
})

export const Sheet = model('Sheet', schema)
