/**
 * Q. Create a Function to Change Password:
 * => Create a function changePassword that accepts a user's email, 
 *    current password, and new password.
 * => Update the password if the current password matches.
*/


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
 * Creating a Function to change password:
*/
async function changePassword(email, currentPassword, newPassword) {
    try {
        const user = await User.findOne({ email })
        if (user && user.password === currentPassword) {
            user.password = newPassword
            const updatedUser = await user.save()
            console.log('Password changed for user:', updatedUser)
        } else {
            throw new Error('Invalid credentials')
        }
    } catch (error) {
        throw error
    }
}


/**
 * Example usage of the changePassword function:
 * */
try {
    changePassword('example@example.com', 'password123', 'newpassword456')
} catch (error) {
    console.error('Password change failed:', error.message)
}