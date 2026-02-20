/** 
 * Authentication & Middleware:
 * - Middleware checks if the user is authenticated before moving forward.
 * 
 * 1. What is Middleware?
 *    - Middleware is like a security guard between user and server
 *    - It checks every request before it reaches the controller
 *    - Can modify or add information to requests/responses
 * 
 * 2. Why Use Middleware for Authentication?
 *    - Instead of checking user's identity in every controller
 *    - We create one middleware that handles all authentication
 *    - Makes code DRY (Don't Repeat Yourself)
 *    - Centralizes security logic
 * 
 * 3. How Authentication Works:
 *    - User sends request with token (in cookie)
 *    - Middleware checks if token is valid
 *    - If valid, adds user info to req.user
 *    - Request continues to controller
 * 
 *      [user] ----> [controller] ----> [middleware] ----> [route]
 *                                          verifyToken
 *                                          req, res, next
 * 
 * 4. Request Flow:
 *    User Request -> Middleware (Auth Check) -> Controller -> Response
 *    [Token Check]    [Add User Info]    [Business Logic]
 * 
 * Note: Middleware are always used in 'routes' because middleware is a
 *       functionality which is used between request and response.
*/

import jwt from "jsonwebtoken";

/**
 * Authentication Middleware Steps:
 * 
 * 1. Get token from cookies
 * 2. If no token found, return error
 * 3. Verify token using JWT secret
 * 4. If token is valid, add user info to request
 * 5. If token is invalid, return error
 * 6. Pass control to next middleware/controller
*/

const isLoggedIn = async (req, res, next) => {
    try {
        /**
         * 1. Check for token in cookies
         */
        const token = req.cookies.accessToken || req.cookies.token || "";

        console.log('Cookies:', req.cookies);
        console.log('Token Found:', token ? "YES" : "NO");

        /**
         * 2. If no token found, return error
         */
        if(!token) {
            console.log('Token Not Found');
            return res.status(401).json({
                success: false,
                message: "Authentication Failed - No token found"
            });
        }

        /**
         * 3. Verify token
         */
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded);
        
        /**
         * 4. Add user info to request
         */
        req.user = decoded;

        /**
         * 5. Pass control to next middleware/controller
         */
        next();

    } catch (error) {
        console.log('Error in isLoggedIn middleware: ', error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export { isLoggedIn };
