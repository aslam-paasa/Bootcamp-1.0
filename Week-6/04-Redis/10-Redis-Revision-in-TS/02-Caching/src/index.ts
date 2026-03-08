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


import express from 'express'
import axios from 'axios'
import Redis from 'ioredis'

const app = express();
const PORT = process.env.PORT ?? 3000;


/**
 * 1. Creating instance of Redis client (cache)
*/
const redis = new Redis({
    host: 'localhost',
    port: 6379,
});

// interface CacheStore {
//     totalPageCount: number;
// }

// const cacheStore: CacheStore = {
//     totalPageCount: 0,
// };



app.get('/', (req, res) => {
    return res.json({ status: 'success' });
});

app.get('/books', async (req, res) => {
    const response = await axios.get('https://api.freeapi.app/api/v1/public/books')
    return res.json(response.data);
});


/** 
 * Redis Cache Server:
 * Technically, we it's not a good practice to count everytime. So, we
 * can cache this value, and everytime we will check if the value is
 * present in the cache store then we will return the value from the
 * cache store, otherwise we will fetch the value from the API and
 * store it in the cache store.
 * a. First API Hit: Cache miss (500ms)
 * b. Second API Hit: Cache hit (0.01ms) [significantly faster]
 * 
 * Issue: 
 * a. Server restart karte hue cache clear ho jata hai.
 * b. Mere cache memory ko koi server access nhi kar sakta.
 * 
 * Solution:
 * - Amazon has multiple servers, kisi m cache hoga aur kisi m nhi,
 *   which makes the request sometimes fast and sometimes slow. So, we
 *   need a common centralized cache server for all the servers, and
 *   all the servers will store their cache and read from the same cache
 *   server. And this centralized cache server is called Redis.
 * 
 * [Ab smjh aaya Redis System Design m kaha use hota hai]
*/

app.get('/books/total', async (req, res) => {
    
    /**
     * 2. Check the cache :
    */

    // if(cacheStore.totalPageCount) {
    //     console.log('Cache hit');
    //     return res.json({ totalPageCount: Number(cacheStore.totalPageCount) });
    // }

    const cachedValue = await redis.get('totalPageValue');
    if(cachedValue) {
        console.log('Cache hit');
        return res.json({ totalPageCount: Number(cachedValue) });
    }

    const response = await axios.get('https://api.freeapi.app/api/v1/public/books')


    const totalPageCount = response?.data?.data?.data?.reduce(
        (acc: number, curr: { volumeInfo?: { pageCount?: number } }) => !curr.volumeInfo?.pageCount ? 0 : curr.volumeInfo.pageCount + acc, 0
    );

    /**
     * 3. Set the cache value
    */
    // cacheStore.totalPageCount = Number(totalPageCount);
    await redis.set('totalPageValue', totalPageCount);

    console.log('Cache miss');
    return res.json({ totalPageCount: Number(totalPageCount) });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





