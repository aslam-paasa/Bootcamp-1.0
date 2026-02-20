/**
 * Introducing the User Model/Structure/Schema:
 * => In this lesson, we'll dive into the concept of User Models and
 *    explore how to implement various user-related functionalities
 *    using Mongoose. Let's begin by defining the User Model with
 *    additional fields such as profile picture URL, username, and more.
 * 
 * Step-1: Define a User Model:
 * => Let's start by defining the User Model with fields like email, 
 *    password, profile picture URL, username, and other relevant details.
 * 
 * */


/**
 * Importing mongoose library:
*/
const mongoose = require('mongoose');


/**
 * Creating Schema for our User Model:
*/
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePictureUrl: String,
        username: { type: String, required: true, unique: true },
        nickname: String,
        // Other fields can be added here
    },
    {
        timestamps: true,
    },
)

/**
 * When we define this, it gives us an object on which save() is a
 * defined function:
*/
const User = mongoose.model('User', userSchema)


module.exports = User
