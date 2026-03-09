const mongoose = require('mongoose');

/**
 * Product Schema:
 * - name      : product name (searchable)
 * - price     : product price (filterable, sortable)
 * - category  : product category (filterable)
 * - rating    : product rating (filterable, sortable)
 * - stock     : available units
 * - timestamps: createdAt and updatedAt added automatically
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