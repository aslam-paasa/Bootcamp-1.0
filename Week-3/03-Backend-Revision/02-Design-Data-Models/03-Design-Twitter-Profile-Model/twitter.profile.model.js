/**
 * Import Mongoose:
*/
const mongoose = require('mongoose')

/**
 * Define the Twitter Profile schema:
 * => This schema defines the structure of the Twitter Profile collection in the database.
 * => It includes fields for the full name, username, profile picture URL, status URL, bio, company, city, country, portfolio URL, followers count, and following count.
 * 
 * Note: Actions don't get into Schema like edit button, but information does.
 */
const twitterProfileSchema = new mongoose.Schema({
    fullName: String,
    username: String,
    profilePicURL: String,
    statusURL: String,
    bio: String,
    company: String,
    city: String,
    country: String,
    portfolioURL: String,
    followersCount: Number,
    followingCount: Number,
})

/**
 * Create the Profile model:
 * This line creates a Mongoose model from the Twitter Profile schema.
 */
const Profile = mongoose.model('Profile', twitterProfileSchema)

/**
 * Export the Profile model:
 * This line exports the Profile model, making it available for use in other parts of the application.
 */
module.exports = Profile
