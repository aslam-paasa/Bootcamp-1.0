/**
 * Signup with bcrypted password:
 * 1. If the username is not taken, hash the provided password surely
 *    using bcrypt with a salt.
 *    a. Import the bcryt library at the beginning of your life.
 *    b. Generate a salt using bcrypt.genSalt() with a cast factor of 10.
 *    c. Hash the user's password using bcrypt.hash() with generated salt.
 *    d. Store the hashed password in the users array along with the
 *       username.
 * */ 


/**
 * Understanding:
 * Bcrypting is required for password security. It hashes password with
 * unique salts, making them resistant to attacks, such as brute force
 * and rainbow tables. The cost factor adds an extra layer of security,
 * and bcrypt can adapt to evolving hardware for long-term protection.
 * 1. Generate a Salt:
 *    Use bcrypt.genSalt(10) to create a random 'salt' with a cost factor
 *    of 10. The salt enhances security by making each password hash unique.
 * 2. Hash the Password:
 *    Apply bcrypt.hash(password, salt) to securely hash the user's password
 *    with the generated salt. Store this hashed password in your database.
*/


const express = require('express');
const app = express();

const bcrypt = require('bcrypt');


/**
 * API Routes
*/
app.post('/signup', async (req, res) => {
    const [username, password] = req.body;

    /**
     * Checks if the username is already taken
    */
   const userExists = users.some((user) => user.username === username);

   if(userExists) {
    res.status(400).json({ message: 'Username already taken' });
   } else {
    /**
     * Same as prev code, only these 2 new lines are added
    */
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(users); // to test
    users.push({ username, password: hashedPassword })
    const token = "abcdefghi";
    res.status(201).json({ message: 'Registration successful', token });
   }
});


/**
 * Server started
*/
app.listen(3000, () => {
    console.log('server started');
});