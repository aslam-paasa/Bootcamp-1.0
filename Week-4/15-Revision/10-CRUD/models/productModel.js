const mongoose = require('mongoose');

/**
 * Product Schema:
 * - Represents a product in the store.
 * - Admin can Create, Update, Delete products.
 * - Customer can only Read products.
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
    stock: {
        type: Number,
        default: 0        // how many units are available
    }
}, { timestamps: true }); // createdAt, updatedAt auto added

module.exports = mongoose.model('Product', productSchema);