const mongoose = require('mongoose');

/**
 * Order Schema:
 * - customerName : name of the customer who placed the order
 * - product      : reference to Product model (stores ObjectId)
 * - quantity     : number of units ordered
 * - status       : current status of the order
 * - timestamps   : createdAt and updatedAt added automatically
 *
 * mongoose.Schema.Types.ObjectId:
 * - Stores a reference (link) to another document.
 * - ref: 'Product' tells Mongoose which model it links to.
 * - .populate('product') replaces the ObjectId with actual product data.
 */
const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
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