import mongoose from 'mongoose';
import md5 from 'md5';

mongoose.Promise = Promise;

const Customer = new mongoose.Schema({
  game_username: {
    type: String,
    required: true
  },
  identity: {
    type: String
  },
  customer_id: {
    type: Number,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String
  }
});

Customer.pre("save", function (next) {
  if (this.isNew) {
    this.password = md5(this.password);
    if (this.profilePhoto === null) {
      this.profilePhoto = "https://gravatar.com/avatar/" + md5(this.email.trim().toLowerCase()) + "?s=200";
    }
    this.passwordResetCode = Math.random().toString(36).substring(7).toUpperCase();
  }
  next();
});

export default Customer;