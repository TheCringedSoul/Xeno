const Order = require('../models/orderModel');

exports.createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json({ success: true, data: order });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
