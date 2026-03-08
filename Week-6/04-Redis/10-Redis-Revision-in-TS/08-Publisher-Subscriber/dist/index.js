"use strict";
/**
 * Scaling Problem of Websocket:
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Problem: Horizontal Scaling in Stateful Architecture
 * Agar mere client ne ek server k upar request kiya and jab isne request
 * kiya hoga tab ye token saath le k gya hoga. Ab actual user ka jo info
 * hota hai wo hum token m rkh dete hai. Kya server ko kisi tarah ki memory
 * use karni padti hai token ko store karne k liye? No!, token k andr hi
 * user ka payload hota hai. Server iss request ko resolve karta hai hai
 * aur wapas kar deta hai, aur jaise hi ye connection break hota hai, kya
 * server ki memory m koi v data retain rehta hai about the user?
 * No! It is stateless.
 *
 * Ab agar mere paas ek hi server k multiple replicas hai, to kya mujhe
 * fark padega ki user kis server k upar request bheje? No!
 * But agar ye stateful hota to fark padta kyuki ek server k upar request
 * bhejne par waha pe user ka data store ho jaata, aur agar wo next time
 * wo request dusre server k paas bhejta to wo data waha par exist nhi karti.
 * That means jaise hi hum stateful architecture m aae, scaling becomes a
 * problem, because humaare load balancer ko have to make sure ki agar
 * user-1 mere instance-1 se connect hua tha to har baar usse instance-1
 * se hi connect kare, and hum iss server ko kabhi v destroy nhi kar sakte
 * kyuki uska data v destroy ho jaega. Agar agar destroy karna hai to
 * humein iski state ko kisi aur server ko dena padega aur load balancer
 * ko batana padega ki jisko tum instance-1 k paas shift kar rhe the ab
 * usko tm instance-3 pe le jao. So, in stateful architecture, horizontal
 * scaling is big problem (adding more servers jisme hum replicas badhate
 * hai).
 *
 * Note: Websocket is a stateful connection, means it remembers the connection
 *       and wo connection humesa bana rehta hai.
*/
/**
 * Problem-2:
 * Let's say humaare paas teen server hai, aur inn teeno server ka let's
 * say ek database hai. Ab har user ek hi server se connect karega kyuki
 * humein koi scaling implement nhi kari, aur iss scenario m agar ek user
 * websocket checkbook m koi check kar tha to hum iss server ko kehte the
 * ki maine iss checkbox ko check kiya hai, baaki sab user ko bta do, to
 * ye saare user ko bta deta tha (broadcast).
 *
 * Ab let's say hum apne server ki scaling kar di, aur new user ne dusre
 * wale server se connection banaya. Ab jisne update kiya tha wo instance-1
 * se connected tha, aur ye user instance-B se connect hai. But the issue
 * is ki usne to apne peers/connections ko emit kar diya ki apni apni state
 * update kar lo lekin kya iss instance-B ko pta lga? No!
 *
 * Ab agar new user ne kisi checkbox ko check kiya, but iske paas to aur
 * koi connection nhi hai, to mere instance-1 k users ko kabhi pta nhi
 * lagega ki kuch update ho gya. Kya iska matlab ye hai ki socket ko kabhi
 * scale nhi kiya jaa sakta? Cannot scale horizontally.
*/
/**
 * Solution-1: Connect all servers with each other so they can communicate
 * with each other, and when a new user connects, he can get the update from
 * all the servers.
 *
 * Issue: Agar ek new server run karne to fir script run hoga aur saare
 * servers ko ek dusre k saath connect karna padega i.e., Mesh System.
 * And everytime we have to recalculate everything.
*/
/**
 * Solution-2: Redis Pub/Sub
 * Hum ek new server spin kar sakte hai which acts as a broker.
 * And now with this new pattern, every server subscribes(connects) ko this
 * new server, and ab agar new user ne instance-3 m kuch update bheja, then
 * instance-3 will send update to the broker, and this broker will send this
 * update to all the servers which are subscribed to this broker. So, the
 * instances of servers acting as relay servers, and the broker acts as
 * broadcast server. And iss chij k liye hum use kar sakte hai Redis.
 *
 * Redis has something known as Pub/Sub, means humaara har server will
 * publish(send) the update to the broker, and subscribed servers will
 * receive the update from the broker. So, isse can I scale websockets?
 * Yes!
 *
 * Note: Hitesh Sir ka Checkbox Websocket baar baar crash ho rha tha kyuki
 *       wo ek single server m run kar rha tha jisse uski memory full ho
 *       rhi thi jiske wajah se wo crash ho rha tha.
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
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const ioredis_1 = __importDefault(require("ioredis"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)(); // Express Server
const httpServer = http_1.default.createServer(app); // HTTP Server (Express Server ko mount kr diya http par)
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
}); // Socket Server
io.attach(httpServer);
/**
 * Creating Redis Connection:
 * 1. redis: For Read & Write
 * 2. Publisher: For Publish
 * 3. Subscriber: For Subscribe
*/
const redis = new ioredis_1.default({ host: 'localhost', port: 6379 });
const publisher = new ioredis_1.default({ host: 'localhost', port: 6379 });
const subscriber = new ioredis_1.default({ host: 'localhost', port: 6379 });
const stateKey = 'state1';
redis.setnx(stateKey, JSON.stringify(new Array(100).fill(false)));
/**
 * Agar mujhe frontend ek checkbox update deta hai to what should we do,
 * means socket.io ne mujhe bola checkbox update to mujhe kya karna chaiye?
 * - I should tell it to the broker. So, we will create a function which
 *   will be called when frontend sends a message to the server.
 *
 *   await publisher.publish('checkbox-update', JSON.stringify(data));
 *
 * - Isme channels hote hai
*/
/**
 * Here, we are subscribing to the broker.
 * Broker se message aayega, usko parse karo aur state update karo.
 * a. Parse the message
 *    - event: 'checkbox-update'
 *    - data
 * b. Update the state (send the update to all the connected users)
*/
subscriber.subscribe('server:broker');
subscriber.on('message', (channel, message) => {
    const { event, data } = JSON.parse(message);
    io.emit(event, data); // apne apne clients ko update k baare m bta do
});
io.on('connection', (socket) => {
    console.log(`Socket Connected`, socket.id);
    socket.on('message', (msg) => {
        io.emit('server-message', msg); // Broadcast to all connected users
    });
    /**
     * Here, we are publishing the message to the broker.
     * - instance update data to broker
    */
    socket.on('checkbox-update', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const state = yield redis.get(stateKey);
        if (state) {
            const parsedState = JSON.parse(state);
            parsedState[data.index] = data.value;
            yield redis.set(stateKey, JSON.stringify(parsedState));
        }
        yield publisher.publish('server:broker', JSON.stringify({ event: 'checkbox-update', data }));
    }));
});
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8000;
app.use(express_1.default.static('./public'));
app.use(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = 'rate-limit';
        const value = yield redis.get(key);
        if (value === null) {
            yield redis.set(key, 0);
            yield redis.expire(key, 60);
        }
        if (Number(value) > 100) {
            return res.status(429).json({ message: 'Too Many Requests' });
        }
        yield redis.incr(key);
        next();
    });
});
app.get('/state', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const state = yield redis.get(stateKey);
    if (state) {
        const parsedState = JSON.parse(state);
        console.log({ parsedState });
        return res.json({ state: parsedState });
    }
    return res.json({ state: [] });
}));
app.get('/', (req, res) => {
    return res.json({ status: 'success' });
});
app.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get('https://api.freeapi.app/api/v1/public/books');
    return res.json(response.data);
}));
app.get('/books/total', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    // Check Cache
    const cachedValue = yield redis.get('totalPageValue');
    if (cachedValue) {
        console.log(`Cache Hit`);
        return res.json({ totalPageCount: Number(cachedValue) });
    }
    const response = yield axios_1.default.get('https://api.freeapi.app/api/v1/public/books');
    const totalPageCount = (_c = (_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.reduce((acc, curr) => { var _a; return !((_a = curr.volumeInfo) === null || _a === void 0 ? void 0 : _a.pageCount) ? 0 : curr.volumeInfo.pageCount + acc; }, 0);
    yield redis.set('totalPageValue', totalPageCount);
    console.log(`Cache Miss`);
    return res.json({ totalPageCount });
}));
httpServer.listen(PORT, () => console.log(`HTTP Server is Running on PORT ${PORT}`));
/**
 * - Start multiple servers in different ports to test the scalability of the
 *   application.
 *   a. export PORT=3000 && npm run dev
 *   b. export PORT=3001 && npm run dev
 *   c. export PORT=3002 && npm run dev
 *
 * Note: In poweshell, use: $env:PORT=4000; npm run dev
 *
 * - Open different tabs with different ports in browser
 *   a. http://localhost:3000
 *   b. http://localhost:3001
 *   c. http://localhost:3002
 *
 * - Check if the state is updated in all the tabs
 *   a. Check the console of all the tabs
 *   b. Check the state of all the tabs
 */ 
