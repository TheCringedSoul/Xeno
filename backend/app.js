require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api', campaignRoutes);
const url = process.env.MONGODB_URI
mongoose.connect(url)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
const PORT =  5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
