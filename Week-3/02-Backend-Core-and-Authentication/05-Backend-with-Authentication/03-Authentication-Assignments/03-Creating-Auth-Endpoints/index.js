/**
 * Exercise-2: User Information Endpoint
 * Jab user sign in kar leta hai, toh usko apni information kaise milegi?
 * Jaise ki - "Mujhe batao ki mere paas kon kon se courses hain?"
 * 
 * Iske liye hum ek simple endpoint banayenge:
 * 1. User ko /me endpoint pe request karni hogi
 * 2. Request ke saath apna token bhejna hoga
 * 3. Server token check karega:
 *    - Agar token sahi hai: user ki information return karenge
 *    - Agar token galat hai: error return karenge
 * 
 * Yeh bilkul ATM ki tarah kaam karta hai:
 * - ATM card = Token
 * - Account details = User information
 * - No card = No information!
*/

const express = require("express");
const app = express();

app.use(express.json());

const users = [];

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
        const token = generateToken();
        user.token = token;
        res.send({ token });
        console.log(users);
    } else {
        res.status(403).send({ message: "Invalid username or password" });
    }
    console.log(users);
    
})


/**
 * Me endpoint:
 * - Whenever any request comes to /me endpoint, they will send their token
 *   along with the requestin the headers.
 *   a. If the token is valid, we will return the user their information.
 *   b. If the token is invalid, we will return a 401 error.
 * 
 * What does the server needs to do:
 *   1. Signup: Create a new user with username and password.
 *   2. Signin: Based on the username and password, generate a token.
 *   3. Me: Find the user with the matching token.
 * 
 * - Once we are signin, the user will not send the username and password
 *   again and again. They will send the token.
 * - So, we need to extract the token from the headers in a variable, and 
 *   and using that variable we will check if the token is matching with
 *   the token in the users array.
 * - If the token is matching, we will return the user their information. 
*/

app.get("/me", (req, res) => {
    const token = req.headers.token;
    let foundUser = null;

    for(let i = 0; i < users.length; i++) {
        if(users[i].token === token) {
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
