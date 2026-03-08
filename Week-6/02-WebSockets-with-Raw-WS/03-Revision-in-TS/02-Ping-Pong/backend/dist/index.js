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
 * Project: Echo App
 * - A simple chat application where you can send messages to the server
 *   and the server will echo the message back to you.
*/
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
/**
 * Create a connection:
*/
wss.on("connection", function connection(ws) {
    ws.on('error', console.error);
    /**
     * Client sends messages to the server (Message Event)
    */
    ws.on("message", function message(data) {
        console.log("User: ", data.toString());
        if (data.toString() === "ping") {
            ws.send("pong");
        }
    });
});
console.log("Server is running on port 8080");
/**
 * Client Side Code:
 * - WebSocket is a browser API that you can access (very similar to fetch).
 * - Will work on raw project, React Project and Next.js Project (client side).
 *
 * Client-Side Code:
 * 1. Create a React Project: npm create vite@latest
 * 2. Create a websocket connection to the server:
*/
