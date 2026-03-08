/**
 * Note:
 * 1. Postgres is wrapper around secondary memory (SSD, HDD, etc.)
 * 2. Redis is wrapper around primary memory (RAM) and which provides
 *    bunch of methods.
*/

/**
 * Commands:
 * 1. npm init -y
 * 2. npm i typescript @types/node -D
 * 3. npm i express@4.x
 * 4. npm i @types/express@4.x -D
 * 5. npm i tsc-watch -D
 * 6. tsc --init
 * 7. Go to tsconfig:
 *    a. rootDir: ./src
 *    b. outDir: ./dist
 * 8. Go to package.json:
 *    "scripts": {
 *      "build": "tsc -p .",
 *      "start": "node dist/index.js"
 *      "dev": "tsc-watch --onSuccess \"node dist/index.js\""
 *    }
 * 9. npm run build
 * 10. npm run start
 * 11. npm run dev
 * 
 * 12. docker-compose up -d (to start the redis server)
 * 13. docker-compose down (to stop the redis server)
 * 
 * 14. docker ps (to see the running containers)
 * 15. docker stop <container_id> (to stop the redis server)
 * 16. docker rm <container_id>   (to remove the redis server)
*/



/**
 * High Throughput:
 * - When incoming request and outgoing response is very fast, then those
 *   requests and responses are called high throughput.
 * - Ex: Trading platform, Rider sharing real-time location, etc.
 * 
 * - Agar inn data ko database m save karne chle to humaare database down
 *   ho jayega because seconds m lakhs of entries aa rhi hai. So, db is
 *   not designed for high throughput.
 * 
 * Solution: Redis Streams
 * - Jitna v fast data hai wo sb isme dump krte rhnge and then batch
 *   (group of data) m data ko database m write karte raho.
 * - Users v redis stream se data read karte hai, bas db storage k liye
 *   kaam aata hai.
 * - Ex: Agar humein info chaiye ki kisi particular rider ne past m 
 *       kaha kaha ride kiya hai, to wo humein database se pta chlega
 *       but humein real-time data chaiye, to humein redis stream se data
 *       read karna pdega.
 * 
 * 
 * 
*/


import express from 'express'
import axios from 'axios'
import Redis from 'ioredis'

const app = express();
const PORT = process.env.PORT ?? 3000;


const redis = new Redis({
    host: 'localhost',
    port: 6379,
});


app.use(async function(req, res, next) {
    const key = 'rate-limit:${req.ip}';  // limit per user or ip
    const value = await redis.get(key);

    if(value === null) {
        redis.set(key, 0);
        redis.expire(key, 60);
    }

    if(value && Number(value) > 10) {
        return res.status(429).json({ error: 'Too many requests' });
    }

    await redis.incr(key);
    next();
});


app.get('/', (req, res) => {
    return res.json({ status: 'success' });
});

app.get('/books', async (req, res) => {
    const response = await axios.get('https://api.freeapi.app/api/v1/public/books')
    return res.json(response.data);
});


app.get('/books/total', async (req, res) => {
    const cachedValue = await redis.get('totalPageValue');
    if(cachedValue) {
        console.log('Cache hit');
        return res.json({ totalPageCount: Number(cachedValue) });
    }

    const response = await axios.get('https://api.freeapi.app/api/v1/public/books')


    const totalPageCount = response?.data?.data?.data?.reduce(
        (acc: number, curr: { volumeInfo?: { pageCount?: number } }) => !curr.volumeInfo?.pageCount ? 0 : curr.volumeInfo.pageCount + acc, 0
    );

    await redis.set('totalPageValue', totalPageCount);

    console.log('Cache miss');
    return res.json({ totalPageCount: Number(totalPageCount) });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});