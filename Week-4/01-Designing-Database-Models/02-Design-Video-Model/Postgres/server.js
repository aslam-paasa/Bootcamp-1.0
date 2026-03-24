/**
 * Put everything inside HTTP Server and expose it to the world:
*/
const express = require('express');
const app = express();

/**
 * Import Video model:
*/
const Video = require('./video.model.js');

/**
 * Function to add video data:
*/
async function addVideoData() {
    try {
        const newVideo = {
            videoTitle: 'Learn Node.js in 1 Hour',
            channelName: 'Code with Aslam',
            channelLogo: 'https://example.com/logo.png',
            viewsCount: 152000,
            thumbnailURl: 'https://example.com/thumbnail.jpg',
            totalTime: 3600,
            watchedTimeInSeconds: 1800,
            postedDate: new Date('2024-01-15'),
            videoURL: 'https://example.com/video.mp4',
        };

        const savedVideo = await Video.createVideo(newVideo);

        console.log('Video data saved successfully:', savedVideo);
    } catch (error) {
        console.error('Error saving video data:', error);
    }
}

/**
 * Call function:
*/
addVideoData();

app.listen(3000, () => {
    console.log('Server running on port 3000');
});