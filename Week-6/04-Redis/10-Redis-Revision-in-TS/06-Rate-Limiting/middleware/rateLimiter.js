require("dotenv").config();
const { redisClient } = require("../config/redis");


/**
 * Rate Limiter:
 * Rate limiter ek security mechanism hai jo API requests ko control karta hai.
 * Jab koi user humari website pe aata hai, to hum uske requests pe ek limit 
 * set kar dete hai - jaise ki wo 1 ghante mein sirf X number of requests kar 
 * sakta hai. Ye limit lagana bahut zaroori hai kyunki:
 * 1. DDoS attacks se bachne ke liye - koi hacker infinite requests bhej kar 
 *    server ko overload nahi kar payega
 * 2. Fair usage ke liye - koi single user bahut saare requests bhej kar 
 *    dusre users ke liye server slow nahi kar payega
 * 3. Infrastructure costs control karne ke liye - requests ki limit se 
 *    server resources optimize ho jate hai
*/

/**
 * Solution-1: Token Bucket Algorithm
 * - User and server k bich m ek bucket rakh denge. Token bucket k andr
 *   mere kuch tokens present hai (consider 5 tokens). 
 * - Har ek fixed time interval pe (jaise har 1 second), bucket mei ek 
 *   fixed rate se tokens add hote rehte hai, jaise 1 token/second.
 * - Maximum tokens ki ek limit hoti hai (burst size). Agar bucket full hai
 *   to nye tokens discard ho jate hai.
 * - User koi v request bhejega to wo pehle token bucket k jaega aur waha
 *   se token ko uthaega aur waha se mere server k paas aaega, agar token
 *   nhi hai to wo request ko reject karega.
 * - Ab suppose koi aur user aata hai aur usne dekha token bucket khali hai
 *   aur wo pachuh gya mere server k paas, to uski request ko reject karega.
 * - Ab jaise hi kisi user ko answer mil gya to wapas se token bucket mein
 *   token ko rakh dega aur answer le k user ko return karega.
 * 
 * Token bucket m kitne tokens honge?
 * - Ek baar m mera server jitna request handle kar paega, means depends on
 *   the server capacity.
 * - Token refill rate (e.g. 1 token/sec) aur burst size (e.g. 5 tokens)
 *   server capacity ke hisaab se set karte hai.
*/


/**
 * Issue with Token Bucket Algorithm:
 * - Suppose koi hacker hai jisne ek baar m saari request maar di, means wo
 *   saare token le k server k paas chla gya. Ab mere baaki users k saare
 *   request reject jo jaega jisse unka experience kharab ho jaega. That's
 *   why we don't use Token Bucket Algorithm.
 * - Even though tokens continuously refill hote hai, ek user saare tokens
 *   consume kar sakta hai jisse dusre users ko wait karna padega.
*/


