const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    cake: { type: mongoose.Schema.Types.ObjectId, ref: 'Cake', required: true },
    quantity: { type: Number, required: true, default: 1 },
    customerName: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, enum: ['pending','completed','cancelled'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);