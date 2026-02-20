/**
 * Q. Create a Function to Update Contact Details:
 * => Create a function updateContactDetails that accepts a user's email and an object
 *    containing updated contact details. 
 * => Update the contact details for the user.
 * => Make sure to add the phoneNumber(Number) key in the User model first.
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
 * Creating a Function to update contact details:
*/
async function updateContactDetails(email, updatedContactDetails) {
    try {
        const user = await User.findOne({ email })
        if (user) {
            Object.assign(user, updatedContactDetails)
            const updatedUser = await user.save()
            console.log('Contact details updated for user:', updatedUser)
        } else {
            throw new Error('User not found')
        }
    } catch (error) {
        throw error
    }
}


/**
 *  Example usage of the updateContactDetails function:
 * */
try {
    updateContactDetails('example@example.com', {
        email: 'new@example.com',
        phoneNumber: 9876543210,
    })
} catch (error) {
    console.error('Contact details update failed:', error.message)
}