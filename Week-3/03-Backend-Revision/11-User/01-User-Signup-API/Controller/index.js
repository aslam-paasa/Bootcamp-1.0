/**
 * User Signup API:
 * - Develop a POST route at /signup that allows users to create new
 *   accounts by providing their user details. Utilize the signup
 *   fn to save the user's information. Handle errors gracefully.
 *   1. Create a POST Route: Design a POST route at /signup to handle
 *      requests for user signups.
 *   2. Signup User: In the route handler, use the signup fn to create
 *      a new user account based on the provided user details.
 *   3. Success Response: If the user account is successfully created,
 *      respond with saved user details. 
 *   4. Error Handling: If an error occurs during the process, respond
 *      with an error message.
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/**
 * 1. Request: POST /signup 
 * 2. Request Body:
 *    {
 *       "email": "akansha@example.com",
 *       "password": "akanshapassword",
 *       "username": "akansha",
 *       "profilePicture": "https://example.com/acprofile.jpg"
 *    }
*/