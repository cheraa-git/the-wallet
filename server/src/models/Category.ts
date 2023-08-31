import { model, Schema } from 'mongoose'

const schema = new Schema({
  sheetId: { type: Schema.Types.ObjectId, ref: 'Sheet' },
  name: { type: String, required: true },
  type: { type: String, enum: ['both', 'income', 'expense'], required: true },
}, {
  timestamps: false
})

export const Category = model('Category', schema)
