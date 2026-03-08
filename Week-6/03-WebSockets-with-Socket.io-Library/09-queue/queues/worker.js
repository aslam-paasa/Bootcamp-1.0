/**
 * 4. Worker Setup:
 *    a. Install BullMQ
 *    b. Import Worker from BullMQ
 *    c. Import QueueMap from queue.js file
 *    d. Create a worker for video processing queue.
 *       a. new Worker(queueName, async (job) => {
 *             const { videoUrl } = job.data;
 *             console.log(`Processing video: ${videoUrl}`);
 *          })
 *       b. By default worker always try to pull - "Process hua?" whenever the
 *          server starts. So, we need to stop the autorun and start it manually.
 *    e. Process the video.
 *    f. Export the worker.
 * 
 * 7. Import the redis connection from connection.js file
 *    a. import { redisConnection } from "../connection.js";
 *    b. Pass the connection to the worker
 *       - new Worker(queueName, async (job) => {
 *             const { videoUrl } = job.data;
 *             console.log(`Processing video: ${videoUrl}`);
 *          }, { connection: redisConnection })
 *    g. Run the worker
 *       - await videoProcessingWorker.run();
*/

import { Worker } from "bullmq";
import { QueueMap } from "./queue.js";
import { redisConnection } from "../connection.js";


/**
 * 10. Lets assume a job takes 10 seconds to process:
*/
const wait = (s) => new Promise(resolve => setTimeout(resolve, s * 1000));


const videoProcessingWorker = new Worker(
    QueueMap["VIDEO_PROCESSING_QUEUE"],
    async (job) => {
        console.log(`Processing video: ${job.id}`);
        console.log(`Transcoding video: ${job.videoUrl}`);

        await wait(10); // processing a video takes 10 seconds
        console.log(`Video transcoded successfully: ${job.id}`);

        return true;
    }, {
        autorun: false,
        connection: redisConnection
    }
);

export { videoProcessingWorker };
