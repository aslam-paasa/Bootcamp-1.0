/**
 * What is Queue?
 * > Queue (Data Structure Concept)
 * > Queue follows: FIFO (First In First Out)
 * > Example: Job-1 gets processed first, then Job-2, then Job-3.
 *   +-------------------------+
 *   | [Job-1] [Job-2] [Job-3] |
 *   +-------------------------+
 * 
 * In Backend Systems:
 * > A queue is a system where:
 *   1. Client sends a request
 *   2. Instead of processing immediately
 *   3. The task is added to the queue
 *   4. A worker processes it later
 * 
 * Why not process immediately?
 * > Because some tasks:
 *   1. Take time (5-30 seconds)
 *   2. Are CPU heavy
 *   3. Involve third-party APIs
 *   4. Should not block user requests
 * > Example of tasks:
 *      - Running code execution
 *      - AI model interface
 *      - Video clipping
 *      - Sending emails
 *      - Generating PDFs
 *      - Processing Uploads
*/

/**
 * What is a Worker?
 * > A worker is a background process that:
 *   1. Listens to a queue
 *   2. Picks up jobs from the queue
 *   3. Executes them
 *   4. Marks them as completed or failed
 * > Client > API > Queue > Worker > Database/Response
 * 
 * > Workers can:
 *   - Run in separate server
 *   - Run in Docker
 *   - Scale independently
 *   - Run multiple instances
*/

/**
 * What is Message Broker?
 * > A message broker is a middleware software b/w the API and worker that:
 *   1. Stores messages (jobs)
 *   2. Distributes them to workers
 *   3. Ensures reliability
 *   4. Handles retries
 *   5. Prevents job loss
 * > Example: Redis, Kafka, RabbitMQ, BullMQ, AWS SQS, etc.
 * 
 * > Analogy:
 *     Customer = Client
 * +---Waiter   = Queue <------------+ (takes the order)
 * |                                 |
 * +-->Order    = Message Broker-----+ (holds the job reliably)
 *     Kitchen  = Worker               (does the actual work)
*/

/**
 * SYNCHRONOUS vs ASYNCHRONOUS — Bulk Email Example
 * SCENARIO: User uploads a CSV of 10,000 email addresses.
 *           The server must send a newsletter to every address.
 * 
 * ──────────────────────────────────────────────────────────────────
 * SYNCHRONOUS (no queue) — the wrong way for heavy tasks
 * ──────────────────────────────────────────────────────────────────
 *
 *   POST /send-newsletter
 *        │
 *        ▼
 *   Parse CSV (10,000 rows)
 *        │
 *        ▼
 *   for each email → sendEmail()   ← blocks the server for ~5 minutes
 *        │
 *        ▼
 *   res.json({ sent: 10000 })      ← client never sees this (timeout)
 *
 *   Problems:
 *     - HTTP request times out (30–60 s limit)
 *     - Server is blocked: no other request can be handled
 *     - If server crashes mid-loop, all progress is lost
 *     - No way to retry failed emails
 * 
 * ──────────────────────────────────────────────────────────────────
 * ASYNCHRONOUS (with queue) — the right way
 * ──────────────────────────────────────────────────────────────────
 *
 *   POST /send-newsletter
 *        │
 *        ▼
 *   Parse CSV → split into batches of 100
 *        │
 *        ▼
 *   Add 100 jobs to queue (one job = one batch)   ← ~10ms total
 *        │
 *        ▼
 *   res.json({ jobId, status: "queued" })         ← instant response
 *
 *             (meanwhile, in the background)
 *
 *   Worker picks up Job-1  → sends 100 emails → marks complete
 *   Worker picks up Job-2  → sends 100 emails → marks complete
 *   ...                      (retries any failures automatically)
 *   Worker picks up Job-100 → sends 100 emails → marks complete
 *
 *   Benefits:
 *     - API responds in milliseconds
 *     - Server stays free for other requests
 *     - Failed batches are retried automatically
 *     - Workers can run in parallel (multiple instances)
 *     - Progress is trackable via jobId
*/


