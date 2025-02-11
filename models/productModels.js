const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: { type: String, },
    name: { type: String,},
    originalPrice: { type: Number},
    discountedPrice: { type: Number,},
    discount: { type: Number,},
    rating: { type: Number,},
    delivery: { type: String,},
    description: { type: String,},
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
