/**
 * What is pub subs?
 * - Publish-Subscribe (pub-sub) is a messaging pattern where messages are
 *   published to a topic without the knowledge of what or if any subscribers
 *   there might be.
 * - Similalry, subscribers listen for messages on topics of interest without
 *   knowing which publishers are sending them. 
 * - This decoupling of publishers and subscribers allows for highly scalable
 *   and flexible communication systems.
*/

/**
 * Leetcode System:
 * - In leetcode, user submits some code, sends it to the primary backend,
 *   sends it to the queue, worker picks it up. Once it is picked up, the
 *   workers needs to tell the browser that you have accepted or rejected
 *   and needs to send the final result to the browser.
 * 
 * If we remember from yesterday, how does leetcode do this?
 * - Pooling: If we submit the code, then check network tab, we will see
 *   after the submit/ request goes through, it starts to send a check/
 *   request again and again, means it is polling the backend - "Is the
 *   submission done?", and it sends response: { "status": "pending" }.
 *   And then it sends the final result: 
 * 
 *  { "status": "accepted", "output": "Your code is accepted" }
 * 
 * So leetcode uses polling, but we can do something better? Can we use
 * websockets?
 * - If we use websockets, the browser won't constantly poll the backend,
 *   but what if the server could push the result to the browser? For pushing
 *   events from the server to a client we could use websockets.
 * - After the worker is done processing our code, checking if it is correct,
 *   getting the response, it can send the response to a websocket server
 *   which is connected to the browser.
 * - Means one worker is done, it can signal to the websocket layer ki
 *   please tell { user:1, problem:2, status: TLE }, if he is connected
 *   to the websocker server, tell him that the status of this recent
 *   submission is TLE. And this is how a worker can push the result to
 *   the browser.
 * 
 * Why did we use pub sub layer between the worker and the websocket server,
 * why did't we use message queue, or why can't worker directly talk to
 * websocket server?
 * - Worker can never directly talk to the browser, they go very up and down
 *   quickly, and they should never be exposed over the Internet. So, we 
 *   have a fresh service (nodejs) that can talk to the browser, and whenever
 *   the worker completes the submission, it will publish the result to the
 *   pub sub layer that whoever is user-1, please tell him that the status
 *   of this recent submission is TLE. And websocket server is the listening
 *   to the pub sub layer as subscriber, and whenever the pub sub layer
 *   publishes the result, the websocket server will push the result to the
 *   browser.
 * 
 * Why can't worker directly talk to the websocket server?
 * - In the real world, we don't have one websocket server, we have a fleet
 *   of websocket servers to support millions of users, and our user could
 *   be connected to any of these websocket servers.
 * - Let's say user-1 is connect to ws-3, so whenever the workers done,
 *   it doesn't know ki should I send this information to ws-1, or ws-2,
 *   or ws-3. So, if can publish an event to a pub sub, and then whenever
 *   a user connects to a websocket layer, it can subscribe to an event 
 *   called userId-1, and if the worker knows that this submission is for
 *   userId-1, it can publish to the pubsub ki which will directly reach the
 *   websocket layer of user-1.
 * - And this is how we can scale the websocket server.
 * 
 *                                                  +--------+
 *                                           +----->| Sub-1  |
 *                                           | prob +--------+
 *           Publish to topic prob           |
 *   +-----------+        +------------+     |      +--------+
 *   |  Node.js  |------->|  Pub - Sub |-----+----->| Sub-2  |
 *   +-----------+        +------------+     | prob +--------+
 *                                           |   
 *                                           |      +--------+
 *                                           +----->| Sub-3  |
 *                                             prob +--------+
*/


/**
 * 1. Subscribe to a topic:
 *    - SUBSCRIBE problems_done
 * 
 * 2. Publishing to a topic:
 *    - PUBLISH problems_done "{ id:1, ans: 'TLE'}"
*/



/**
 * Pub Subs in Node.js:
 * Let's update the worker code to publish the final submission from the
 * worker of the redis pub sub.
*/



import { createClient } from "redis";
const client = createClient();

async function processSubmission(submission: string) {
    const { problemId, code, language } = JSON.parse(submission);

    console.log(`Processing submission for problemId ${problemId}...`);
    console.log(`Code: ${code}`);
    console.log(`Language: ${language}`);
    // Here you would add your actual processing logic

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Finished processing submission for problemId ${problemId}.`);
    client.publish("problem_done", JSON.stringify({ problemId, status: "TLE" }));
}

async function startWorker() {

    try {
        await client.connect();
        console.log("Worker connected to Redis.");

        // Main loop
        while (true) {
            try {
                const submission = await client.brPop("problems", 0);
                // @ts-ignore
                await processSubmission(submission.element);
            } catch (error) {
                console.error("Error processing submission:", error);
                // Implement your error handling logic here. For example, you might want to push
                // the submission back onto the queue or log the error to a file.
            }
        }
    } catch (error) {
        console.error("Failed to connect to Redis", error);
    }
}

startWorker();