/**
 * BullMQ - Message Broker
 * > A Node.js library that implements a message broker on top of redis.
 * > You add jobs to a Queue from your API, and a Worker processes them
 *   in the background - in the same process or a completely separate one.
 * 
 * 1. Why Redis? — the storage layer 
 *    > BullMQ does not store jobs in memory.
 *    > It stores them in Redis, an in-memory key-value database that
 *      runs  a separate process.
 * 
 *    Why Redis?
 *    a. Speed — reads/writes in microseconds (stored in RAM)  
 *    b. Lists — Redis has native list/sorted-set structures that map
 *               perfectly to a FIFO queue
 *    c. Atomicity — Redis operations are atomic, so two workers can
 *                   never pick up the same job simultaneously
 *    d. Persistence — Redis can write to disk (AOF/RDB), so jobs
 *                     survive a server restart
 *    e. Pub/Sub   — Redis pub/sub powers QueueEvents notifications
 * 
 *    What Redis actually stores for each job:
 *    bull:email:1         → { name, data, opts, timestamp, ... }          
 *    bull:email:waiting   → list of job IDs not yet picked up       
 *    bull:email:active    → list of job IDs currently being worked  
 *    bull:email:completed → list of finished job IDs               
 *    bull:email:failed    → list of job IDs that exhausted retries
 * 
 *    Without Redis, if your Node process crashes mid-job, the job would
 *    vanish. With Redis, the job stays in the "active" list until the
 *    worker explicitly marks it done or failed.
 * 
 * 2. IORedis — the Redis client
 *    > BullMQ uses IORedis (not the official 'redis' package) to talk
 *      to the Redis.
 *    > You create one connection object and pass it to every Queue,
 *      Worker, and QueueEvents instance.
 *    > Code Template (redis.js - shared across all files):
 *      import IORedis from "ioredis";
 *      export const connection = new IORedis({ 
 *        host: "localhost",           // or your Redis server IP
 *        port: 6379,                  // default Redis port
 *        maxRetriesPerRequest: null,  // required by BullMQ
 *      }); 
 * 
 * 3. Queue — adding jobs
 *    > A named channel
 *    > Calling queue.add() serializes your data to JSON and pushes a
 *      job entry into Redis.
 *    > The API returns immediately  - no waiting for processing
 * 
 *      queue.add(jobName, data, options)                              
 *      - jobName                  - string label — route jobs in worker   
 *      - data                     - plain object — worker reads job.data  
 *      - options.attempts         - retry count on failure (default 1)    
 *      - options.delay            - ms before job becomes available       
 *      - options.removeOnComplete - delete from Redis after success    
 *      - options.removeOnFail     - delete from Redis after all retries
 * 
 *    > Code Template:
 *      const emailQueue = new Queue("email", { connection }); 
 *                                                             
 *      const job = await emailQueue.add(                      
 *        "send-batch",                                        
 *        { batch: [...], subject: "Hello" },                  
 *        { attempts: 3, removeOnComplete: true }              
 *      );                                                     
 *      console.log(job.id); // BullMQ-assigned ID stored in Redis 
 * 
 * 4. Worker — processing jobs
 *    > Connects to Redis and long-polls the queue for new jobs.
 *    > When a job arrives, BullMQ atomically moves it from 
 *      "waiting" → "active" and calls your handler function. 
 *    > No two workers can claim the same job.
 * 
 *    > After your handler:
 *      - Returns a value → job moves to "completed", value stored 
 *      - Throws an error → job is retried (up to attempts), then 
 *        moves to "failed".
 * 
 *      job.data             - the object passed to queue.add()   
 *      job.name             - the jobName string (use to branch) 
 *      job.id               - unique Redis key                   
 *      job.updateProgress() - report 0–100 progress 
 * 
 * 
 *    > Code template:                                                 
 *      const worker = new Worker(                                   
 *        "email",                        // must match queue name   
 *        async (job) => {                                           
 *          if (job.name === "send-batch") {                         
 *            for (let i = 0; i < job.data.batch.length; i++) {      
 *              await sendEmail(job.data.batch[i], job.data.subject);
 *              await job.updateProgress(                            
 *                Math.round((i + 1) / job.data.batch.length * 100)  
 *              );                                                   
 *            }                                                      
 *            return { sent: job.data.batch.length };                
 *          }                                                        
 *        },                                                         
 *        { connection }                                             
 *      ); 
 * 
 * 5. QueueEvents — job lifecycle notifications 
 *    > A separate listener that subscribes to Redis pub/sub channels
 *      BullMQ publishes to on every state change.
 *    > Use it to log outcomes, trigger webhooks, or update a database
 *      record when a job finishes.
 * 
 *    > Events: completed, failed, progress, stalled, active, waiting
 * 
 *    > Code template:                                          
 *      const events = new QueueEvents("email", { connection });
 *                                                              
 *      events.on("completed", ({ jobId, returnvalue }) => {    
 *        console.log(`Job ${jobId} done:`, returnvalue);       
 *      });                                                     
 *      events.on("failed", ({ jobId, failedReason }) => {      
 *        console.error(`Job ${jobId} failed:`, failedReason);  
 *      });                                                     
 *      events.on("progress", ({ jobId, data }) => {            
 *        console.log(`Job ${jobId}: ${data}%`);                
 *      }); 
 * 
 * 6. Job States — how a job moves through Redis 
 *                                                                
 *     queue.add()                                                
 *         │                                                      
 *         ▼                                                      
 *     waiting  ── delay set? ──▶  delayed                       
 *         │                           │                          
 *         ▼                           ▼                          
 *     active  (worker is running it)                             
 *         │                                                      
 *         ├── return value  ──▶  completed                      
 *         │                                                      
 *         └── throw error                                        
 *                 │                                              
 *                 ├── attempts left? ──▶  waiting (retry)       
 *                 └── no attempts left ─▶ failed                
 *                                                                
 *   A "stalled" job is one whose worker crashed mid-execution.   
 *   BullMQ detects this via a heartbeat and moves the job back to
 *   "waiting" automatically.
 * 
 * 6. Common Mistakes:
 *    a. Queue name and Worker name must match exactly
 *       new Queue("email", ...)      // queue
 *       new Worker("emails", ...)    // WRONG — never picks up jobs
 *       new Worker("email", ...)     // RIGHT
 * 
 *    b. Missing maxRetriesPerRequest — causes runtime timeout errors
 *       new IORedis()                               // WRONG
 *       new IORedis({ maxRetriesPerRequest: null }) // RIGHT
 * 
 *    c. No retry configured — one crash = job lost forever
 *       emailQueue.add("send-batch", data)                   // WRONG
 *       emailQueue.add("send-batch", data, { attempts: 3 })  // RIGHT
 * 
 *    d. job.data contains strings only — always parse numbers
 *       job.data.count + 1   // might be "1001" if count came as string
 *       Number(job.data.count) + 1  // RIGHT
*/


/**
 * Installation Guide:
 * 1. Install Redis: docker run -itd -p 6379:6379 redis
 * 2. Initialize Project: npm init -y
 * 3. Install: npm install bullmq ioredis express dotenv
 * 4. Configure Redis & Create Server
 * 5. Create Email Queue
 * 6. Create Email Worker
 * 7. Run: node src/server.js & node workers/email.worker.js
 * 8. Push Email Job/Data to Queue:
 *    http://localhost:3000/send-email
 *    {
 *        "to": "test@gmail.com"
 *    }
 * 9. Response:
 *    - { message: "Email Job added to queue", jobId: "123" }
 *    - After 3 seconds: { message: "Email Job completed", jobId: "123" }
*/


require("dotenv").config();
const express = require("express");
const { emailQueue } = require("../queue/email.queue.js");

const app = express();

app.use(express.json());

/* 6. Push Email Job/Data to Queue */
app.post("/send-email", async (req, res) => {
    const { to } = req.body;
    if (!to) {
        return res.status(400).json({ message: "Missing to field" });
    }

    const job = await emailQueue.add("sendEmailJob", { to }, { attempts: 3 });
    res.json({
        message: "Email Job added to queue",
        jobId: job.id,
    });
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
})