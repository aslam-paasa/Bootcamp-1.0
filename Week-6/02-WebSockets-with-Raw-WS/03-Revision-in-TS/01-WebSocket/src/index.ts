/**
 * Agenda:
 * 1. WebSockets
 * 2. WebSockets in Node.js
 * 3. Ws in Node.js (Code)
 * 4. Client Side Code
 * 5. Scaling Ws Servers
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
 * Server Side Code using ws library:
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
 * a. WebSocket: 
 *    - It is used to create a WebSocket clients. (Optional)
 * b. WebSocketServer: 
 *    - It is used to create a WebSocket server.
 * c. wss.on("connection", callback): 
 *    - When new client connects the WebSocket server.
 *    - You get access to a ws object - this represents that specific
 *      connected user.
 *    - Think of it like:
 *      "Hey! Someone just joined the chat. Let's talk to them using ws."
 * d. ws.on("message", callback):
 *    - This runs when the connected user sends a message to the server.
 *    - You can grab the message and do whatever you want - like send it
 *      to other users, save it, etc.
 *    - Think of it like:
 *      "User said something! Let's catch this and share it with everyone
 *       else".
 * e. data:
 *    - This is the actual message the client sent through Browser or POSTMAN.
 *    - Could be plain text (like "Hello") or binary (like a file or image).
 * i. client.send(data):
 *    - This sends data to the particular client.
*/



import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

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