/**
 * Solution-2: Fixed Window Algorithm
 * - Fixed window algorithm ek time-based rate limiting approach hai jisme hum 
 *   predefined time windows (jaise 1 hour) mei requests ko track karte hai.
 *   For example:
 *   - 12:00 - 1:00 = Window 1
 *   - 1:00 - 2:00 = Window 2
 *   - 2:00 - 3:00 = Window 3
 *   Har window mei maximum X requests allow hai.
 * 
 * - Jab koi client request karta hai, to hum har user ka track rakhte hai ki 
 *   current window mei kitni requests ki hai. Lekin sawal ye hai ki user ko
 *   identify kaise kare? Login users ke liye unki ID use kar sakte hai, par
 *   non-login users ke liye IP address ka use karte hai.
 *
 * - IP address req.ip se milta hai. Network communication mei client aur server 
 *   dono ka IP hona zaroori hai taki data transfer ho sake. Is IP ko hum redis 
 *   database mei store karte hai as a unique identifier. Example: 12.1.1.12
 *
 * - Redis mei data structure kuch aisa hoga:
 *   IP (key)      Value    TTL (Time To Live)
 *   12.1.1.12      1       60min
 *
 * - Jab same user dobara request karta hai to:
 *   1. Check if IP exists in database
 *   2. If exists, increment request count
 *   3. If count > limit (e.g. 60), reject request
 *   4. After window expires (60 min), data auto delete ho jata hai
 * 
 * Additional Feature - Minimum Gap Between Requests:
 * - Do requests ke beech mei minimum time gap enforce karne ke liye (e.g. 2 sec)
 *   last request ka timestamp bhi store karna padta hai
 *
 * - Redis mei data structure update ho kar kuch aisa hoga:
 *   IP            Value (count:timestamp)     TTL
 *   12.1.1.12     1:23176128612             60min
 *                 2:23176128614             60min
 *
 * - Timestamp ko seconds mei store karte hai using Date.now()/1000
 * - Value string ko parse karne ke liye: "1:23176128612".split(":").map(Number)
 *   returns [1, 23176128612]
 *
 * Fixed Window ke Limitations:
 * - Window boundaries par spike ho sakta hai. For example:
 *   Window 1 (12:59): 60 requests
 *   Window 2 (1:01) : 60 requests
 *   Result: 120 requests in just 2 minutes!
 * - Isliye advanced cases mei Sliding Window algorithm better hai
 * 
*/


/**
 * Fixed Window Algorithm Implementation:
 * 1. Get user's IP address from request
 * 2. Use Redis to count requests from this IP
 *    - incr: Increment the value of the key by 1
 * 3. For first request, set 1 hour expiry time
 *    - expire: Set the Time-To-Live of the key
 *    - expire(key, ttl): Needs key as first parameter
 * 4. Block if more than 60 requests per hour
 * 5. If TTL expires, Redis auto-deletes expired entries
*/

// const rateLimiter = async (req, res, next) => {
//     try {
//         const ip = req.ip;

//         const numberOfRequest = await redisClient.incr(ip); // key: ip, value: 1(count)
//         if(numberOfRequest > 60) {
//             throw new Error("User limit exceeded");
//         }

//         if(numberOfRequest == 1) {
//             await redisClient.expire(ip, 3600); // ip  1(count)  3600(TTL)
//         }

//         next();

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json("Error: " + error.message);
//     }
// }


/**
 * Issue with Fixed Window Algorithm:
 * - College ya University jaise institutions mei ek hi IP address se multiple 
 *   users connect karte hai. For example:
 *   - Ek university se 500 students ne course purchase kiya
 *   - Saare students university ke network se connect kar rahe hai
 *   - University ka ek common IP address hai: 192.168.1.1
 *   - Har IP address ke liye 60 requests/hour ki limit hai, means 
 *     500 students ek hi IP se connect kar rahe hai aur first 60 requests
 *     ke baad saare students block ho jayenge.
 *   - Baaki 440 students course access nahi kar payenge.
 * - That's why we need more advanced algorithms like Sliding Window.
*/


/**
 * 3. Sliding Window Algorithm
 * - Fixed Window Algorithm has a limitation - the time frame is fixed 
 *   (like 12:00 to 1:00). But in Sliding Window, this window continuously
 *   slides with time.
*/


/**
 * How Sliding Window Algorithm works:
 * 1. Window Concept:
 *    - Creates a window of fixed duration (e.g. 1 hour) from current time
 *    - Window continuously slides with time
 *    Example: Window will be from 12:15 to 1:15
 * 
 * 2. Request Weight System:
 *    - Each request has a weight
 *    - Current time requests have full weight = 1
 *    - Older requests' weight decreases with time
 * 
 *    Example:
 *    - If 50 requests came at 12:45     (12:45 - 1:45)
 *    - And a new request comes at 1:00  (01:00 - 1:45 => 45 mins remain)
 *    - Old 50 requests weight = 45/60 (as 45 mins remain)
 *    - Total weight = (Time remaining / Total time) * Requests + 1
 *                   = (45/60 * 50) + 1
 *                   =  37.5 + 1 = 38.5 (approx)
 * 
 * 3. Weight Processing:
 *    - Compare total weight with limit (e.g. 60 requests/hour)
 *    - If weight <= limit: Request allowed
 *    - If weight > limit: Request rejected
 * 
 *    Example:
 *    - Limit = 60 requests/hour
 *    - Current weight = 38.5
 *    - Result: Request allowed (since 38.5 < 60)
 * 
 * 4. Benefits:
 *    - Smooth request distribution
 *    - Better DDoS protection
 *    - More accurate rate limiting
*/


