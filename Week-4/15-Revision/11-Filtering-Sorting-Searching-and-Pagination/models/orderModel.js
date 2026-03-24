const mongoose = require('mongoose');

/**
 * Order Schema:
 * - Represents an order placed by a customer.
 * - Customer can Create and View their orders.
 * - Admin can View and Update order status.
 */
const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,  // reference to Product
        ref: 'Product',                         // links to Product model
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