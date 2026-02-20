/**
 * Tokens vs JWTs:
 * - Token is a randomly generated extremely long string. But there is a 
 *   problem with using stateful tokens.
 * - Stateful means that we need to store these tokens in a variable right
 *   now(and eventually in a database). Then we are reading from this variable
 *   who is the user with this specific token. And eventually our application
 *   will look like this:
 *                                                       a. username
 *                                                       b. password
 *                 /signin                               c. token
 *  [Frontend]---------------------->[Backend]---------->[Database]
 * 
 * - Whenever the user sends a request in /me endpoint, backend will first
 *   hit the database and check if the token is valid or not. Then the database
 *   will return the user's information to the backend, and then we will
 *   return the user's information to the frontend.
 * - Problem: On every request, we are hitting the database, because our
 *   token is stateful, means it is stored somewhere.
 * 
 * Solution: JWTs
*/

/**
 * JWTs:
 * - JWTs or JSON Web Tokens, are a compact and self-contained way to 
 *   represent information between two parties. Self-contained means
 *   inside the token, we will store the information about the user.
 * - They are commonly used for authentication and information exchange 
 *   between two parties in web applications.
 * 
 * JWT are Stateless:
 * - JWT contains all the information needed to authenticate a request, so
 *   the server doesn't need to store session data. All the data is stored
 *   in the token itself.
*/

/**
 * Exercise-3: Replace token logic with JWT:
 * 1. Add the jsonwebtoken library as a dependency - 
 *    https://www.npmjs.com/package/jsonwebtoken
 * 2. Get rid of our generateToken function.
 * 3. Create a JWT_SECRET Variable
 * 4. Create a jwt for the user instead of a generating a token.
 *    => Notice we put the 'username' inside the token. The jwt holds your
 *       state. 
 *    => You no longer need to store the 'token' in the global 'users' variable.
 * 5. In the /me endpoint, use jwt.verify to verify the token.
 * 
 * Endpoint-1: /signup: username & password created
 * Endpoint-2: /signin: Again check if the username & password valid.
 *             If it is valid, we return back to the user a JWT. And this
 *             token is nothing but a representation of username. Basically,
 *             we take the username and encode it into a JWT token, and that
 *             JWT token is returned back to the user. It doesn't have any
 *             information about the password.
 * 
 * Endpoint-3: /me: Database hits comparison:
 *             Before JWT:
 *             - Har request pe database 2 baar hit hota tha:
 *               1. Username verify karne k liye
 *               2. Password verify karne k liye
 *             
 *             After JWT:
 *             - Ab database sirf 1 baar hit hota hai:
 *               1. Password verify karne k liye
 *             - Username JWT token se mil jata hai, database hit ki zarurat 
 *               nahi padti, but password k liye database hit hoga qki wo
 *               sensitive information hai.
 *             
 *             Performance improvement:
 *             - Database hits 50% kam ho gaye (2 hits se 1 hit)
 *             - Response time better ho gaya
 *             - Server pe load kam ho gaya
 * 
*/

const express = require("express");
/**
 * Step-1: Import the jsonwebtoken library.
 * Step-2: Create a JWT_SECRET with secret key.
*/
const jwt = require("jsonwebtoken");
const JWT_SECRET = 'aslampaasa'
const app = express();

app.use(express.json());

const users = [];



/**
 * Signup endpoint:
*/
app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (users.find(user => user.username === username)) {
        res.json({ message: "User already exists" });
        return; 
    }

    users.push({
        username: username,
        password: password
    });

    res.json({ message: "Signup successful" });
})


/**
 * Signin endpoint:
*/
app.post("/signin", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username && user.password === password);

    if(user) {
        /**
         * Step-3: Convert the username into a JWT token.
         * - jwt.sign() is used to create a JWT token.
         * - It takes 2 arguments:
         *   1. The payload: is the data you want to store in the token.
         *   2. The secret key: is used to encode/convert the payload 
         *      into a token.
         * - Since the token itself is stateless, we don't need to store
         *   in the server, but this get stores in the cookie of browser.
        */
        const token = jwt.sign({ username: username }, JWT_SECRET);

        res.send({ token });
        console.log(users);

    } else {
        res.status(403).send({ message: "Invalid username or password" });
    }
    console.log(users);
    
})


/**
 * Me endpoint:
*/

app.get("/me", (req, res) => {
    const token = req.headers.token; // jwt token is sent in the header
    /**
     * Step-4: Verify the token.
     * - jwt.verify() is used to verify the token.
     * - It takes 2 arguments:
     *   1. The token: is the token you want to verify.
     *   2. The secret key: is the key used to sign/decode the token.
     * - It returns the decoded information. { username: harkirat@gmail.com }
    */
    const decodedInformation = jwt.verify(token, JWT_SECRET);
    const username = decodedInformation.username;
    
    /**
     * Step-5: Search for password in the database:
    */

    let foundUser = null;

    for(let i = 0; i < users.length; i++) {
        if(users[i].username === username) {
            foundUser = users[i];
        }
    }

    if(foundUser) { 
        res.json({
            username: foundUser.username,
            password: foundUser.password
        })
    } else {
        res.status(401).json({ message: "Token invalid" });
    }
})


app.listen(3000);
