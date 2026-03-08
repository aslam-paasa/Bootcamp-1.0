/**
 * 3. Defining Queue:
 *    a. Install BullMQ
 *       - npm i bullmq
 *    b. Import Queue from BullMQ
 *    c. Create a Queue Map:
 *       - This is used to store the queue name.
 *       - VIDEO_PROCESSING_QUEUE is used to store the video processing queue.
 *    d. Create a queue & export it.
 * 
 * 6. Import the redis connection from connection.js file
*/

import { Queue } from "bullmq";
import { redisConnection } from "../connection.js";

export const QueueMap = {
    "VIDEO_PROCESSING_QUEUE": "VIDEO_PROCESSING_QUEUE"
}

export const videoProcessingQueue = new Queue(
    QueueMap["VIDEO_PROCESSING_QUEUE"],
    { connection: redisConnection }
);

