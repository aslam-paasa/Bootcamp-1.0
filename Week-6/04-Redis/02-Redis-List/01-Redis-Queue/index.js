/**
 * Redis Setup:
 * > docker run -d --name redis-stack -p 6379:6370 -p 8001:8001 redis/redis-stack:latest
 * > Copy and keep the Id given in the terminal
 * > Go to http://locahost:8001 (Redis Stack - GUI)
 * > Run: docker ps and copy containerId
 * > Run: docker exec -it <containerId> redis-cli
 *   - Input : PING
 *   - Output: PONG
 * 
 * Client Side Redis Library: ioredis
 * > npm i express ioredis
 * > redis.js to establish redis connection
*/

/**
 * Core Datatypes in Redis:
 * 1. String
 * 2. List
 * 3. Hash
 * 4. Set
 * 5. Zset (Sorted Set)
 * 6. Stream
 * 7. Bitmaps
 * 8. Hyperlog
 * 9. Geospatial
 * 10. Timeseries
 * ....
*/


/**
 * Redis List (Queue and Stack):
 * > Redis List are ordered collection of String implemented as 
 *   LinkedList.
 * > They support operation at both end 
 *   (push & pop elements from both ends)
*/

/**
 * Redis Sets:
*/

/**
 * Redis HashMaps:
*/


const express = require('express');
const { redis } = require('./redis.js')
const app = express()

/**
 * REDIS QUEUE (FIFO):
 * > Queue = First In First Out
 * > Redis uses List internally
 * > Flow    : Producer > Redis Queue > Consumer
 * > Use Case:
 *   - Background Jobs
 *   - Email Sending
 *   - Notifications
 * 
 * > Command: RPUSH + LPOP
 *          +-------------------------------------------------------+
 *   RPUSH: | "user1@gmail.com", "user2@gmail.com", user3@gmail.com |
 *          +-------------------------------------------------------+
 *          +-------------------------------------------------------+
 *   LPOP:  | "user2@gmail.com", user3@gmail.com                    |
 *          +-------------------------------------------------------+
 * 
 * Remember:
 * > Notifications/Live Events - Pub/Sub  (Announce karna hai) 
 * > Jobs/Tasks                - Queue    (Kaam karna hai)
*/
async function main() {
    /* Push to Queue */ 
    await redis.rpush("emailQueue", "user1@gmail.com");
    await redis.rpush("emailQueue", "user2@gmail.com"); 

    /* Consume from Queue */ 
    const emailJob = await redis.lpop("emailQueue");
    console.log("Processing email job:", emailJob);

    /* Check length of List */
    const length = await redis.llen("emailQueue");
    console.log(length);

    /* Print all the elements */
    const allEle = await redis.lrange("emailQueue", 0, -1);
    console.log(allEle);
}

app.listen(3000, () => {
    console.log('Server is listening on port 3000')
})