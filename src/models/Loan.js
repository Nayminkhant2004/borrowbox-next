import mongoose from 'mongoose';

const LoanSchema = new mongoose.Schema({
  itemId: { type: String, required: true },
  userId: { type: String, required: true },
  dueDate: { type: Date, required: true },
  isReturned: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Loan || mongoose.model('Loan', LoanSchema);
