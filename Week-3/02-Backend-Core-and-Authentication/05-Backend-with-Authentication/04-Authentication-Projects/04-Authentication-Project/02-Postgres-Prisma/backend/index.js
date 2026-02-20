import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { userRouter } from './routes/user.routes.js';

/**
 * Load environment variables:
 * - The .env file is not included in the repository.
 * - You need to create your own .env file and add the following variables:
 *   - JWT_SECRET
 *   - JWT_EXPIRES_IN
 *   - JWT_COOKIE_NAME
 *   - EMAIL_USER
 *   - EMAIL_PASS
 */
dotenv.config({ path: '../.env' });

const app = express();

/**
 * Middleware
 * - cookieParser: Parse cookies from the request
 * - cors        : Allow cross-origin requests
 * - express.json: Parse JSON bodies in the request
 * - express.urlencoded: Parse URL-encoded bodies in the request
 */
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: ['Set-Cookie', '*']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Routes:
 */
app.use('/api/v1/users', userRouter);

/**
 * Test route
 * - This route is used to test the server
 */
app.get('/', (req, res) => {
    res.json({ message: 'Hello from Prisma backend!' });
});

/**
 * Start the server
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
