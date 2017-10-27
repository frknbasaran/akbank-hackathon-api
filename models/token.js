import mongoose from 'mongoose';

mongoose.Promise = Promise;

const Token = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    token: {
        type: String
    },
    lastUpdated: {
        type: Date,
        default: Date.now()
    },
    ip: {
        type: String
    }
});

export default Token;