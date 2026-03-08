/**
 * Redis as a queue:
 * You can also push to a topic/queue on Redis and other processes can pop
 * from it.
 * Ex: Leetcode submissions that need to be processed asynchronously.
*/

/**
 * Queues:
 * Q. In a leetcode like system, where do we need queue?
 * - Anytime the user is on our platform (leetcode), and they try to submit
 *   a problem, a request should go to primary backend(express) of ours,
 *   that receive a request from user:
 * 
 *   problem_id: 1,
 *   code: "",
 *   language: "java"
 * 
 * - This input reaches the primary backend, and this pushes onto a queue.
 * 
 * Why does it pushes onto a queue?
 * - The reason we need to delegate this out because what if the user send
 *   us a code that's malicious, then the CPU of our primary backend that
 *   is supposed to serve other users not been used to run the other's code,
 *   which is why we delegate the user's code to some other system.
 * - Now the primary backend send the code to a worker-1, and it is called
 *   worker because it's job is to pick things, work on something and respond
 *   back.
 * - The primary backend puts it in a queue and our workers picks problems
 *   from the queue. 
 * 
 * Why do we need a queue? Why can't our primary backend simply tell worker-1
 * to simply execute this code?
 * - The reason we cannot do that is because what if 100 people send us 
 *   their code, we don't want to send them to the same worker which only
 *   has 4GB space. We have to make sure that every worker runs single code
 *   at a time, and queues become a very popular use case in this case.
 * - Even if we have 2 workers and 20 people submitting their problems, we
 *   will have a long queue, and workers will pick them slowly, so a lot
 *   of people will be waiting for their response, but we can guarantee ki
 *   worker-1 will pick only one item at a time, worker-2 will also pick
 *   one item at a time and so on.
 * - It will run it, store the response somewhere and then it will pick the
 *   next item.
 * 
 * Autoscaling:
 * Another benefit is, we can autoscale the workers. If we have 100 people
 * submitting their problems, we can add 10 more workers, and they will pick
 * the problems from the queue. But if the queue length becomes 3, we can
 * stop most of them, and only one worker is fine. (Autoscaling)
*/

/**
 * Where do we need queues?
 * - Whenever we have users who wants to do a long running expensive operation
 *   on our machines, be it submitting a code, or uploading a video for
 *   transcoding(converting into 720p, 1080p, etc.), we probably want to
 *   use an architecture like this where we can upscale and downscale
 *   workers based on the length of the queue.
 * 
 * Ex: RabbitMQ, SQS, etc
*/


/**
 * 1. Pushing to a queue:
 *    - LPUSH problems 1
 *    - LPUSH problems 2
 * 
 * 2. Popping from a queue:
 *    - RPOP problems 0
 *    - RPOP problems 30
 * 
 * Note: The last argument represents the timeout before the blocking should
 *       be stopped.
*/


/**
 * Talking to redis via Node.js:
 * - There are various clients that exist that let you talk to redis via Node.js:
 *   https://www.npmjs.com/package/redis
 * 
 * - Let's initialize a simple Node.js express server that takes a problem
 *   submission (very similar to leetcode) as input and sends it to the
 *   queue.
 * - Let's also create a worker service that picks up a problem, waits for
 *   2 seconds and then proceeds to pick the next one.
 * 
 * Leetcode System:
 *                                                           +----------+
 *                                                    +----->| Worker-1 |
 *                                                    |      +----------+
 *                                                    |
 *   +-------------------+        +-------------+     |      +----------+
 *   |  Primary Backend  |------->| Redis Queue |-----+----->| Worker-2 |
 *   +-------------------+        +-------------+     |      +----------+
 *                                                    |   
 *                                                    |      +----------+
 *                                                    +----->| Worker-3 |
 *                                                           +----------+
*/


/**
 * Code:
 * 1. Create an empty Node.js project
 * 2. Initialize 2 folders inside it:
 *    a. express-server
 *    b. worker
 * 3. Initialize an empty Node.js typescript project in both of them:
 *    - npm init -y
 *    - npx tsc --init
 * 4. Install dependencies in express-server:
 *    - npm i express @types/express redis
 * 5. Install dependencies in worker:
 *    - npm i redis
 * 6. Create index in express-server:
*/

import express from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());

const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));

app.post("/submit", async (req, res) => {
    const problemId = req.body.problemId;
    const code = req.body.code;
    const language = req.body.language;

    try {
        await client.lPush("problems", JSON.stringify({ code, language, problemId }));
        // Store in the database
        res.status(200).send("Submission received and stored.");
    } catch (error) {
        console.error("Redis error:", error);
        res.status(500).send("Failed to store submission.");
    }
});

async function startServer() {
    try {
        await client.connect();
        console.log("Connected to Redis");

        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    } catch (error) {
        console.error("Failed to connect to Redis", error);
    }
}

startServer();  