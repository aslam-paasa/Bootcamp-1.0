/**
 * Put everything inside HTTP Server and expose it to the world:
*/
const express = require('express');
const app = express();

/**
 * Import Mongoose:
*/
const mongoose = require('mongoose');
const Profile = require('./twitter.profile.model.js');

/**
 * Connecting database:
*/
mongoose.connect("mongodb+srv://aslampaasa420:Sy********er@cluster0.goyedz2.mongodb.net/twitterDB");

/**
 * Function to add Twitter profile data:
*/
async function addProfileData() {
    try {
        /**
         * Create a new Profile document:
        */
        const newProfile = new Profile({
            fullName: 'Aslam Paasa',
            username: '@aslampaasa420',
            profilePicURL: 'https://example.com/profilepic.jpg',
            statusURL: 'https://example.com/status.jpg',
            bio: 'Full Stack Developer | Coffee Lover ☕',
            company: 'Syntax4ever',
            city: 'Chennai',
            country: 'India',
            portfolioURL: 'https://aslampaasa.dev',
            followersCount: 1200,
            followingCount: 350,
        });

        /**
         * Save the new Profile document to the database:
        */
        const savedProfile = await newProfile.save();

        /**
         * Log a success message to the console:
        */
        console.log('Twitter profile saved successfully:', savedProfile);
    } catch (error) {
        /**
         * Log an error message to the console:
        */
        console.error('Error saving Twitter profile:', error);
    }
}

/**
 * Call the addProfileData function:
*/
addProfileData();

app.listen(3000);