/**
 * Exercise-1: Creating an express app with signup and signin endpoints:
 * Let's initialize an express app that will use to generate authenticated
 * backend today.
 * 1. Initialize an empty Node.js project: npm init -y
 * 2. Create an index.js file, open the project in VS Code
 * 3. Add express as a dependency 
 * 4. Create two new POST routes, one for 'signing up' and one for
 *    'signing in'. 
 * 4. Use express.json as a middleware to parse the post request body
 * 5. Create an 'in-memory' variable called 'users' where you can store
 *    the 'username, password' and a 'token'(we will come to where this
 *    token is created later).
 * 6. Complete the signup endpoint to store the user information in the
 *    'in-memory variable'. 
 * 7. Create a function called 'generateToken' that generates a random
 *    string for you.
 * 8. Finish the signin endpoint. It should generate a token for the
 *    user and put it in the 'in-memory' variable for that user.
 * 
 * This can be improved further by:
 * 1. Adding zod for input validation
 * 2. Making sure the same user can't sign up twice
 * 3. Persisting data so it stays even if the process crashes, we'll be
 *    covering all of this eventually.
*/


/**
 * Authentication ka complete flow:
 * 
 * [Browser] <-----> [Server] <-----> [Database]
 * 
 * 1. Initial Sign-in:
 *    Browser -> Server: username/password bhejta hai
 *    Server -> Database: credentials verify karta hai
 *    Database -> Server: user details return karta hai
 *    Server: token generate karta hai
 *    Server -> Browser: token bhejta hai
 * 
 * 2. Future Requests:
 *    Browser -> Server: request ke saath token bhejta hai
 *    Server -> Database: token se user verify karta hai
 *    Database -> Server: user data return karta hai
 *    Server -> Browser: requested data bhejta hai
 * 
 * Token ka importance:
 * - Browser mein local storage mein save hota hai
 * - Server database mein user ke saath map karta hai
 * - Har request mein authentication ke liye use hota hai
 * - Basically user ka digital signature hai
 * 
 * Example Request with Token:
 * GET /api/user
 * Headers: {
 *    "Authorization": "Bearer a7Bf9..."
 * }
*/


const express = require("express");
const app = express();

/**
 * Express.json middleware:
 * a. We cannot access the username and password from the request body i.e. 
 *    - const body = req.body, until we use the express.json middleware.
 * 
 * b. We can use this middleware by writing: 
 *    - app.use(express.json());
 *    This will parse the request body and make it available in the req.body
 *    object.
*/

app.use(express.json());


/**
 * Global Variable:
 * - Create a in-memory variable called 'users' where you can store the
 *   'username, password' and a 'token'. This is because we haven't learned
 *    databases yet.
 * - [{username: "harkirat", password: "123456", token: "a7Bf9..."}]
 * - Now, whenever user hit the /signin endpoint, we will check if the user
 *    is present in the 'users' array or not.
 * - If the user is present, we will generate a token for them and store it
 *    in the 'users' array.
 * - If the user is not present, we will send a response back to the client
 *    saying that the user does not exist.
*/


const users = [];

/**
 * Generate a token: Should return a random string of 32 characters.
 * 1. Options Variable: Hum ek array banayenge jisme sare characters honge 
 *    (a-z, A-Z, 0-9).
 * 
 * 2. token: Ek khali string banayenge jisme hum token store karenge.
 * 
 * 3. For-loop 32-times: 32 baar loop chalayenge kyunki hume 32 characters
 *    ka token chahiye
 * 
 * 4. token += options[Math.floor(Math.random() * options.length)];
 *    Ye line 3 kaam karti hai:
 *    a. Math.random() * options.length
 *       - Math.random() 0 se 1 ke beech mein ek number generate karta hai
 *       - Isko options.length se multiply karte hain taki range 0 se array 
 *         length tak ho jaye
 *    b. Math.floor()
 *       - Upar wale number ko round down karke integer mein convert karta hai
 *       - Example: 5.7 ko 5 mein convert karega
 *    c. options[index] aur token mein add
 *       - Ab jo index mila hai usse array se character nikalte hain
 *       - Fir us character ko += ka use karke token string mein add kar dete
 *         hain
 * 
 * 5. return token: Final token return kar denge
 * 
 * Example: Agar humara token "a7Bf9..." jaisa kuch banega
*/

function generateToken() {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let token = "";

    for(let i = 0; i < 32; i++) {
        token += options[Math.floor(Math.random() * options.length)];
    }

    return token;
}



/**
 * Signup endpoint:
 * a. We will use the POST method to signup a user.
 * b. We will send the username and password in the request body.
 * c. We will store the username and password in the 'users' variable.
 * d. We will send a response back to the client.
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
 * 
 * 1. We will use the POST method to signin a user.
 * 2. We will send the username and password in the request body.
 * 3. We will check for username and password in the 'users' array. If it
 *    is present, we will generate a token for them and store it in the
 *    'users' array.
 * 4. If the username and password are not present, we will send a response
 *    back to the client saying that the username or password is incorrect.
*/


app.post("/signin", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    // let foundUser = null;
    // for(let i = 0; i < users.length; i++) {
    //     if(users[i].username === username && users[i].password === password) {
    //         foundUser = users[i];
    //     }
    // }

    // if(!foundUser) {
    //     const token = generateToken();
    //     foundUser.token = token;
    //     res.json({ message: token});
    // } else {
    //     res.status(403).send({ message: "Invalid username or password" });
    // }

    const user = users.find(user => user.username === username && user.password === password);

    if(user) {
        const token = generateToken();
        user.token = token;
        res.send({ token });
        console.log(users);
    } else {
        res.status(403).send({ message: "Invalid username or password" });
    }
    console.log(users);
    
})


app.listen(3000);


/**
 * 1. POST: http:/localhost:3000/signup
 *    Request Body: {
 *      username: "harkirat",
 *      password: "123456"
 *    }
 *    Response: {
 *      message: "Signup successful"
 *    }
 * 
 * 2. POST: http:/localhost:3000/signin
 *    Request Body: {
 *      username: "harkirat",
 *      password: "123456"
 *    }
 *    Response: {
 *       username: "harkirat",
 *       password: "123456",
 *       token: "a7Bf9..."
 *    }
*/
