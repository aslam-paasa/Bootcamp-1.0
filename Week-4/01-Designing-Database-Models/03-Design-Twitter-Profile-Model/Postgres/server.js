/**
 * Put everything inside HTTP Server and expose it to the world:
*/
const express = require('express');
const app = express();

/**
 * Import Profile model:
*/
const Profile = require('./twitter.profile.model.js');

/**
 * Function to add Twitter profile data:
*/
async function addProfileData() {
    try {
        const newProfile = {
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
        };

        const savedProfile = await Profile.createProfile(newProfile);

        console.log('Twitter profile saved successfully:', savedProfile);
    } catch (error) {
        console.error('Error saving Twitter profile:', error);
    }
}

/**
 * Call function:
*/
addProfileData();

app.listen(3000, () => {
    console.log('Server running on port 3000');
});