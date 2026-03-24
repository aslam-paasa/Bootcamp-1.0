const mongoose = require('mongoose');

/**
 * User Schema:
 * - Simple schema with name, email, password and role.
 * - No token fields needed for stateful auth.
 * - Session is stored separately in MongoDB by connect-mongo.
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
        enum: ['admin', 'customer'],
        default: 'customer'
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);