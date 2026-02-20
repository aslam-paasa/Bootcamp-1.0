/**
 * Q. Create a Function to Update Profile Picture:
 * => Create a function updateProfilePicture that accepts a user's email
 *    and the new profile picture URL.
 * => Update the profile picture URL for the user.
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
 * Creating a Function to update profile picture:
*/
async function updateProfilePicture(email, newProfilePictureUrl) {
    try {
        const user = await User.findOne({ email })
        if (user) {
            user.profilePictureUrl = newProfilePictureUrl
            const updatedUser = await user.save()
            console.log('Profile picture updated for user:', updatedUser)
        } else {
            throw new Error('User not found')
        }
    } catch (error) {
        throw error
    }
}



/**
 *  Example usage of the updateProfilePicture function:
 * */
try {
    updateProfilePicture(
        'example@example.com',
        'https://example.com/new-profile.jpg',
    )
} catch (error) {
    console.error('Profile picture update failed:', error.message)
}
