import { model, Schema } from 'mongoose'

const schema = new Schema({
  sheet: { type: Schema.Types.ObjectId, ref: 'Sheet' },
  name: { type: String, required: true },
  type: { type: String, enum: ['increment', 'decrement', 'multiple'], required: true },
  icon: String
}, {
  timestamps: true
})

export const Category = model('Category', schema)
