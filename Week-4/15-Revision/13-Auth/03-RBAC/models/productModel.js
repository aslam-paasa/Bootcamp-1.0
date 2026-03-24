const mongoose = require('mongoose');

/**
 * Product Schema:
 * - Admin  : can CREATE, READ, UPDATE, DELETE products
 * - Customer : can only READ products (in-stock only)
 */
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);