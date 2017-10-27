import mongoose from 'mongoose';

mongoose.Promise = Promise;

const Account = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  balance: {
    type: Number
  },
  account_name: {
    type: String,
    required: true
  },
  iban: {
    type: String
  }
});

export default Account;