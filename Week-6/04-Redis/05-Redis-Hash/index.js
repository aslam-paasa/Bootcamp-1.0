/**
 * Traditional Approach (Without Redis):
 * > Socho hum MySQL use kr rhe hai.
 *   - Jab bhi humein data read/write (query/mutate) karna hota hai,
 *     hum direct MySQL DB ko hit krte hai
 *   - DB query run hoti hai
 *   - Result wapas milta hai
 * > Ab problem yahan aati hai
 *   - Same query baar-baar chal rhi hai
 *   - Data change nhi ho rha
 *   - Phir bhi har baar request pe DB hit ho rhi hai
 * > Iske liye:
 *   - High Latency (slow reponse)
 *   - Unnecessary DB load
 *   - Poor scalability
 * > Basically hum direct access kar rhe hai MySQL se every time.
 * 
 * Solution: Redis (Remote Dictionary Server)
 * > RAM is super fast compared to disk-based DBs:
 *   - Frequently used data ko
 *   - DB k bajaye
 *   - Memory (RAM) mein rakh do
*/


/**
 * REDIS:
 * > Redis is open-source, in-memory, NoSQL, Key-Value Store.
 * > Redis:
 *   1. Stores frequently accessed data
 *   2. Serves data without hitting DB
 *   3. Reduces DB load
 *   4. Improves response time massively
 * > Commong Use Cases:
 *   1. Caching            : API Responses, DB Query Results
 *   2. Session Storage    : Login Sessions, Auth tokens
 *   3. Real Time Analytics: Page views, Active Views, Online Users
 *   4. Messaging Systems  : Pub/Sub
 *   5. Background Jobs    : Queues, Task Processing
 *   6. Temporary Storage  : OTPs, Verification Tokens, Expiring data
 *   7. Rate Limiting      : Limit Login attempts, Prevent API abuse
 * 
 * Note: Redis is used when speed matters more than permanent storage.
*/

/**
 * Jargons:
 * 1. Redis      : CLI of Redis
 * 2. Redis Stack: GUI of Redis
 * 
 * Service like Redis:
 * 1. Redis Cloud
 * 2. AWS ElastiCache
 * 3. Azure Cache for Redis
 * 4. Upstash (we'll use this)
 * 
 * Why Upstash Redis?
 * > You don't want Docker today
 * > Upstash:
 *   - Serverless Redis
 *   - No Docker, No infra
 *   - Works perfectly with Node.js
 *   - Free tier for learning
 *   - HTTPS based (REST + Redis Protocol)
*/

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
 * Redis Docker Setup:
 * > docker run -d --name redis-stack -p 6379:6370 -p 8001:8001 redis/redis-stack:latest
 * > Copy and keep the Id given in the terminal
 * > Go to http://locahost:8001 (Redis Stack - GUI)
 * > Run: docker ps and copy containerId
 * > Run: docker exec -it redis-stack redis-cli
 *   - Input : PING
 *   - Output: PONG
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
 * Redis Hash Data Type:
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

const express = require('express');
const { redis } = require('./redis.js')
const app = express()

/**
 * REDIS HASH (USER OBJECT)
 * > Redis Hash Values are always Strings
 * > Even numbers ko "22" jaise store karna pdta hai
 * > Partial update possible (poora object overwrite nhi hota)
 * > DB jaise behavior milta hai, but super fast
 * 
 * Redis String vs Redis Hash
 * a. String:
 *    - One key - One Value
 *    - Whole object JSON mein store karna padta hai
 *    - Redis String is single value box
 * b. Hash:
 *    - One Key - Multiple fields
 *    - Individual field update/read possible
 *    - Better for user/product objects
 *    - Redis Hash is drawer with multiple labeled sections
 * c. Example : User Object using Redis Hash
 *    > Socho ek user hai:
 *      {
 *        id: 1,
 *        name: "Mohammad",
 *        email: "md@gmail.com",
 *        age: 22
 *      }
 *    > Isko Redis Hash mein aise store karnge:
 */
async function main() {

    /* HSET: Create / Update user */
    await redis.hset("user:1", {
        name: "Mohammad",
        email: "md@gmail.com",
        age: "22"
    });

    console.log("User created");

    /* HGET: Get single field */
    const name = await redis.hget("user:1", "name");
    console.log("User name:", name);

    /* HMGET: Get multiple field */
    const multiName = await redis.hget("user:1", "name", "email");
    console.log("User name:", multiName);

    /* HGETALL: Get all fields */
    const user = await redis.hgetall("user:1");
    console.log("User object:", user);

    /* HEXISTS: Check if field exists */
    const hasEmail = await redis.hexists("user:1", "email");
    console.log("Email exists?", hasEmail === 1);

    /* HSET: Update single field */
    await redis.hset("user:1", "age", "23");
    console.log("Age updated");

    /* HINCRBY: Increment numeric field value */
    await redis.hincrby("user:1", "age", 1) 

    /* HDEL: Delete a field */
    await redis.hdel("user:1", "email");

    /* HGETALL: Final user object */
    const updatedUser = await redis.hgetall("user:1");
    console.log("Updated user:", updatedUser);
}


app.listen(3000, () => {
    main();
    console.log('Server is listening on port 3000')
})