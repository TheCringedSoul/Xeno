const mongoose = require('mongoose');
const Customer = require('./customerModel');
const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    cost: {
        type: Number,
        required: true
    }
});

orderSchema.post('save', async function (doc) {
    try {
        const customer = await Customer.findById(doc.customerId);
        if (customer) { 
            customer.activeAt = Date.now();
            customer.totalSpends += doc.cost;
            customer.visited += 1;
            await customer.save();
        }
    } catch (err) {
        console.error('Error updating customer', err);
    }
});
module.exports = mongoose.model('Order', orderSchema);
