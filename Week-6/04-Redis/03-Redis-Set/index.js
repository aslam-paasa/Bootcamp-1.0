/**
 * Upstash Redis Setup:
 * 1. Create Redis Database
 *    a. Go to upstash.com
 *    b. Create account
 *    c. Create Redis database
 *    d. Copy:
 *       - REDIS_URL
 *       - REDIS_TOKEN
 * 
 * 2. Connecting Redis in Node.js (No Docker)
 *    a. Install Client: npm install @upstash/redis
 *    b. Create redis client
 *       import { Redis } from "@upstash/redis";
 *       
 *       export const redis = new Redis({
 *         url: process.env.REDIS_URL,
 *         token: process.env.REDIS_TOKEN,
 *       });
 * 
*/


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
 * Redis Set Data Type:
 * > Redis Sets are unordered collections of unique strings.
 * > Perfect for tracking unique items like IP Address, Aadhar No.,
 *   PAN Card, etc or implementing set operations like unions and 
 *   interactions
*/

/**
 * REDIS SET (UNIQUE COLLECTION):
 * > Set = unordered + unique elements
 * > Duplicate values not allowed
 * > Flow : Producer > Redis Set > Consumer
 * 
 * Key Properties:
 * a. Order guaranteed nahi hota
 * b. Har element unique hota hai
 * 
 * Use Cases:
 * a. Unique items store krna
 * b. Likes/Upvotes 
 * c. Online users
 * d. Tags/Categories 
 * e. Tracking IP Address
 */

const express = require('express');
const { redis } = require('./redis.js')
const app = express()


async function main() {
    /* 1. SADD: Add elements to set */ 
    await redis.sadd("onlineUsers", "user1");
    await redis.sadd("onlineUsers", "user2");
    await redis.sadd("onlineUsers", "user2"); // duplicate → ignored

    /* 2. SCARD: Check total elements */
    const count = await redis.scard("onlineUsers");
    console.log("Total online users:", count);

    /* 3. SISMEMBER: Check if user exists */
    const isUserOnline = await redis.sismember("onlineUsers", "user1");
    console.log("Is user1 online?", isUserOnline === 1);

    /* 4. SMEMBER: Get all members */
    const users = await redis.smembers("onlineUsers");
    console.log("Online users:", users);

    /* 5. SREM: Remove user */
    await redis.srem("onlineUsers", "user1");

    /* 6. SMEMBER: Get updated members */
    const updatedUsers = await redis.smembers("onlineUsers");
    console.log("After removal:", updatedUsers);

}


app.listen(3000, () => {
    main();
    console.log('Server is listening on port 3000')
})