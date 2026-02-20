import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

/**
 * Export a fn that connects to the database:
*/

const connectDB = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.log("Error connecting to MongoDB", err);
        });
};

export default connectDB;