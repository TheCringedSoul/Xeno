const mongoose = require('mongoose');
const communicationLogSchema = new mongoose.Schema({
    campaignId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign',
        required: true,
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    status: {
        type: String,
        enum: ['SENT', 'FAILED'],
        default: 'SENT',
    },
    message: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model('CommunicationLog', communicationLogSchema);
