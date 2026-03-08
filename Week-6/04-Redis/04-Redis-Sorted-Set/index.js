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
 * REDIS SORTED SET (ZSET):
 * > Redis Sorted Set ek unique elements ka collection hota hai
 * > Har element ke saath ek score attached hota hai
 * > Elements score ke basis pe sorted rehte hai
 * 
 * Structure:
 * > Score + Member
 * 
 * Why ZSET is perfect for leaderboard?
 * > Ranking automatic mil jaati hai
 * > Fast score update
 * > Range queries easy (Top N Players)
 * 
 * Use Cases:
 * a. Game Leaderboards
 * b. Top users by points
 * c. Trending Posts
 * d. Ranking Systems
 * 
 * Leaderboard Example (Game Scores):
 * > Socho ek game leaderboard:
 *   +---------+-------+
 *   | Player  | Score |
 *   +---------+-------+
 *   | Alice   | 1200  |
 *   | Bob     | 900   |
 *   | John    | 1500  |
 *   +---------+-------+
 * > Redis Sorted Set Code (ioredis):
 *   - Score  → number (float bhi ho sakta hai)
 *   - Member → unique string
 *   - Same member dobara add karoge → score update ho jaayega
 *   - Ranking 0-based hoti hai (top = 0)
*/

const express = require('express');
const { redis } = require('./redis.js')
const app = express()

/**
 * REDIS SORTED SET (LEADERBOARD)
 */
async function main() {

    /* ZADD: Add players with score */
    await redis.zadd("gameLeaderboard", 1200, "Alice");
    await redis.zadd("gameLeaderboard", 900, "Bob");
    await redis.zadd("gameLeaderboard", 1500, "John");

    /* ZADD: Update score (same command) */
    await redis.zadd("gameLeaderboard", 1600, "Alice");

    /* ZREVRANGE: Get top players (highest score first) */
    const topPlayers = await redis.zrevrange("gameLeaderboard", 0, 2, "WITHSCORES");
    console.log("Top players:", topPlayers);

    /* ZSCORE: Get score of a player */
    const aliceScore = await redis.zscore("gameLeaderboard", "Alice");
    console.log("Alice score:", aliceScore);

    /* ZREVRANK: Get rank (0-based, from top) */
    const aliceRank = await redis.zrevrank("gameLeaderboard", "Alice");
    console.log("Alice rank:", aliceRank);

    /* ZREM: Remove a player */
    await redis.zrem("gameLeaderboard", "Bob");

    /* ZREVRANGE: Final leaderboard */
    const leaderboard = await redis.zrevrange("gameLeaderboard", 0, -1, "WITHSCORES");
    console.log("Final leaderboard:", leaderboard);
}

app.listen(3000, () => {
    main();
    console.log('Server is listening on port 3000')
})