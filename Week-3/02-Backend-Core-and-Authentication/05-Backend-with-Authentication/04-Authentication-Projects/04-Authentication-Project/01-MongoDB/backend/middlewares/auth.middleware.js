/**
 * 1. Import Dependencies
 *    - jwt
 */
import jwt from "jsonwebtoken";


/**
 * 2. isLoggedIn middleware
 *    - Get token from cookie or Authorization header
 *    - Check Authorization header if no cookie
 *    - Verify token
 *    - Attach user to request
 *    - Return error if token is invalid
 */
export const isLoggedIn = async(req, res, next) => {
    try {
        /**
         * Debugging: Log cookies and headers
         */
        console.log('=== Auth Middleware Debug ===');
        console.log('Cookies:', req.cookies);
        console.log('Headers:', {
            cookie: req.headers.cookie,
            authorization: req.headers.authorization
        });
        
        /**
         * a. Get token from cookie or Authorization header
         */
        let token = req.cookies?.token;
        
        /**
         * b. Check Authorization header if no cookie
         */
        if (!token && req.headers.authorization) {
            token = req.headers.authorization.replace('Bearer ', '');
        }

        /**
         * Debugging: Log token
         */
        console.log('Token found:', token ? 'Yes' : 'No');
        
        /**
         * c. Check if token is present
         */
        if (!token) {
            console.log('No token found');
            return res.status(401).json({
                success: false,
                message: "Authentication required. Please login."
            });
        }

        /**
         * Decode and Verify token:
         */
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Token verified successfully');
            
            /**
             * d. Attach user to request
             */
            req.user = decoded;
            next();
        } 
        /**
         * e. If token is invalid, return error
         */
        catch (error) {
            console.log('Token verification failed:', error.message);
            return res.status(401).json({
                success: false,
                message: "Invalid token. Please login again."
            });
        }
    } catch (error) {
        /**
         * f. If there is an error, return error
         */
        console.error('Auth middleware error:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};