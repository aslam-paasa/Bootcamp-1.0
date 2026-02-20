/**
 * Q. Create a function for User SignUp:
 * => Now, let's implement the signup functionality. 
 * => Create a function signup that accepts an object containing user
 *    details and creates a new user in the database.
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
 * Creating a Function for User Signup:
*/
async function signup(userDetails) {
    try {
        const user = new User(userDetails)
        const newUser = await user.save()
        console.log('New user created:', newUser)
    } catch (error) {
        throw error
    }
}


/**
 * Example usage of the signup function:
 * */
signup({
    email: 'example@example.com',
    password: 'password123',
    profilePictureUrl: 'https://example.com/profile.jpg',
    username: 'exampleuser',
    nickname: 'Example Nick',
})
