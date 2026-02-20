/**
 * User Login API:
 * - Develop a POST route at /login that allows users to log into
 *   their accounts by providing their email and password. Utilize
 *   the login fn to authenticate users. Handle errors effectively.
 *   1. Create a POST route: Set up a POST route at /login to handle
 *      requests for user logins.
 *   2. Login User: In the route handler, use the login fn to authenticate
 *      the user based on the provided email and password.
 *   3. Success Response: If the user is successfully authenticated,
 *      respond with the user's details. 
 *   4. Error Handling: If the credentials are invalid or an error
 *      arises, respond with an error message.
*/

const express = require('express');
const app = express();

const { initializeDatabase } = require("./db/db.connection");
const { Movie } = require("./models/movies.model");
const { User } = require("./models/users.model");

app.use(express.json());

initializeDatabase();

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

async function signup(userDetails) {
  try {
    const user = new User(userDetails);
    const newUser = await user.save();
    return newUser
  } catch (error) {
    throw error;
  }
}

app.post('/signup', async (req, res) => {
  try {
    const savedUser = await signup(req.body);
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user account' });
  }
});

async function login(email, password) {
  try {
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      console.log("Logged in user:", user);
      return user;
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    throw error;
  }
}


app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await login(email, password);
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/**
 * 1. Request: POST /login
 * 2. Request Body:
 *    {
 *       "email": "user@example.com",
 *       "password": "secretpassword"
 *    }
*/