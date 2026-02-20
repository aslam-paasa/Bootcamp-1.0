/**
 * Project: Authenticated Website
 * 1. Let people sign up to your website
 * 2. Only allow signed-in users to see people
 *    (Create a dummy people list)
 * 3. Restriction + Fetch API
 * 
 * => A website which has 2 endpoints -
 * (a) POST/signin                   (b) GET /users
 *     Body {                              Headers-
 *        username: string                   Authorization header
 *        password: string
 *     }                                     
 * => Returns a json web token with   => Returns an array of all users        
 *    username encrypted.                if the user is signed in 
 *                                       (token is correct) 
 *                                       Or,  
 *                                       Returns 403 status code if not.
 * 
*/

/**
 * Q. Why are we using JWT for authentication, not encryption?
 * => It is just common standard for doing it this. This saves database
 *    call anytime we are verifying the user.
 * => When the user sends you the token, we verify it in-memory and we 
 *    just proceed Vs 
 * => If we want to token was somehow that the username and password was
 *    hashed, to get the username password, we hit the database etc. 
 *    That's why JWT is the most easiest and fastest way to do encryption,
 *    decryption when it comes to web api's.
*/

/**
 * npm commands:
 * 1. npm install express
 * 2. npm install jsonWebtoken
*/

const express = require('express');
const jwt = require('jsonwebtoken');
const jwtPassword = "123456";

const app = express();
app.use(express.json());

/**
 * username & password stored in-memory in an array
*/
const ALL_USERS = [
    {
        username: "harkirat@gmail.com",
        password: "123",
        name: "harkirat singh",
    },
    {
        username: "raman@gmail.com",
        password: "123321",
        name: "Raman singh",
    },
    {
        username: "priya@gmail.com",
        password: "123321",
        name: "Priya kumari",
    },
];

/**
 * Fn: "Is this a valid user?" (Same as facebook)
*/
function userExists(username, password) {
    /**
     * Write logic to return true or false if this user exists in 
     * ALL_USERS array
    */
    let userExists = false;
    for (let i = 0; i < ALL_USERS.length; i++) {
        if (ALL_USERS[i].username === username && ALL_USERS[i].password === password) {
            userExists = true;
        }
    }
    return userExists;
}

app.post("/signin", function (req, res) {
    /**
     * 1. Receiving username & password from user (post)
    */
    const username = req.body.username;
    const password = req.body.password;

    /**
     * 2. If user doesn't exist:
    */
    if (!userExists(username, password)) {
        return res.status(403).json({
            msg: "User doesn't exist in our in-memory db",
        });
    }

    /** 
     * 3. If user exists: (JWT Signin)
     * => This takes "username" (JSON) as an input, converts into very
     *    long string, and we return it back to the user. 
     * => User then store in local storage etc. 
    */ 

    let token = jwt.sign({ username: username }, jwtPassword);
    return res.json({ token });
});

/**
 * get() API: 
 * => This "get" request verify the token that we send it in the headers
 *    is valid or not?
*/
app.get("/users", function (req, res) {
    const token = req.headers.authorization;
    
    try {
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;

        /**
         * return a list of users other than this username
        */
        res.json({
            users: ALL_USERS.filter(function(value) {
                if(value.username === username) {
                    return false;
                } else {
                    return true;
                }
            })
        })
    } catch (err) {
        return res.status(403).json({
            msg: "Invalid token !!!"
        })
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
