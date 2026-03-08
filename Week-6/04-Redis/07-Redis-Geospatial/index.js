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
 * Redis Geospatial – What is it?
 * > Redis Geospatial ek feature hai jo 'location-based data'
 *   ko efficiently store aur query karne deta hai
 * > Internally Redis Sorted Set (ZSET) ka use karta hai
 * > Distance calculation ke liye 'Geohash + Haversine formula'
 *
 * Key Properties:
 * a. Location longitude + latitude ke form mein store hoti hai
 * b. Fast radius & distance-based queries
 * c. Perfect for nearby search use cases
 *
 * Real-World Use Cases:
 * a. Nearby restaurants
 * b. Cab / delivery tracking
 * c. Store locator
 * d. Real-time location services
 */

const Redis = require('ioredis')
const redis = new Redis()

/**
 *Redis Geospatial – GEO Commands Flow
 * 1. GEOADD    → Add locations
 * 2. GEOPOS    → Get coordinates
 * 3. GEODIST   → Distance between locations
 * 4. GEORADIUS → Nearby search
 */

/**
 * 4.1 GEOADD – Add Locations
 * > GEOADD key longitude latitude member
 * > Important:
 *   - Longitude first, latitude second (very common mistake ❌)
 *   - Member must be unique
 * > Example locations:
 *   - Delhi
 *   - Mumbai
 *   - Bengaluru
 */

/* Add single location */
await redis.geoadd(
  "cities",
  77.1025, 28.7041, "Delhi"
)

/* Add multiple locations */
await redis.geoadd(
  "cities",
  72.8777, 19.0760, "Mumbai",
  77.5946, 12.9716, "Bengaluru"
)
 

/**
 * Internal Structure (conceptual):
 *
 * cities
 * ├── Delhi      → (77.1025, 28.7041)
 * ├── Mumbai     → (72.8777, 19.0760)
 * └── Bengaluru  → (77.5946, 12.9716)
 */

/**
 * 4.2 GEOPOS – Get Coordinates of a Location
 * > Stored longitude & latitude wapas deta hai
 */
const positions = await redis.geopos("cities", "Delhi")
console.log("Delhi position:", positions)

/**
 * 4.3 GEODIST – Distance Between Two Locations
 * > GEODIST key member1 member2 unit
 * > Units:
 *   - m  → meters
 *   - km → kilometers
 *   - mi → miles
 *   - ft → feet
 */
const distance = await redis.geodist(
  "cities",
  "Delhi",
  "Mumbai",
  "km"
)
console.log("Distance Delhi → Mumbai:", distance, "km")

/**
 * 4.4 GEORADIUS – Find Nearby Locations
 * > GEORADIUS key longitude latitude radius unit
 * > Example: Find cities within 1500 km of Delhi
 */
const nearbyCities = await redis.georadius(
  "cities",
  77.1025,
  28.7041,
  1500,
  "km"
)
console.log("Nearby cities:", nearbyCities)

/**
 * Key Takeaways (Must Remember)
 * > Redis Geospatial internally uses Sorted Sets
 * > Longitude always comes before latitude
 * > Very fast for nearby search
 * > Best for location-based queries
 */

/**
 * Mental Model (Exam + Interview)
 * > Hash      → object data
 * > Stream   → event log
 * > Geo      → map + distance queries
 * 
 * Redis Geo = "Google Maps lite inside Redis"
 */