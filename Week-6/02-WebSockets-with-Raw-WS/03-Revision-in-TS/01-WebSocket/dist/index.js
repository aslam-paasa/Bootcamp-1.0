"use strict";
/**
 * Agenda:
 * 1. WebSockets
 * 2. WebSockets in Node.js
 * 3. Ws in Node.js (Code)
 * 4. Client Side Code
 * 5. Scaling Ws Servers
*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * WebSockets:
 * - WebSockets provide a way to establish a persistent, full-duplex
 *   communication channel over a single TCP connection between the client
 *   (typically a web browser) and the server.
 * - WebSockets are used for RTC (Real-Time Communication) applications.
 *
 * - Jargons:
 *   a. Persistent Connection:
 *      - A connection that remains open for an extended period of time.
 *      - When the connection stays open for a long time, it is called a
 *        persistent connection.
 *      - Just like a phone call stays connected.
 *   b. Half-Duplex:
 *      - A communication channel that allows only one direction of communication
 *        at a time.
 *      - Only one side can talk at a time
 *      - Like a walkie-talkie - either you speak or the other person
 *      - Example: HTTP requests and responses
 *   c. Full-Duplex:
 *      - A communication channel that allows both the client and the server
 *        to send and receive data at the same time.
 *      - Both sides can talk at the same time
 *      - Just like a regular phone call
 *      - Example: WebSocket connections
 *   d. TCP Connection:
 *      - A connection between the client and the server.
 *      - Example: HTTP connections, WebSocket connections, etc.
 *
 *                        Give me SOL Price
 *                      -------------------->
 *   +-----------------+ Persistent Connection +----------------+
 *   |                 |                       |                |
 *   |                 |   SOL Price: 170.08   |                |
 *   |     Browser     | <-------------------  |    Server      |
 *   |                 |   SOL Price: 170.01   |                |
 *   |                 | <-------------------  |                |
 *   +-----------------+                       +----------------+
*/
/**
 * Use Cases for WebSockets:
 * 1. Real-Time Applications:
 *    - Chat Applications,
 *    - Live Sports Updates,
 *    - Real-time Gaming,
 *    - Or, any application requiring instant updates can benefit from
 *      WebSockets.
 * 2. Live Feeds:
 *    - Financial Tickers,
 *    - News Feed,
 *    - Social Media Updates,
 *    - or, any application where you need to push live data to users.
 * 3. Interactive Services:
 *    - Collaborative Editing Tools,
 *    - Live Customer Support Chat,
 *    - Interactive Webinars
*/
/**
 * Why not use HTTP/REST? Why do you need WebSockets?
 * - HTTP/REST has a big problem:
 *   You need to create a new connection every time you need data.
 *   This is like making a new phone call to your friend for every single
 *   thing you want to say!
 *
 * - Let's understand with an example:
 *   Suppose you want real-time price of SOL (Solana) cryptocurrency:
 *
 *                        Tell me SOL Price
 *                      -------------------->
 *   +-----------------+                    +----------------+
 *   |                 |   New Connection   |                |
 *   |    Browser      | ------------------> |    Server     |
 *   | (Your Chrome)   |   Price: 170.01    |               |
 *   |                 | <------------------ |               |
 *   +-----------------+                    +----------------+
 *
 * HTTP/REST has 2 major problems:
 * 1. Network Handshake happens every time
 *    - Means you need to create a new connection for each request
 *    - This wastes a lot of time
 *    - Like making a new phone call for every single message
 *
 * 2. Server can't send data on its own
 *    - Server has to wait for client's request
 *    - You can use polling (checking repeatedly)
 *    - But it's not efficient, like calling every 5 seconds to ask
 *      "any updates?"
*/
/**
 * Why do not use long polling for RTC?
 * - Long Polling is a technique where client holds request open until server
 *   has new data
 * - But it's not efficient, like calling every 5 seconds to ask
 *   "any updates?"
 *
 * - Let's understand with an example:
 *   Suppose you want real-time price of SOL (Solana) cryptocurrency:
 *
 *                        Tell me SOL Price
 *                      -------------------->
 *   +-----------------+                    +----------------+
 *   |                 |   New Connection   |                |
 *   |    Browser      | ------------------>|    Server     |
 *   | (Your Chrome)   |   Price: 170.01    |               |
 *   |                 | <------------------|               |
 *   +-----------------+                    +----------------+
 *
 * - Now, let's say you want to know the price every 5 seconds:
 *   - You will keep calling the server every 5 seconds
 *   - This is not efficient, like calling your friend every 5 seconds to ask
 *     "any updates?"
 *
 * - This is why WebSockets are better - make one connection, then both sides
 *   can freely communicate!
*/
/**
 * What is Polling?
 * - Polling is a technique where client repeatedly requests data from server.
 *
 * Types of Polling:
 * a. Regular Polling: Client checks at fixed intervals (e.g. every 5 secs)
 * b. Long Polling   : Client holds request open until server has new data
 *
 * Problems with Polling:
 * - Wastes bandwidth with unnecessary requests
 * - Server load increases with more clients
 * - Updates aren't truly real-time due to delay
 *
 * Real Example: When you submit a problem on LeetCode, your browser keeps
 * asking the server repeatedly "is the result ready?" This is an example of
 * regular polling. LeetCode uses regular polling where your browser checks
 * every few seconds if your code submission results are ready.
 *
 * That's why WebSocket is better - make one connection, then both sides
 * can freely communicate!
*/
/**
 * Why does LeetCode use regular polling instead of long polling or WebSockets?
 * - When you submit a problem on LeetCode, the browser needs to know if
 *   your result is ready or not.
 *
 * What happens in long polling:
 * - Browser sends one request and keeps waiting
 * - Connection stays open until the result is ready
 * - Too many open connections = high server load
 *
 * What happens in regular polling:
 * - Browser checks every 5 seconds "is result ready?"
 * - If not ready, connection closes
 * - Checks again after 5 seconds
 * - Less load on server because connections close quickly
 *
 * That's why LeetCode uses regular polling - it's simple, reliable and better for servers!
*/
/**
 * When to use:
 * 1. Regular Polling:
 *    - Jab updates bahut frequent nahi chahiye (jaise har 5-10 second me)
 *    - Jab data ka size chota ho
 *    - Example: LeetCode submission status check karna
 *
 * 2. Long Polling:
 *    - Jab updates instantly chahiye lekin WebSocket setup karna mushkil ho
 *    - Jab server pe bahut zyada users nahi honge
 *    - Example: Simple chat application
 *
 * 3. WebSocket:
 *    - Jab real-time updates zaruri ho (gaming, live chat)
 *    - Jab 2-way communication chahiye (server bhi client ko message bhej sake)
 *    - Jab bahut saare users ho sakte hain
 *    - Example: Multiplayer games, trading platforms
 *
 * Simple rule:
 * - Regular Polling: Agar bas kabhi kabhi updates chahiye
 * - Long Polling   : Agar instant updates chahiye par users kam hai
 * - WebSocket      : Agar real-time + scalable solution chahiye
*/
/**
 * WebSocket in Node.js:
 * There are various libraries that let you create a WebSocket Server
 * (similar to express lets you create a HTTP server).
 * 1. https://www.npmjs.com/package/websocket
 * 2. https://github.com/websockets/ws
 * 3. https://socket.io/
*/
/**
 * What is the problem with Socket.io?
 * - Even though Socket.io is great(it gives you constructs like 'rooms' to
 *   make the API much cleaner), it's harder to support multiple platforms
 *   in it(Android, iOS, Rust).
 * - There are implementations in most platforms but not very up to date:
 *   https://socket.io/blog/native-socket-io-and-android/
 *   https://github.com/1c3t3a/rust-socketio
 *
 * - So, we will use ws library in this course.
*/
/**
 * Let's create a simple WebSocket server using ws library:
 * 1. Initialize a new project: npm init -y
 * 2. Install typescript      : npm install typescript
 * 3. Add tsconfig to it      : npx tsc --init
 * 4. Update tsconfig         :
 *    - Add "outDir"          : "./dist"
 *    - Add "rootDir"         : "./src"
 *    - Add "strict"          : true
 *    - Add "esModuleInterop" : true
 * 5. Install ws library      : npm install ws @types/ws (Server)
 * 6. Create a src folder     : mkdir src
 * 7. Create a index.ts file  : touch src/index.ts
 * 8. Create a dist folder    : mkdir dist
 * 9. Package.json > scripts  :
 *    "scripts": {
 *      "start": "tsc -b && node ./dist/index.js"
 *    }
 * 10. Run the server         : npm start
*/
/**
 * Jargons:
 * a. WebSocket      : It is used to create a WebSocket clients. (Optional)
 * b. WebSocketServer: It is used to create a WebSocket server.
 *
 * c. wss.on("connection", callback):
 *    - When new client connects the WebSocket server.
 *    - You get access to a ws object - this represents that specific
 *      connected user.
 *    - Think of it like:
 *      "Hey! Someone just joined the chat. Let's talk to them using ws."
 *
 * d. ws.on("message", callback):
 *    - This runs when the connected user sends a message to the server.
 *    - You can grab the message and do whatever you want - like send it
 *      to other users, save it, etc.
 *    - Think of it like:
 *      "User said something! Let's catch this and share it with everyone
 *       else".
 *
 * e. data(in message):
 *    - This is the actual message the client sent.
 *    - Could be plain text (like "Hello") or binary (like a file or image).
 *
 * f. isBinary(in message):
 *    - This tells whether the message is binary file(like files/images) or
 *      plain text.
 *    - Most of the time for chat, isBinary is false. (text only)
 *
 * g. wss.clients:
 *    - This is the list of all people currently connected to your WebSocket
 *      server.
 *    - Think of it like:
 *      A group of everyone in that chat room.
 *
 * h. client.readyState === WebSocket.OPEN:
 *    - This checks if the client is still connected to the server.
 *    - If it's not open, it means the connection is closed.
 *    - Think of it like:
 *      "Is this person still connected to the chat? If yes, let's talk."
 *
 * i. client.send(data, { binary: isBinary }):
 *    - This sends data to the particular client.
 *    - If the message is binary(like a file), it handles that properly.
 *
 * j. wss.clients.forEach(function each(client) { ... }):
 *    - This is a loop that goes through all the clients connected to the
 *      server.
 *    - It's like saying:
 *      "Hey! I have a message for everyone in this chat room."
 *
*/
/**
 * Importing dependencies:
*/
const ws_1 = require("ws");
/**
 * Creating a WebSocket server(wss) in PORT 8080:
*/
const wss = new ws_1.WebSocketServer({ port: 8080 });
/**
 * Create a connection for each user: (Connection Event)
 * - When a new user joins the chat, give them a connection.
 * - If multiple users join, multiple connections are created.
*/
wss.on("connection", function connection(ws) {
    ws.on('error', console.error);
    /**
     * Server sends messages to the client:
    */
    ws.send("New User Joined");
    setInterval(() => {
        ws.send("Server: Current price of SOL is " + Math.random() * 100);
    }, 1000);
    /**
     * Client sends messages to the server (Message Event)
    */
    ws.on("message", function message(data) {
        console.log("User: ", data);
        ws.send("User: " + data);
    });
});
console.log("Server is running on port 8080");
