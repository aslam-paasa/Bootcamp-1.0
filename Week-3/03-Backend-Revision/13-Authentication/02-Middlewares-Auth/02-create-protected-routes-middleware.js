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
const cors = require('cors');
const app = express();
app.use(cors())

function authVerify(req, res, next) {
    const token = req.headers.authorization;
    if (token === "abcdefghi") {
        return next();
    } res.status(401).json({ message: "Unauthorised access, please add the token" })
}


app.get('/user', authVerify, (req, res) => {
    res.json({ name: "Tanay", age: 31, pincode: "560102" })
});

app.get('/cart', authVerify, (req, res) => {
    res.json({ cart: [] })
})

app.post('/login', (req, res) => {
    // read username/password from the body
    // check in array/db if the username password pair is correct
    // if yes, then send them a token { token: "abcdefghi"}

    // if not, then send them a 401 response
})


/**
 * Server started
*/
app.listen(3000, () => {
    console.log('server started');
});