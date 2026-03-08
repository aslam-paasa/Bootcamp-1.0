/**
 * Project: Build a Real-time Simple Broadcast Chat Application
 * 1. Background:
 *    > Previously: We created a ping-pong game where server and client 
 *      exchanged messages back and forth (heartbeat mechanism)
 * 
 * 2. Challenge:
 *    > Chat applications require more complex communication patterns
 *    > When Browser-1 sends a message like "hi" to the server
 *    > This message needs to be broadcasted to all users in the same chat 
 *      room. So, we have to write the logic to broadcast the message to all
 *      users in the same room.
 * 
 * 3. Goal: 
 *    You're going to build a live chat where:
 *    > Multiple users can join specific rooms.
 *    > When one user sends a message, everyone in that room instantly
 *      receives it.
 *    > No page refresh, no delay - all live through WebSocket.
 * 
 * 4. Concepts you'll learn:
 *    > WebSocket:
 *      - A special network connection that allows real-time two-way 
 *        communication between client and server.
 *    > Broadcasting:
 *      - Sending one user's message to multiple connected users at the
 *        same time.
 *    > Rooms/Channels:
 *      - Logical groupings of users (like Whatsapp or Discord Groups)
 *    > Socket:
 *      - Each client connection is represented by a WebSocket object - used
 *        to send/receive messages.
 */

/**
 * Setup Instructions:
 * 1. Initialize Project:
 *    > npm init -y
 *    > npm install typescript ws @types/ws
 *    > npx tsc --init
 * 2. Update tsconfig.json:
 *    > {
 *        "compilerOptions": {
 *          "rootDir": "./src",
 *          "outDir": "./dist",
 *        }
 *      }
 * 3. package.json:
 *    > {
 *        "scripts": {
 *          "dev": "tsc -b && node ./dist/index.js"
 *        }
 *      }
 * 
 * 3. Create Folder & File:
 *    > src/index.ts
*/

import { WebSocketServer, WebSocket } from "ws";

/**
 * 1. Create a WebSocket Server
 *    > Think of this as your "Express server" for real-time communication.
 *    > Port 8080 is where your WebSocket server will listen.
 */
const wss = new WebSocketServer({ port: 8080 });
console.log("WebSocket server is running on ws://localhost:8080");

/**
 * 2. Define a User interface
 *    > Each connected user has:
 *      - a socket (connection)
 *      - a room name (to identify which room they belong to)
 */
interface User {
    socket: WebSocket;
    room: string;
}

/**
 * 3. Store all active users:
 *    > We'll keep an array of all connected users.
 *    > When someone joins, we add them here.
 *    > When they leave, we remove them.
 */
const allUsers: User[] = [];

/**
 * 4. When a new user connects:
 *    > Every time someone connects to the WebSocket server, we get a 
 *      'socket' object for that connection.
 */
wss.on("connection", (socket) => {
    console.log("New user connected");

    /**
     * 4.a. When a message is received from a client:
     *      > The message can be either:
     *        a. "join" - user wants to join a room
     *        b. "chat" - user is sending a message
     *     > WebSocket sends data as a Buffer, so we must parse it.
     *     > Example incoming message:
     *       > type: "what I want to do"
     *       > payload: "what I want to send to the server"
     *     > Example:
     *       > { "type": "join", "payload": { "roomId": "room1" } }
     *       > { "type": "chat", "payload": { "message": "Hello everyone!" } }
     */
    socket.on("message", (messageData) => {
        const parsedMessage = JSON.parse(messageData.toString());

        /**
         * CASE 1: User joins a room
         * > Add this user and their room info to allUsers[]
         * > Send a welcome message back to confirm
         */
        if (parsedMessage.type === "join") {
            const roomId = parsedMessage.payload.roomId;
            allUsers.push({ socket, room: roomId });

            console.log(`User joined room: ${roomId}`);
            socket.send(`You have joined room: ${roomId}`);
        }

        /**
         * CASE 2: User sends a chat message
         * > We’ll find which room the user belongs to
         * > Then broadcast their message to everyone in that same room.
         */
        if (parsedMessage.type === "chat") {
            /**
             * 4.b. Find the sender's room
             * 4.c. If user hasn’t joined any room yet
             */
            let currentUserRoom: string | null = null;
            for (const user of allUsers) {
                if (user.socket === socket) {
                    currentUserRoom = user.room;
                    break;
                }
            }

            if (!currentUserRoom) {
                socket.send("Please join a room before chatting!");
                return;
            }

            /**
             * 4.d. Broadcast the message to all users in the same room
             */
            for (const user of allUsers) {
                if (user.room === currentUserRoom) {
                    user.socket.send(parsedMessage.payload.message);
                }
            }

            console.log(`Message broadcasted to room: ${currentUserRoom}`);
        }
    });

    /**
     * Optional: Handle user disconnections
     * > Remove user from our list when they disconnect
     */
    socket.on("close", () => {
        for (let i = allUsers.length - 1; i >= 0; i--) {
            if (allUsers[i].socket === socket) {
                console.log(`User left room: ${allUsers[i].room}`);
                allUsers.splice(i, 1);
            }
        }
    });
});


/**
 * Testing in Browser or WebSocket Client:
 * Option-1: Use a WebSocket Tester:
 * > Go to https://www.piesocket.com/websocket-tester
 *   a. Connects to: ws://localhost:8080
 *   b. Tab-1 - Send this: 
 *      > {"type": "join", "payload": {"roomId": "room1"}}
 *   c. Tab-2 - Send the same: 
 *      > {"type": "join", "payload": {"roomId": "room1"}}
 *   d. Now send a chat message:
 *      > {"type": "chat", "payload": {"message": "Hey everyone"}}
 *   e. Both tabs will receive the same message instantly!
*/