/**
 * WebSocket Vs Socket.io:
 * - Bahut saare aise v browser hai jo WebSocket support nahi karte hai.
 * - So, Socket.io is a library that helps us to create a WebSocket connection.
 * 
 * 1. Direct WebSocket (Barebones): npm i ws
 *    - A low-level protocol (ws:// or wss://) that gives you full-duplex
 *      communication between client and server.
 *    - Props:
 *      a. Lightweight : No extra dependencies
 *      b. More Control: You manage your own protocol
 *      c. Faster in raw performance: Less overhead
 *    - Cons:
 *      a. You have to handle reconnection logic yourself.
 *      b. No built-in features like rooms, broadcasting, event names.
 *      c. Harder to scale across multiple servers (needs Redis pub/sub
 *         or custom setup).
 *    - Ex: For raw performance:
 *          - IoT
 *          - Trading Platforms
 *          - Live Streaming
 *          - Gaming
 * 
 * 2. Socket.IO (Library on top of WebSocket + fallback): npm i socket.io
 *    - A JS library that uses WebSocket under the hood (but can fall back
 *      to HTTP long polling if needed).
 *    - It adds extra features on top of raw WebSockets.
 *    - Props:
 *      a. Auto-reconnection: Handles reconnection logic for you
 *      b. Rooms support    : Group users together
 *      c. Fallback support : Uses HTTP long polling if WebSocket fails
 *      d. Broadcasting     : Send messages to multiple clients
 *      e. Event names      : You can use custom event names
 *    - Cons:
 *      a. Slightly more overhead (extra library code)
 *      b. Not as low-level as barebones WebSocket
 *    - Ex: For Production apps with user:
 *          - Chat Application
 *          - Collab Tools
 *          - Notifications
 * 
 * 3. Bahut saare company m firewalls hote hai jo automatically
 *    WebSocket connections ko close kar deta hai. Wahi kaam hum
 *    socket.io se kare to humein flexibility milti hai jis browser
 *    support nahi hota waha socket.io iss http long polling m convert
 *    kar dega jis bi-directional feel dega.
 * 
 * 4. Hum WebSocket m connection bnane k baad data exchange nahi krte to
 *    humein alag se code likhna padta tha ki kya ye connection still alive
 *    hai ya nahi. Wahi Socket.io se kare toh humein alag se code nahi likhna
 *    padta hai, aur ye bich bich m ping krte rhega ki zinda ho ya nhi, agar
 *    nhi hai to connection close ho jayega.
 * 
 * 5. WebSocket m agar kuch second k liye client ka network chla gya aur
 *    fir wapas aaya, aur uss bich server ne kuch data bheja tha to wo
 *    data lost ho jaega. Lekin Socket.io m client ko agar packet receive
 *    nhi hua hai to uska acknowledgement nahi hoga, aur server unn sab ko
 *    apne kisi message queue k andr bana k rakhega aur fir se unn sab 
 *    message ko transmit karega client ko.
 * 
 * Rule of Thumb:
 * a. If you just need "I send a message, you get it": WebSocket
 * b. If you need "I want a full-features real-time framework with rooms,
 *    retries, ack, scaling, etc.": Socket.io
*/

/**
 * Project Setup:
 * 1. npm init -y
 * 2. npm i nodemon
 * 3. npm i express socket.io
 * 4. Write express template code & start TCP connection
 * 5. Upgrade HTTP to WebSocket by attaching socket.io to the server (Naive)
 *    - const io = new Server(server);
 *    - Old server will work as it is, but we will use io object to create
 *      a new WebSocket connection, but this is wrong way to do it.
 * 6. Better way to do it:
 *    - app.listen() internally uses http.createServer() to create a server.
 *      That's why we used http and passed our 'app' to it. This creates our
 *      server which we store in the 'server' variable.
 *    - Then we attach this 'server' to socket.io, so it knows to use 'io'
 *      for websocket related information and 'app' for normal http requests.
 *    - Finally, we start the server listening for connections.
 *    - How to do it?
 *      a. Express se website banao:
 *         const app = express();
 *      
 *      b. Socket.io ko website se connect karo:
 *         const server = http.createServer(app);    // Server banaya
 *         const io = new Server(server);            // Chat joda
 *      
 * 7. Establish Socket.io Connection:
 *    - connection: It is an event listener that is triggered when a 
 *      new client connects to the server.
 *    - socket: It is an object that represents the connection between the
 *      client and the server. And using the socket.id, we can uniquely
 *      identify the client.
 *    - We can use this socket object to send and receive messages to and
 *      from the client.
 *    - Example:
 *      io.on("connection", (socket) => {
 *          console.log("New user connected!");
 *      });
 * 
 * 8. socket vs io:
 *    - Use socket when you are doing individual communication with a client.
 *    - Use io when you are doing broadcast communication with all clients.
 *      a. emit: It is used to send messages to a specific client.
 *      b. on  : It is used to receive messages from a specific client.
 * 
 * 9. Receive Message from Client:
 *    - socket.on() receive message from individual client.
 *    - message is the event name which is used to receive msg from client.
 *    - data is the message that we want to receive from the client.
 *    - io.emit() send message to all connected clients.
 *    - Example:
 *      socket.on("message", (data) => {
 *        io.emit("new-message", data);
 *      });
 *    
 * 
 * 9. Disconnect the client:
 *    - socket.disconnect();
 *    - We receive disconnect event from paericular client and then we can
 *      disconnect the client from the server.
 *    - Example:
 *      socket.on("disconnect", () => {
 *        console.log("User disconnected");
 *      });
*/

import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
    res.send("Hello World");
});

io.on("connection", (socket) => {

    socket.on('message', (data) => {
        io.emit('new-message', data);
    });

    socket.on('disconnect', () => {
        console.log("User disconnected");
    });
});


server.listen(3000, () => {
    console.log("Server is running on port 3000");
});