/**
 * What are we learning?
 * 1. Queues   : used for one backend system to communicate with another
 * 2. Pub Subs : used for one backend system to communicate with another
 * 3. Redis    : used for caching, storing data in memory
 * 
 * More specifically, we're learning how we would build a system like
 * leetcode.
*/


/**
 * Redis:
 * - Redis is an open-source, in-memory data structure store, used as a:
 *   a. database,
 *   b. cache and
 *   c. message broker.
 * 
 * - One of the key features of Redis is its ability to keep all data in
 *   memory, which makes it very fast for read and write operations.
 * - Redis is a very popular choice for caching and real-time data
 *   processing.
 * Note: Redis is used aggressively for caching data. 
*/

/**
 * In memory data structure store:
 * Very similar to a DB, only it is in memory. That doesn't mean it doesn't
 * have persistence:
 * a. RDB (Redis Database File):
 *    The RDB persistence platforms point-in time snapshots of your dataset
 *    at specified intervals. It creates a compact single-file representation
 *    of the entire Redis dataset. The snapshotting process can be configured
 *    to run at specified intervals, such as X minutes if Y keys have changed.
 * 
 *    save 900 1   # Save the dataset every 900 sec if atleast 1 key changed
 *    save 300 10  # Save the dataset every 300 sec if atleast 10 keys changed
 *    save 60 1000 # Save the dataset every 60 sec if atleast 1000 keys changed
 * 
 * b. AOF (Append Only File):
 *    The AOF persistence logs every write operation received by the server,
 *    appending each operation to a file. This file can then be replayed
 *    on to startup to reconstruct the dataset.
*/

/**
 * Starting redis locally:
 * 1. Let's start redis locally and start using it as a DB:
 *    - docker run --name my-redis -d -p 6379:6379 redis
 * 2. Connecting to your container
 *    - docker exec -it container_id/bin/bash
 * 3. Connecting to the redis cli
 *    - redis-cli
*/


/**
 * Redis as a DB:
 * 1. SET/GET/DEL:
 *    a. Setting data:
 *       - SET mykey "Hello"
 *    
 *    b. Getting data:
 *       - GET mykey
 *    
 *    c. Deleting data:
 *       - DEL mykey 
 * 
 * 2. HSET/HGET/HDEL: (H = Hash)
 *    HSET user:100 name "John Doe" email "user@example.com" age "30"
 *    HGET user:100 name
 *    HGET user:100 email
 * 
 * Note: You should never use redis as your primary database, it is used
 *       for caching data.
 * Watch the video for more details: 
 * - https://www.youtube.com/watch?v=WQ61RL1GpEE
*/
