/**
 * Using bcrypt in login route:
 * Q. Enhance the login route by using bcrypt to securely compare
 *    passwords.
 * 
 * Understanding:
 * During login, the provided plain text password is compared with the
 * stored hashed password using 'bcrypt.compare()'
 * */

const express = require('express');
const app = express();

const bcrypt = require('bcrypt');


/**
 * API Routes
*/
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    /**
     * Checks if the username is already taken
    */
    const user = users.find((user) => user.username === username);

    if (!user) {
        return res.status(400).json({ message: 'Authentication Failed 1' });
    }

    try {
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const token = "abcdefghi";
            res.json({ message: "User Found", token });
        } else {
            res.status(401).json({ message: "Authentication Failed 2" });
        }
    } catch (error) {
        console.log(error);
        res.send(500).json({ message: "Authentication Failed 3" });
    }
});


/**
 * Server started
*/
app.listen(3000, () => {
    console.log('server started');
});