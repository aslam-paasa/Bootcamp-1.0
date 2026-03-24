const mongoose = require('mongoose');

/**
 * User Schema:
 * - name     : full name of the user
 * - email    : unique email (no duplicate accounts)
 * - password : stored as bcrypt hash (never plain text)
 * - role     : controls access level
 *              'admin'    → can create, read, update, delete products and orders
 *              'customer' → can only view products and manage their own orders
 * - timestamps: createdAt and updatedAt added automatically
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'customer'],  // only these two roles allowed
        default: 'customer'              // default role is customer
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);