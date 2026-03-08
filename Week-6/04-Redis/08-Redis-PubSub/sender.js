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
 * REDIS PUB/SUB:
 * > Pub/Sub = Publish/Subscribe Model
 * > Redis Pub/Sub enables message broadcasting to multiple subscribers
 *   in real-time.
 *   - Sender (Publisher) message bhejta hai
 *   - Receiver (Subscribe) message sunta hai
 *   - Beech mein Redis broker ka kaam karta hai
 * > Flow: Publisher > Redis Channel > Subscribe(s)
*/

/**
 * Use Cases:
 * a. Real-time notificaTIONS
 * b. Chat Systems
 * c. Live Updates
 * d. Event broadcasting
*/

/**
 * Pub/Sub vs Queue:
 * a. Pub/Sub:
 *    - Real-time broadcast
 *    - Multiple subscribers
 *    - No persistence
 * b. Queue (List/Stream)
 *    - One consumer per job
 *    - Reliable processing
 *    - Message Persistence
 * 
 * Notifications/Live Events - Pub/Sub  (Announce karna hai) 
 * Jobs/Tasks                - Queue    (Kaam karna hai)
*/

/**
 * Important Rule:
 * > Pub/Sub fire-and-forget hota hai
 * > Messages store nahi hote
 * > Agar subscriber down hai → message lost ❌
 * > Guaranteed delivery nahi hoti
*/

const Redis = require('ioredis')

/**
 * Publisher – Publish Messages
 */

const publisher = new Redis()

async function publishMessage() {
  await publisher.publish(
    "notifications",
    JSON.stringify({
      type: "EMAIL",
      message: "Welcome email sent"
    })
  )

  console.log("Message published")
}

publishMessage()

/**
 * Mental Model (Interview Gold)
 * > Queue         → kaam karna hai
 * > Pub/Sub       → announce karna hai
 * > Redis Pub/Sub = loudspeaker
 */
