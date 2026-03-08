import { Worker } from "bullmq";
import { QueueMap, notificationQueue } from "./queue.js";
import { redisConnection } from "../connection.js";

/**
 * Fanout Architecture:
 * 1. When one video processing is done, then multiple notifications will be
 *    sent to the queue.
 * 2. And after 10 seconds, the notification will be sent to the user.
*/

const wait = (s) => new Promise(resolve => setTimeout(resolve, s * 1000));

/**
 * Video Processing Worker:
 * 1. Create a video processing worker
 * 2. Listen to the video processing queue
 * 3. Process the video
 * 4. If video processing is done:
 *    a. Then add a notification job to the queue
 *    b. And return true
 * 5. Export the video processing worker
*/
const videoProcessingWorker = new Worker(
    QueueMap["VIDEO_PROCESSING_QUEUE"],
    async (job) => {
        console.log(`Processing video: ${job.id}`);
        console.log(`Transcoding video: ${job.data}`);

        await wait(10);
        console.log(`Video transcoding done... ${job.data}`);

        await notificationQueue.add(`notification-${job.data.videoUrl}`, {
            notification: 'Video has been processed for ' + job.data.videoUrl
        });

        return true;
    }, {
        autorun: false,
        connection: redisConnection
    }
);


/**
 * Notification Worker:
 * 1. Create a notification worker
 * 2. Listen to the notification queue
 * 3. Send the notification to the user
 *    a. Concurrency: 1, means one notification will be sent at a time
 *    b. Limiter: 1, means after notification sent, wait for 10 seconds
 *       before sending the next notification
 * 4. Export the notification worker
*/
const notificationWorker = new Worker(
    QueueMap["NOTIFICATION_QUEUE"],
    async (job) => {
        console.log(`Sending notification to ${job.data.notification}`);
    },
    { 
        connection: redisConnection,
        autorun: false,
        concurrency: 1,
        limiter: {
            max: 1,
            duration: 10 * 1000 // 10 seconds
        }
    }
);


/**
 * Note: After video processing is done, the notification will be sent to the
 *       the queue, and after 10 seconds, the notification will be sent to the
 *       user.
*/


export { videoProcessingWorker, notificationWorker };
