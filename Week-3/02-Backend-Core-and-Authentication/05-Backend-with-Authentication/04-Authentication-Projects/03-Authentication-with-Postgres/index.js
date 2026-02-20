/**
 * Database Connection Architecture:
 * 
 * [User] <-------> [Backend] <-------> [Database]
 *                    |
 *                    |-- Mongoose (ODM)
 *                    |-- Prisma (ORM)
 * 
 * - Mongoose ek ODM (Object Document Mapper) hai jo MongoDB ke saath kaam 
 *   karta hai.
 * - Prisma ek ORM (Object Relational Mapper) hai jo SQL databases ke saath 
 *   kaam karta hai
 * - Ye dono libraries backend aur database ke beech mein communication layer 
 *   ka kaam karti hain
 * - Inke through hum database operations ko easily handle kar sakte hain
 * - Agar hume ODM/ORM change karna hai to sirf connection configuration 
 *   change karni hogi, baaki code mein minimal changes karne padenge.
 * 
 * Example:
 * - MongoDB + Mongoose = NoSQL Database
 * - PostgreSQL + Prisma = SQL Database
 * 
 * 1. npm install prisma @prisma/client
 * 2. npx prisma init
 * 3. Set the DATABASE_URL in .env file
 */

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

/**
 * Custom Routes:
*/
import userRouter from "./routes/auth.route.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cookieParser());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express.json()); // JSON se data le skte hai
app.use(express.urlencoded({ extended: true })); // URL se data le skte hai


app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "test checked",
    });
});

app.use("/api/v1/users", userRouter);


app.listen(PORT, () => {
    console.log(`Backend is listening on port ${PORT}`);
});


