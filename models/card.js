import mongoose from 'mongoose';

mongoose.Promise = Promise;

const Card = new mongoose.Schema({
  name: {
    type: String
  },
  card_no: {
    type: String
  },
  expired: {
    type: String
  },
  cvc: {
    type: String
  },
  total_debt: {
    type: Number
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  }
});

export default Card;