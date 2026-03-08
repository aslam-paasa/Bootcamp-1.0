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


const express = require('express');
const { redis } = require('./redis.js')
const app = express()

/**
 * REDIS STACK (LIFO):
 * > Stack = Last In First Out
 * > Command: LPUSH + LPOP
 * > Use Case:
 *   - Undo/Redo 
 *   - History Tracking
 *   - Recent Activity
*/
async function main() {
    /* Push to Stack */ 
    await redis.lpush("undoStack", "ACTION_1");
    await redis.lpush("undoStack", "ACTION_2");

    /* Pop from Stack */ 
    const lastAction = await redis.lpop("undoStack");
    console.log("Undo Last action:", lastAction)
}

app.listen(3000, () => {
    console.log('Server is listening on port 3000')
})