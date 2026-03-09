const mongoose = require('mongoose');

/**
 * Database Connection:
 * - MONGO_URI must come from process.env, not a bare variable
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to Database');
    } catch (err) {
        console.error('Error connecting to Database:', err.message);
        process.exit(1);
    }
};

connectDB();

module.exports = connectDB;