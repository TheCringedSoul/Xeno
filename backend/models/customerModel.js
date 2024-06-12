const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    totalSpends: {
        type: Number,
        default: 0
    },
    visited: {
        type: Number,
        default: 0
    },
    activeAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model('Customer', customerSchema);
