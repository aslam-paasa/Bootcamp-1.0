/**
 * Unicast (one to one):
 * > Send a message to ONE specific user.
 *  
 *   +--------------------+          +-------------------+
 * > | userId -> socketId |--------->| users.get(msg.id) |
 *   +--------------------+          +-------------------+
 *            |
 *            |
 *   +--------------------+
 *   | userId -> socketId |
 *   +--------------------+
 * 
 * > client --> msg.type === 'register'
 * 
 *   object 
 *   {
 *      type: "register",
 *      userId: "123",
 *      text: "aslam"
 *   }
 * 
 *   object
 *   {
 *      type: "private_message",
 *      userId: "123",
 *      text: "aslam",
 *      to: "234"
 *   }
*/

import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

const users = new Map();

wss.on('connection', (socket, request) => {

    socket.on('message', (data) => {
        const msg = JSON.parse(data);

        /* Register user to map */
        if (msg.type === 'register') {
            users.set(msg.userId, socket);
            socket.userId = msg.userId;
            console.log("User registered:", msg.userId);
        }

        /* Unicast to specific user (private msg) */
        if (msg.type === 'private_message') {
            const targetClient = users.get(msg.to);
            if (targetClient?.readyState === WebSocket.OPEN) {
                targetClient.send(JSON.stringify({
                    type: "private_message",
                    from: msg.userId,
                    text: msg.text
                }));
            }
        }
    })

    socket.on('error', (err) => {
        console.log('Socket Error: ', err.message);
    })

    socket.on('close', () => {
        console.log('Client disconneted');
    })

})

console.log('WebSocket Server is live on ws://localhost:8080');