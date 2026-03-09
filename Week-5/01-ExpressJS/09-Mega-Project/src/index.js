/**
 * 2. Import Dependencies:
 *    - Express Server (app.js)
 *    - dotenv
 *    - mongoose
 *    - cors
 *    - nodemon
 *    - body-parser
*/
import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

/**
 * 3. Configure environment variables:
 *    - Path to .env file
*/
dotenv.config({
    path: "./.env"
});

/**
 * 4. Connect to MongoDB, then start the server:
*/

const PORT = process.env.PORT || 8000;
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB", error);
        process.exit(1);
    });