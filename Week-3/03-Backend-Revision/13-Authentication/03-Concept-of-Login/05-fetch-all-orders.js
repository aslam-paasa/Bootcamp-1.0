/**
 * Fetch all orders:
 * 1. Create a route '/orders' that returns a list of all orders.
 * 2. Make sure to update the users array with orders.
 * 3. Ensure that only authenticated users can access this route.
 *    a. Check for 'abcdefghi' in the authorization header.
 *       const authHeader = req.headers.authorization;
 * 4. Respond with a success message & all the users or an error message
 *    saying authentication failed.
 * 
 * Note: This time we will use the token to get the data.
 * */

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
app.use(cors())

const authToken = "abcdefghi";

function authVerify(req, res, next) {
    const token = req.headers.authorization;
    if (token === "abcdefghi") {
        req.user = { username: 'user1', password: 'password1' }
        return next();
    } res.status(401).json({ message: "Unauthorised access, please add the token" })
}


app.get('/user', authVerify, (req, res) => {
    res.json({ name: "Tanay", age: 31, pincode: "560102" })
});

app.get('/cart', authVerify, (req, res) => {
    res.json({ cart: [] })
})

app.use(express.json());

 

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    // Check if the username is already taken
    const userExists = users.some(user => user.username === username);

    if (userExists) {
        res.status(400).json({ message: 'Username already taken' });
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        users.push({ username, password: hashedPassword });
        const token = "abcdefghi";
        res.status(201).json({ message: 'Registration successful', token });
    }
});



app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username)

    if (!user) {
        return res.status(401).json({ message: 'Authentication failed 1' });
    }

    try {
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const token = "abcdefghi";
            res.json({ message: "User Found", token });
        } else {
            res.status(401).json({ message: 'Authentication failed 2' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Authentication failed 3' });
    }
});

app.get('/orders', authVerify, (req, res) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader === authToken) {
        console.log(req.user)
        const user = users.find(user => user.username === req.user.username);

        if (user) {
            res.json({ orders: user.orders, message: "Request is successful." });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } else {
        res.status(401).json({ message: 'Authentication failed' });
    }
});


app.listen(3000, () => {
    console.log('server started');
});


/**
 * URL: https://localhost:3000/login
 * Body: "username": "user12"
 *       "password": "eehuinabaat"
 * Response: {
 *              "message": "User Found",
 *              "token": "abcdefghi"
 *           }
*/