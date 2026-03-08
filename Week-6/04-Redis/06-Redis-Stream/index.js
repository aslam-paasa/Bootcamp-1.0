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
 * Redis Stream Data Type:
 * > Redis Streams ek log-like data structure hai
 * > Har entry ka ek unique ID hota hai
 * > Har message mein multiple field-value paris ho sakte hai
 * 
 * Key Properties:
 * a. Messages persist hote hai (lost nhi hote)
 * b. Messages replay kiye jaa sakte hai
 * c. Multiple consumers safely consume kar sakte hai
 * d. Consumer Groups supported
 * 
 * Flow: Producer > Redis Stream > Consumer
 *       Group    > Consumer(s)
*/

/**
 * Why Streams exist?
 * a. Pub/Sub:
 *    - Fast but unrealiable
 *    - Subscribe down = message lost
 * b. Queue (List):
 *    - Reliable but limited scalabiliy
 *    - Mostly single-consumer style
 * c. Streams:
 *    - Reliability + Scalability + Production-Grade
 * 
 * Real-World Use Cases:
 * a. Background Jobs
 * b. Event Processing
 * c. Order Processing
 * d. Analystics Pipelines
 * e. Audit Logs
*/


const Redis = require('ioredis')
const redis = new Redis()

/**
 * Redis Stream Commands:
 * 1. XADD    : Adding Entries to Stream
 * 2. XREAD   : Read Entries from Stream 
 * 3. XREVENGE: Read latest entries (reverse order)
 * 4. XRANGE  : Read Entries b/w IDs
 * 5. XLEN    : Total Number of entries in Stream
*/

/* XADD: Add entry to stream */
const entryId = await redis.xadd(
    "user-events",
    "*",
    "userId",
    "123",
    "action",
    "purchase",
    "product",
    "laptop",
    "amount",
    "999.99"
);
// console.log("Entry ID:", entryId)


/**
 * XREAD: Read Entries from Stream 
 * > "0" means read from beginning
*/
const entries = await redis.xread(
    "STREAMS", 
    "user-events", 
    "0"
)

entries[0][1].forEach(([id, fields]) => {
    const data = {}
    for (let i = 0; i < fields.length; i += 2) {
        data[fields[i]] = fields[i + 1]
    }
    console.log(`Entry ${id}:`, data)
})


/**
 * XREVENGE: Read latest entries (reverse order) 
 * a. + : starts with largest ID
 * b. - : end at smallest ID
 * c. $ : reads latest entries
 */ 
const recentEntries = await redis.xrevrange(
    "user-events", 
    "+",  /* + : starts with largest ID */
    "-",  /* - : end at smallest ID */
    "COUNT", 
    10
);
console.log(recentEntries)


/* XRANGE: Read entries b/w Two timestamp IDs */ 
const timestampEntries = await redis.xrange(
    "user-events", 
    '1700000000123-0',
    '1700000000456-0'
)

/* XLEN: Total number of entries in stream */ 
const length = await redis.xlen("user-events")