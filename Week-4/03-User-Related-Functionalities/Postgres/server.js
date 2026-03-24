const express = require('express');
const app = express();

/**
 * Import model functions
 */
const {
    signup,
    login,
    changePassword,
    updateProfilePicture,
    updateContactDetails,
    findUserByPhoneNumber,
    pool
} = require('./user.model');

/**
 * Run all operations
 */
async function run() {
    try {
        /**
         * SIGNUP
         */
        const user = await signup({
            email: 'example@example.com',
            password: 'password123',
            profilePictureUrl: 'https://example.com/profile.jpg',
            username: 'exampleuser',
            nickname: 'Example Nick',
            phoneNumber: 9876543210
        });
        console.log('User created:', user);

        /**
         * LOGIN
         */
        const loggedIn = await login('example@example.com', 'password123');
        console.log('Logged in:', loggedIn);

        /**
         * CHANGE PASSWORD
         */
        const updatedPassword = await changePassword(
            'example@example.com',
            'password123',
            'newpassword456'
        );
        console.log('Password updated:', updatedPassword);

        /**
         * UPDATE PROFILE PIC
         */
        const updatedPic = await updateProfilePicture(
            'example@example.com',
            'https://example.com/new.jpg'
        );
        console.log('Profile picture updated:', updatedPic);

        /**
         * UPDATE CONTACT
         */
        const updatedContact = await updateContactDetails(
            'example@example.com',
            { phoneNumber: 9999999999 }
        );
        console.log('Contact updated:', updatedContact);

        /**
         * FIND BY PHONE
         */
        const foundUser = await findUserByPhoneNumber(9999999999);
        console.log('Found user:', foundUser);

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await pool.end(); // close DB connection
    }
}

run();

/**
 * Start server
 */
app.listen(3000, () => {
    console.log('Server running on port 3000');
});