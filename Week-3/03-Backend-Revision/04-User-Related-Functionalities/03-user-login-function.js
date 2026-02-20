/**
 * Q. Create a Function for User Login:
 * => Create a function login that accepts email and password, verifies
 *    the credentials, and returns user details upon successful login.
 *    (a) Get email and password from user - functional parameters
 *    (b) Need to get email and password from database - findOne
 *    (c) Make sure both matches. If yes, then login, if no, then 
 *        bye bye - if else logic.
 * */


/**
* Importing mongoose:
*/
const mongoose = require('mongoose');


/**
 * Assuming this is the path to your movie model:
*/
const User = require('./01-user-model');


/**
 * Connect to MongoDB:
*/
mongoose.connect("mongodb+srv://aslampaasa420:Sy*******er@cluster0.goyedz2.mongodb.net/studentDB", {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
});

/**
 * Creating a Function for User Login:
*/
async function login(email, password) {
    try {
        const user = await User.findOne({ email })
        if (user && user.password === password) {
            console.log('Logged in user:', user)
        } else {
            throw new Error('Invalid credentials')
        }
    } catch (error) {
        throw error
    }
}


/**
 * Example usage of the login function:
 * */
try {
    login('example@example.com', 'password123')
} catch (error) {
    console.error('Login failed:', error.message)
}
