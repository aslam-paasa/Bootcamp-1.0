import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * isLoggedIn middleware:
 * - Check if the user is logged in
 * - If the user is logged in, set the user in the request
 * - If the user is not logged in, return a 401 Unauthorized status
*/
export const isLoggedIn = async (req, res, next) => {
    try {
        console.log('=== Auth Middleware Debug ===');
        console.log('Cookies:', req.cookies);
        console.log('Headers:', {
            cookie: req.headers.cookie,
            authorization: req.headers.authorization
        });

        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        console.log('Token found:', token ? 'Yes' : 'No');

        if (!token) {
            console.log('No token found');
            return res.status(401).json({
                success: false,
                message: 'Please login first'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decoded:', decoded);

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: {
                id: true,
                role: true
            }
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
};
