/**
 * Writing the frontend for the authentication system:
 * - Until now, we've been using POSTMAN and send out all the requests.
 * - Now, let's create a 'full-stack' application. Lets write the frontend
 *   that let's you:
 *   1. Signup
 *   2. Signin
 *   3. Get your information
 *   4. Logout
*/

/**
 * Writing the frontend:
 * 1. Create a index.html file
 * 2. Create a signup section
 * 3. Create a signin section
 * 4. Create a User Information section
 * 5. Create a logout button
*/

/**
 * Writing the onclick handler:
 * 1. Add the axios external library
 * 2. Write the signup function
 * 3. Write the signin function
 * 4. Write the logout function
 * 5. Write the getUserInformation function
*/

/**
 * Updating the backend:
 * - Let's server the index.html file directly from the backend.
 *   a. Approach-1:
 *   b. Approach-2:
*/

/**
 * Firing the getUserInformation call:
 * - Call the getUserInformation function when the page loads.
*/

/**
 * Assignment:
 * Conditionally render the logout or the signin/signup pages based on if
 * the user is already logged in or not.
*/


const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "ramdomharkiratilovekiara"
const app = express();
app.use(express.json());

const users = [];


/**
 * Logger middleware:
*/
function logger(req, res, next) {
    console.log(`${req.method} request came to ${req.url}`);
    next();
}

/**
 * Serving the index.html file from the backend:
 * - We do this to avoid CORS issues.
 * - CORS issues happen when the frontend and backend are running on different ports.
 * - We can avoid this by serving the frontend from the backend.
*/
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html")
})



/**
 * Signup endpoint:
*/
app.post("/signup", logger, function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    // Check if user already exists
    const userExists = users.find(user => user.username === username);
    if (userExists) {
        return res.status(400).json({
            message: "Username already exists"
        });
    }

    // Add new user
    users.push({
        username: username,
        password: password
    });

    res.json({
        message: "Signup successful" 
    });

    console.log(users);
})

/**
 * Signin endpoint:
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
            username: foundUser.username,
        }, JWT_SECRET);

        res.json({
            token: token
        })
    }
    console.log(users)
})


function auth(req, res, next) {
    const token = req.headers.token // jwt
    const decodedData = jwt.verify(token, JWT_SECRET);  // {username: "harkirat@gmail.com"}

    if (decodedData.username) {
        req.username = decodedData.username;
        next();
    } else {
        res.json({
            message: "You are not logged in"
        })
    }
}


/**
 * Me endpoint:
*/
app.get("/me", logger, auth, function (req, res) {
    const currentUser = req.username;

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