const Customer = require('../models/customerModel');

exports.createCustomer = async (req, res) => {
    try {
        const customer = await Customer.create(req.body);
        res.status(201).json({ success: true, data: customer });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
