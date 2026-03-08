/**
 * Signup Route:
 * 1. Create a signup route './signup' that allows users to register
 *    with a username and password.
 * 2. Store the registered users in an array. Ensure that usernames
 *    are unique.
 * 3. Respond with success message if registration is successful with 
 *    a token or an error message if the username is already taken.
 * */ 


const express = require('express');
const app = express();

/**
 * User DB object
*/
const users = []


/**
 * API Routes
*/
app.post('/signup', (req, res) => {
    const [username, password] = req.body;

    /**
     * Checks if the username is already taken
    */
   const userExists = users.some((user) => user.username === username);

   if(userExists) {
    res.status(400).json({ message: 'Username already taken' });
   } else {
    /**
     * Add user to user array
    */
    const token = 'abcdefghi';
    res.status(201).json({ message: 'Registration successful', token });
   }
});


/**
 * Server started
*/
app.listen(3000, () => {
    console.log('server started');
});