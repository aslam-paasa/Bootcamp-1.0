const mongoose = require('mongoose');

/**
 * Order Schema:
 * - Admin    : can READ all orders, UPDATE order status
 * - Customer : can CREATE orders, READ own orders, DELETE (cancel) own orders
 */
const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',      // links to User model
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',   // links to Product model
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);