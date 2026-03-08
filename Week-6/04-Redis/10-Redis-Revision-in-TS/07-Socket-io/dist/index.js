"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const ioredis_1 = __importDefault(require("ioredis"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
/**
 * 1. Create a http server:
 *    a. Create a express app
 *    b. Create a websocket server
*/
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
const io = new socket_io_1.Server(httpServer);
const redis = new ioredis_1.default({
    host: 'localhost',
    port: 6379,
});
// Serve frontend
app.use(express_1.default.static('./public'));
/**
 * Rate limiter Middleware:
*/
app.use(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = 'rate-limit:${req.ip}'; // limit per user or ip
        const value = yield redis.get(key);
        if (value === null) {
            redis.set(key, 0);
            redis.expire(key, 60);
        }
        if (value && Number(value) > 10) {
            return res.status(429).json({ error: 'Too many requests' });
        }
        yield redis.incr(key);
        next();
    });
});
/**
 * Sample Routes:
*/
app.get('/', (req, res) => {
    return res.json({ status: 'success' });
});
app.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get('https://api.freeapi.app/api/v1/public/books');
    return res.json(response.data);
}));
app.get('/books/total', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const cachedValue = yield redis.get('totalPageValue');
    if (cachedValue) {
        console.log('Cache hit');
        return res.json({ totalPageCount: Number(cachedValue) });
    }
    const response = yield axios_1.default.get('https://api.freeapi.app/api/v1/public/books');
    const totalPageCount = (_c = (_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.reduce((acc, curr) => { var _a; return !((_a = curr.volumeInfo) === null || _a === void 0 ? void 0 : _a.pageCount) ? 0 : curr.volumeInfo.pageCount + acc; }, 0);
    yield redis.set('totalPageValue', totalPageCount);
    console.log('Cache miss');
    return res.json({ totalPageCount: Number(totalPageCount) });
}));
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