/**
 * Implementation: 
 * Adding & Sorting multiple type of values in Redis:
 *    - Set_Implement == unique value
 *      Key: 1.0 2.0 3.40 5.50 2.50
 *   
 *    - sorted_set == unique sorted value 
 *    - Multiple different type of values ko sort kr skta hu on the basis of 
 *      score, where score is a number.
 *      a. score: 3, value: "Rohit"
 *      b. score: 2, value: 5 
 *      c. score: 5, value: 20 
 *    - Key: score:2 value: 5, score:5 value: 20, score:3 value: "Rohit"
 *      - score: 2, value: 5
 *      - score: 3, value: "Rohit"
 *      - score: 5, value: 20
 * 
 *    - Duplicate score can be accepted, but not duplicate value.
 *      score: 3 value: 10 
 *      score: 6 value: "Rohit" (overrides)
 * 
 *      Key: score:2 value: 5, 
 *           score:3 value: 10,
 *           score:5 value: 20
 *           score:6 value: "Rohit",  (updated value)
 * 
 * We can use range query to delete values:
 * - Suppose I want to delete all values between 2 to 5:
 *   - zremrangebyscore(key, 2, 5)
 *   - Key: score:2 value: 5, 
 *          score:3 value: 10, 
 *          score:5 value: 20,
 *          score:6 value: "Rohit"
 *   - After deletion: score:6 value: "Rohit"
 * 
 * Note: Agar hum time ko score bol de to simple using range query we can
 *       delete between any two timestamps.
 * 
 * a. Key: IP_Address
 * b. Score: currentTime (UNIX Second)
 * c. Value: currentTime (seconds)
*/

const windowSize = 3600; // totalTime
const maxRequests = 60;  // maximum request

const rateLimiter = async (req, res, next) => {
    try {

        /**
         * 1. Get the user's Identity
         *    - We get the user's IP
         *    - Get the current time in seconds
         *    - Calculate time 1 hour ago (start of the sliding window)
        */
        const key = `IP${req.ip}`;
        const currentTime = Math.floor(Date.now() / 1000);
        const windowTime = currentTime - windowSize;


        /**
         * 2. Clean Old Requests
         *    - Delete all entries older than 1 hour
         *    - This keeps the Redis memory clean
        */
        await redisClient.zRemRangeByScore(key, 0, windowTime); // key, minScore, maxScore

        /**
         * 3. Count User Requests in the Last Hour
         *    - This gives how many requests user made in the last hour
        */
        const requestCount = await redisClient.zCard(key); // total number of requests

        /**
         * 4. Reject if limit exceeded
         *    - If they've made 60 or more - we reject the request
        */
        if(requestCount >= maxRequests) {
            throw new Error("User limit exceeded");
        }

        /**
         * 5. Log Current Request:
         *    - We log the new request with current time
         *    - Added a Math.random() to make the value unique
         *      (Redis ZSET doesn't allow duplicate values)
         * Note: Request is added in sorted_set
        */
        await redisClient.zAdd(key, [{score: currentTime, value: `${currentTime}:${Math.random()}`}]); // key, score, value

        /**
         * 6. Set TTL (Time to Live)
         *    - Just in case the user doesn't send more requests
         *    - We auto-delete this key from Redis after 1 hour
        */
        await redisClient.expire(key, windowSize);

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json("Error: " + error.message);
    }
}


module.exports = rateLimiter;