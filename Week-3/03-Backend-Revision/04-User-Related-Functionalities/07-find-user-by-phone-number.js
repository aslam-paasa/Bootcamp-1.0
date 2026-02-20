/**
 * Q. Create a Function to Find User by Phone Number:
 * => Create a function findUserByPhoneNumber that accepts a phone number
 *    and retrieves the user associated with the phone number.
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
mongoose.connect("mongodb+srv://aslampaasa420:Sy********er@cluster0.goyedz2.mongodb.net/studentDB", {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
});

/**
 * Creating a Function to find User by phoneNumber:
*/
async function findUserByPhoneNumber(phoneNumber) {
    try {
        const userByPhoneNumber = await User.findOne({ phoneNumber })
        if (userByPhoneNumber) {
            console.log('User found by phone number:', userByPhoneNumber)
        } else {
            console.log('User not found.')
        }
    } catch (error) {
        throw error
    }
}


/**
 *  Example usage of the findUserByPhoneNumber function:
 * */
findUserByPhoneNumber('9876543210')