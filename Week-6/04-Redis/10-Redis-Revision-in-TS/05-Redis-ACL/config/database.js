const mongoose = require("mongoose");
require("dotenv").config();

async function connectToMongoDB() {
    await mongoose.connect(process.env.DB_CONNECT_KEY);
}

module.exports = connectToMongoDB;