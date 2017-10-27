import mongoose from 'mongoose';

mongoose.Promise = Promise;

const Transaction = new mongoose.Schema({
  card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card'
  },
  final_amount: {
    type: Number
  },
  pure_amount: {
    type: Number
  },
  rounded_amount: {
    type: Number
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String
  }
});

export default Transaction;