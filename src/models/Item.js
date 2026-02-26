import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['available', 'borrowed'], default: 'available' }
}, { timestamps: true });

export default mongoose.models.Item || mongoose.model('Item', ItemSchema);
