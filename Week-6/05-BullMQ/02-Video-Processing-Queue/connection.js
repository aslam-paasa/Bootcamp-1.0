/**
 * 6. Connecting to Redis:
 *    a. Install Redis: npm i ioredis
 *    b. Create a new connection to Redis
 *       - Set maxRetriesPerRequest to null
 *    c. Pass the connection to the queue & worker
*/

import { Redis } from "ioredis";

export const redisConnection = new Redis({
    host: "localhost",
    port: 6379,
    maxRetriesPerRequest: null
});

redisConnection.connect();

export default redisConnection;