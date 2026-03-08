/**
 * 5. Running all the workers:
 *    a. Import all workers
 *    b. Write an async function to start all workers
 *    c. Run the function
 * 
 * Note: Ye workers kisi server pe run ho rha hoga, so we need to provide the
 *       redis connection they can listen from the queue. And for that we
 *       will create a 'connection.js' file.
 * 
 * 8. Now, the workers will start listening to the queue once the job is
 *    added to the queue, and will process the job.
 * 
 *    - Processing Job 1
 *      Transcoding video: https://www.youtube.com/watch?v=dQw4w9WgXcQ
 *    - Processing Job 2
 *      Transcoding video: https://www.youtube.com/watch?v=dQw4w9WgXcQ
 *    - Processing Job 3
 *      Transcoding video: https://www.youtube.com/watch?v=dQw4w9WgXcQ
 *    - Processing Job 4
 *      Transcoding video: https://www.youtube.com/watch?v=dQw4w9WgXcQ
*/

import { videoProcessingWorker } from "./queues/worker.js";

async function startWorkers() {
    await videoProcessingWorker.run();
}

startWorkers();


/**
 * 11. Add video input to the queue:
 *     - POST: /video-process
 *     - Body: { videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
 *     - Response: { jobId: "1" }
 * 
 *     - POST: /video-process
 *     - Body: { videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
 *     - Response: { jobId: "2" }
 * 
 *     - POST: /video-process
 *     - Body: { videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
 *     - Response: { jobId: "3" }
 * 
 *     - POST: /video-process
 *     - Body: { videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
 *     - Response: { jobId: "4" }
 * 
 * 12. Now we can run as many workers as we want:
 *     a. Terminal 1: node worker.js
 *        - Processessing Job 1
 *          Transcoding Job { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
 *          Transcoding Job Done... { url: { videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" } }
 *        - Processessing Job 3
 *          Transcoding Job { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
 *          Transcoding Job Done... { url: { videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" } }
 *     b. Terminal 2: node worker.js
 *        - Processessing Job 2
 *          Transcoding Job { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
 *          Transcoding Job Done... { url: { videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" } }
 *        - Processessing Job 4
 *          Transcoding Job { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
 *          Transcoding Job Done... { url: { videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" } }
 * 
 * 13. Now, we can see the job is processed in the queue:
 *     - GET: /video-process
 *     - Response: { jobId: "1" }
 *     - Response: { jobId: "2" }
 *     - Response: { jobId: "3" }
 *     - Response: { jobId: "4" }
*/