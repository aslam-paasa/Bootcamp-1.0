/**
 * Middleware for handling auth:
 * - Implement admin auth logic
 * - You need to check the headers and validate the admin from the admin DB. 
 * - Check readme for the exact headers to be expected
*/
function adminMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;

    /**
     * Check if this admin exists in the database logic:
    */
    

    console.log("admin middleware active");
    next();
}

module.exports = adminMiddleware;