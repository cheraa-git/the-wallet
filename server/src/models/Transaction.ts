import { model, Schema } from 'mongoose'

const schema = new Schema({
  sheet: { type: Schema.Types.ObjectId, ref: 'Sheet' },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  type: { type: String, enum: ['increment', 'decrement'], required: true },
  amount: { type: Number, required: true },
  description: String
}, {
  timestamps: true
})

export const Transaction = model('Transaction', schema)
