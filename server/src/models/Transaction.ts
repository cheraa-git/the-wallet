import { model, Schema } from 'mongoose'

const schema = new Schema({
  sheetId: { type: Schema.Types.ObjectId, ref: 'Sheet' },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
  type: { type: String, enum: ['expense', 'income'], required: true },
  amount: { type: Number, required: true },
  description: String
}, {
  timestamps: true
})

export const Transaction = model('Transaction', schema)
