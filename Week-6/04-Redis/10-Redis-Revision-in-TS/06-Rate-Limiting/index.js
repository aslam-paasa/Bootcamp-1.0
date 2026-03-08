const express = require("express");
const app = express();
const connectToMongoDB = require("./config/database");
const cookieParser = require("cookie-parser");
const { redisClient } = require("./config/redis");
const rateLimiter = require("./middleware/rateLimiter");

require("dotenv").config();

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");

app.use(express.json());
app.use(cookieParser()); 
app.use(rateLimiter);

app.use("/auth", authRouter);
app.use("/user", userRouter);


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