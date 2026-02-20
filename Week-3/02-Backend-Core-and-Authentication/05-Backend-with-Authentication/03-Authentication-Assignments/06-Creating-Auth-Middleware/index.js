/**
 * Assignment: Creating an Auth Middleware:
 * Q. Can you try creating a middleware called auth that verifies if a user
 *    is logged in and ends that request early if the user isn't logged in?
 * => After signin, in every endpoints, we are repeating the same JWT code to
 *    verify and then check if the user exists.
 * => We can create a middleware that does this verification and then call that
 *    middleware for every endpoint. [Don't repeat yourself]
 * => This widdleware will run after the request is made and before the 
 *    response is sent. 
 * => This will check if the user is is not logged in, it will ends the
 *    request early.
*/




const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "ramdomharkiratilovekiara"
const app = express();
app.use(express.json());

const users = [];


/**
 * Logger middleware:
 * - Logs the request method and url.
 * - Calls the next middleware in the stack.
*/
function logger(req, res, next) {
    console.log(`${req.method} request came to ${req.url}`);
    next();
}

/**
 * Signup endpoint:
 * - Adds a new user to the users array.
 * - Returns a message indicating that the user is signed in.
*/
app.post("/signup", logger, function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    })

    // we should check is a user with this username already exists

    res.json({
        message: "You are signed in"
    })

    console.log(users)

})

/**
 * Signin endpoint:
 * - Checks if the user exists and if the password is correct.
 * - Returns a JWT token if the user exists and the password is correct.
*/
app.post("/signin", logger, function (req, res) {


    const username = req.body.username;
    const password = req.body.password;

    let foundUser = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username && users[i].password == password) {
            foundUser = users[i]
        }
    }

    if (!foundUser) {
        res.json({
            message: "Credentials incorrect"
        })
        return;
    } else {
        const token = jwt.sign({
            username: username,
        }, JWT_SECRET);

        res.json({
            token: token
        })
    }
    console.log(users)
})


/**
 * Auth middleware:
 * - Middleware fns can perform a variety of tasks:
 *   a. Modifying the request and response objects.
 *      [So the next handler can get it].
 *   b. Ending the request-response cycle.
 *   c. Calling the next middleware in the stack.
 * - JWT verification and logic gets separated from the endpoint logic.
 * - Now we can use this middleware for every endpoint. 
*/

function auth(req, res, next) {
    const token = req.headers.token // jwt
    const decodedData = jwt.verify(token, JWT_SECRET);  // {username: "harkirat@gmail.com"}

    if (decodedData.username) {
        // modifying the request object
        req.username = decodedData.username;
        next();
    } else {
        res.json({
            message: "token invalid"
        })
    }
}


/**
 * Me endpoint:
*/
app.get("/me", logger, auth, function (req, res) {
    // req.username is set by the auth middleware
    const currentUser = req.username;

    let foundUser = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == currentUser) {
            foundUser = users[i]
        }
    }

    res.json({
        username: foundUser.username,
        password: foundUser.password
    })
})


app.listen(3000);