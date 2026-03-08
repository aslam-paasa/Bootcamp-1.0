/**
 * Data Modelling is iterative process. It means, it is not important to
 * get it right in the first time. By correcting it again again, we are
 * improving our data model.
*/


/**
 * Import Mongoose:
*/
const mongoose = require('mongoose');


/**
 * Define the Video schema:
 * => This schema defines the structure of the Video collection in the database.
 * => It includes fields for the video title, channel name, channel logo, views count,
 *    thumbnail URL, total time, watched time in seconds, posted date, and video URL.
 */
const videoSchema = new mongoose.Schema({
    videoTitle: String,
    channelName: String,
    channelLogo: String,
    viewsCount: Number,
    thumbnailURl: String,
    totalTime: Number,
    watchedTimeInSeconds: Number,
    postedDate: Date,
    videoURL: String,
})


/**
 * Create the Student model:
*/
const Video = mongoose.model('Video', videoSchema)


/**
 * Export the Student model:
*/
module.exports = Video
