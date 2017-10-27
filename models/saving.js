import mongoose from 'mongoose';

mongoose.Promise = Promise;

const Saving = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    target_amount: {
        type: Number
    },
    target_name: {
        type: String,
        required: true
    },
    saving_type: {
        type: String
    },
    target_account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    saving_preference_0_20: {
        type: Boolean
    },
    saving_preference_20_100: {
        type: Boolean
    },
    saving_preference_100_plus: {
        type: Boolean
    },
    target_end_date: {
        type: Date
    },
    expiry: {
        type: Number
    },
    card: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    }
});

export default Saving;