/**
 * Redis ACL:
 * - ACL stands for Access Control List.
 * - It is used to authenticate and authorize clients to access the Redis
 *   server.
*/

const express = require("express");
const app = express();
const connectToMongoDB = require("./config/database");
const cookieParser = require("cookie-parser");
const { redisClient } = require("./config/redis");

require("dotenv").config();

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");

app.use(express.json());
app.use(cookieParser());    

/**
 * API Level Validation:
 * Q. Why we need to do API level validation, when we have schema level 
 *    validation?
 * => API level validation is used to validate the data at the API level
 *    so that:
 *    a. We don't do unnecessary database calls, which will save time and money.
 *    b. Provide better user experience. (faster response time)
 *    c. We can provide custom error messages to the user. (more specific) 
*/

app.use("/auth", authRouter);
app.use("/user", userRouter);

/**
 * Initialize Connection:
 * 1. First, Connect to Redis & MongoDB parallelly
 * 2. Then, Start the server
*/
const InitializeConnection = async () => {
    try {
        await Promise.all([redisClient.connect(), connectToMongoDB()])
            .then(() => {
                console.log("Connected to Redis & MongoDB");
            })
            .catch((err) => {
                console.log("Database Connection Error:", err);
            });

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (err) {
        console.log("Server Connection Error:", err);
    }
}

InitializeConnection();
