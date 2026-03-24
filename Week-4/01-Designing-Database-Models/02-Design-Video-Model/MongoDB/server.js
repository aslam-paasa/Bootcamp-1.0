/**
 * Put everything inside HTTP Server and expose it to the world:
*/
const express = require('express');
const app = express();

/**
 * Import Mongoose:
*/
const mongoose = require('mongoose');
const Video = require('./video.model.js');

/**
 * Connecting database:
*/
mongoose.connect("mongodb+srv://aslampaasa420:Sy********er@cluster0.goyedz2.mongodb.net/videoDB");

/**
 * Function to add video data:
*/
async function addVideoData() {
    try {
        /**
         * Create a new Video document:
        */
        const newVideo = new Video({
            videoTitle: 'Learn Node.js in 1 Hour',
            channelName: 'Code with Aslam',
            channelLogo: 'https://example.com/logo.png',
            viewsCount: 152000,
            thumbnailURl: 'https://example.com/thumbnail.jpg',
            totalTime: 3600,
            watchedTimeInSeconds: 1800,
            postedDate: new Date('2024-01-15'),
            videoURL: 'https://example.com/video.mp4',
        });

        /**
         * Save the new Video document to the database:
        */
        const savedVideo = await newVideo.save();

        /**
         * Log a success message to the console:
        */
        console.log('Video data saved successfully:', savedVideo);
    } catch (error) {
        /**
         * Log an error message to the console:
        */
        console.error('Error saving video data:', error);
    }
}

/**
 * Call the addVideoData function:
*/
addVideoData();

app.listen(3000);