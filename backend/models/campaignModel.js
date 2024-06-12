const mongoose = require('mongoose');
const campaignSchema = new mongoose.Schema({
    rules: [
        {
            field: String,
            operator: String,
            value: mongoose.Schema.Types.Mixed,
            logic: String,
        },
    ],
    message: {
        type: String,
        required: true,
    },
    audienceSize: {
        type: Number,
        default: 0,
    },
    sent: {
        type: Number,
        default: 0,
    },
    failed: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model('Campaign', campaignSchema);
