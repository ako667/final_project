const mongoose = require('mongoose');

const cakeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true } // URL картинки
}, { timestamps: true });

module.exports = mongoose.model('Cake', cakeSchema);