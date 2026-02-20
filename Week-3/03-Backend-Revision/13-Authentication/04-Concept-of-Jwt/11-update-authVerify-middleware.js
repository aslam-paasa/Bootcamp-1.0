/**
 * User Auth: Update authVerify middleware
 * 1. authVerify middleware will now use the verifyToken and the
 *    extractUserIDFromToken fn to verify the JWT token present in
 *    the request's Authorization header. 
 * 2. If the token is valid, set the req.user object with the user ID
 *    extracted from the decoded token and allow the request to proceed.
 * 3. If the token is invalid or missing, return a 401 status code with
 *    a JSON response containing the message "Unauthorized access, please
 *    add the token". 
 * */ 

const jwt = require('jsonwebtoken');
const secret = 'ksdnfaisodjfaiofj';

function authVerify(req, res, next) {
    const token = req.headers.authorization;

    try {
        const decoded = verifyToken(token);
        const userID = extractUserIDFromToken(decoded);
        req.user = { userID };
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized access, please add the token" });
    }
}