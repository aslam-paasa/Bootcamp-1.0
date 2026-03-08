/**
 * Q. Create protected routes middleware:
 *    1. Create a middleware which checks for "abcdefghi" in the
 *       authorization header. 
 *    2. Log the token
 *    3. Apply the middleware to the /user route. 
 *    4. Now, send some requests through Postman to check this
 *    5. Let's do an if/else 
 *       a. If header is there we let it pass to the route.
 *       b. Else we send a 401 error
 *       c. Test this with Postman
 * */


const express = require('express');
const app = express();

/**
 * User DB object
*/
const user = { name: "BA", age: 22, pincode: 490020 }

/**
 * Middleware to log at each API call
*/
const loggerMiddleware = (req, res, next) => {
    console.log("Incoming request at: ", new Date().toISOString());
    next();
}

/**
 * Middleware to verify if token present then proceed
*/
const authVerify = (req, res, next) => {
    const token = req.headers.authorization;
    if (token === "abcdefghi") {
        return next();
    } res.status(401).json({ message: "Unauthorised access, please add the token" })
}


/**
 * API Routes
*/
app.get('/user', loggerMiddleware, authVerify, (req, res) => {
    res.json(user);
});


/**
 * Server started
*/
app.listen(3000, () => {
    console.log('server started');
});