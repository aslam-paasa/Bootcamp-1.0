/**
 * Sockets:
 * - Humaare paas ek client connection hai, aur humaare paas ek server hai.
 * - Client ek request ko initiate karta hai, fir server uss request ko
 *   process karta hai, fir server uss processed response ko client ko
 *   return karta hai, and then client iss connection ko close karta hai.
 *   This is one request-response cycle.
 * 
 * Kya server k paas aur koi capability hai to send some data to the 
 * frontend?
 * - No! Connection already close ho gya hai.
 * - Agar humein ek aur baar communication karna hai, then we have to open
 *   the connection again and do the request-response cycle again.
 * 
 * Agar hum ek realtime chat app bna rhe hai to kya ye possible hai?
 * - No! Server k upar kucj update hua to client ko kuch pta nhi lagega 
 *   qki connection close ho gya hai.
 * - Solution-1: 
 *   - Client baar baar request kar k puchte rhega ki kuch change hua hai.
 *     This is called polling.
 *   - Polling is a repeated request to the server to check if there is any
 *     change in the data. 
 *   - But isme utna realtime data nhi milega, kuch second ka delay hoga.
 *     And humari network request bahut jyda ho gyi jisse server pe load
 *     badhega.
 *   - Baar baar connection ko open and close karna hai, aur baar baar
 *     request send karna hai, ye ek badi problem hai.
 * 
 * Solution-2: WebSockets
 * - Agar humne ek baar connection open kar liya hai to kya usse hum reuse
 *   nhi kar sakte? Iske liye http walo ne ek protocol bnaya jisme frontend
 *   ek request bhejega jisme wo header m bolega ki mere ko upgrade kar
 *   websocket mai. Ab backend chahe to iss request to accept or reject
 *   kar sakta hai.
 * - Suppose backend ne mere websocket wale request ko accept kar liya, to
 *   iss request ko forever hum open rakh sakte hai, means naa iss request
 *   ko client close karega aur naa server. And that means server continuous
 *   data send karte reh sakta hai, aur client v continuous request send
 *   karte reh sakta hai. So, basically ye ek duplex connection hai.
 * 
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
 * Pehle express server listen kar rha tha, lekin ab maine ek http server
 * bnaya jiske upar express server run kar rha tha. Aur ab socket k upar
 * apne is http server k lga skte hai. So, my socket server is also running
 * on the port 3000.
*/

import express from 'express'
import axios from 'axios'
import Redis from 'ioredis'
import http from 'http'
import { Server } from 'socket.io'

/**
 * 1. Create a http server:
 *    a. Create a express app
 *    b. Create a websocket server
*/
const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer);

const redis = new Redis({
    host: 'localhost', 
    port: 6379,
});

// Serve frontend
app.use(express.static('./public'));



/**
 * Rate limiter Middleware:
*/
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


/**
 * Sample Routes:
*/
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


/**
 * Socket.io Handler:  
 * - Every client is called a socket.
 * - Socket.io har client ko ek unique id automatically assign karta hai.
 * - Jab v koi socket/user connect hoga to hum uss user ka id print kar denge.
 * - Socket disconnect hone par bhi log karenge.
*/

io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    socket.on('message', (msg) => {
        console.log(`Message from ${socket.id}:`, msg);
        io.emit('message', msg); // broadcast to all clients
    });
  });


/**
 * 2. Start the server
*/
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(` HTTP Server is running on port ${PORT}`);
});