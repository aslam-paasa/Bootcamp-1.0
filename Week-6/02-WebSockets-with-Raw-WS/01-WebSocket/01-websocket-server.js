/**
 * Real Time Communication:
 * > Data flows b/w client and server without refreshing, and the server
 *   pushes updates as they happen called realtime.
 * > Example:
 *   1. WhatsApp Messages
 *   2. Live Stock Prices
 *   3. Multiplayer Games
 *   4. Video Chat
 *   5. Uber Driver Tracking
 *   6. Collaborative
 * 
 * 
 * Problem with plain HTTP:
 *   HTTP is request-driven — the server can only respond when the
 *   client asks. It cannot push data unprompted. Every connection
 *   closes after the response.
 *
 *   Client ──request──▶ Server ──response──▶ connection closed
 * 
 * 
 * Three approaches to solve this, in order of evolution:
 *   1. Polling (Short + Long)
 *   2. Server-Sent Events (SSE)
 *   3. WebSockets
*/


/**
 * Polling: 
 * a. Short Polling:
 *    > Client sends an HTTP request on a fixed timer (e.g. every 2 sec),
 *      regardless of whether there is new data. 
 *    > Server always responds immediately.
 * 
 *    > Example:
 *      Client: "Any new messages?"  (t=0s)
 *      Server: "No."                      
 *      Client: "Any new messages?"  (t=2s)
 *      Server: "No."                      
 *      Client: "Any new messages?"  (t=4s)
 *      Server: "Yes — here they are."     
 * 
 *    > Problems:
 *      - Wastes bandwidth — most responses are empty
 *      - Hammers the server — requests fire even when nothing changed
 *      - Latency = up to the full interval (2s delay in example above)
 *
 * b. Long Polling:
 *    > Client sends a request; server holds it open and does NOT respond
 *      until new data is available (or a timeout is hit).
 *    > As soon as the client receives a response, it immediately sends
 *      a new request.
 * 
 *    > Example:
 *      Client: "Any new messages?"  (t=0s)
 *      Server: ... (holding the request open) ...
 *      Server: "Yes — here they are."  (t=7s, when data arrived)
 *      Client: "Any new messages?"  (t=7s, immediately re-requests)
 * 
 *    > Note:
 *      - Better than short polling — no empty responses, lower latency.
 *      - Still has overhead: a new HTTP connection opens after every 
 *        response.
 *      - Does not scale well under many concurrent clients.
 *
*/

/**
 * 2. SERVER-SENT EVENTS (SSE) — one-way stream from server to client
 *    > Client opens one HTTP connection; server keeps it open
 *      and streams events down whenever it has data. 
 *    > No polling, no repeated requests — the connection stays alive.
 *    > Example:
 *      Client opens:  GET /events  (once)
 *      Server streams:
 *        data: { price: 142.5 }   (t=1s)
 *        data: { price: 143.1 }   (t=2s)
 *        data: { price: 141.8 }   (t=3s)                            
 *      Connection stays open — no new requests needed.              
 *                                                                  
 *      Direction: server → client ONLY.                               
 *      Good for : live dashboards, notifications, progress bars,       
 *                 activity feeds — anything the client just reads.     
 *                                                                  
 *    > Not good for: chat, games — client cannot send data back over  
 *      the same connection; it needs a separate HTTP request for that.
*/



/**
 * 3. WEBSOCKETS
 *    > A persistent TCP connection where BOTH sides can send
 *      messages at any time. After the initial handshake, HTTP
 *      is gone — raw frames flow in both directions.
 *      
 *    > Example:
 *      a. HTTP: Client ──request──▶ Server ──response───▶ closed
 *      b. SSE : Client ──────────────────────────────────▶ Server
 *               Server ──────────────stream──────────────▶ Client (one way)
 * 
 *      c. WebSocket: Client ◀────── open connection ──────────▶ Server
 *                             (either side sends at any time)
 *
 *    > Benefits:
 *      - Ultra fast
 *      - Low latency
 *      - Bi-directional
 * 
 * a. WebSocket handshake — how the connection starts
 *    > A WebSocket starts as a regular HTTP request with a special
 *      header asking to upgrade the protocol:
 * 
 *     [Client]                                            [Server]
 *             1. ──────────Initiating Handshake───────────▶
 *             2. ◀────────Connection Established──────────
 *             3. ──────────────Data Transfer──────────────▶
 *             
 * 
 *      1. Client handshake: http GET HEADER UPGRADE TO WEBSOCKET   
 *                           GET /chat
 *                           Upgrade: websocket
 *                           Connection: Upgrade
 *      2. Server replies: 101 Switching Protocols
 *      3. TCP connection is now a WS channel — HTTP is done
 *      4. Either side sends frames freely until one calls close()
 *
 * b. WebSocket events — same four steps on both client and server
 *    > open    → connection established, safe to send
 *    > message → a message arrived from the other side
 *    > error   → connection error occurred
 *    > close   → connection closed (code + reason provided)
 * 
 *    Messages are strings or binary — always JSON.stringify() before
 *    sending objects, JSON.parse() after receiving.
 *
 * c. Broadcasting - sending to multiple clients
 *    > The server holds a set of all open connections. 
 *    > To broadcast, iterate and send to each — checking readyState 
 *      first.
 * 
 *    > Example:
 *      1. CONNECTION     0
 *      2. OPEN           1
 *      3. CLOSING        2
 *      4. CLOSED         3
 * 
 *        wss.clients.forEach(client => {            
 *          if (client.readyState === WebSocket.OPEN)
 *            client.send(message);                  
 *        });                                        
 *
 * d. Socket.IO vs raw ws:
 *    > ws: 
 *      - bare WebSocket protocol. 
 *      - Lightweight, full control.
 *      - You manage reconnection, rooms, and routing yourself.
 *    > Socket.IO - built on ws, adds:
 *      - Named events   - emit("chat", data) / on("chat", handler)
 *      - Rooms          - broadcast to a subset of clients
 *      - Auto-reconnect - on disconnect
 *      - Fallback to long-polling if WS is blocked by a proxy
 * 
 *    Note:
 *    - Use ws when: minimal overhead, binary data, custom protocol
 *    - Use Socket.IO when: rooms, named events, auto-reconnect needed
 *
 * e. FULL COMPARISON:
 *    ┌───────────────┬──────────────┬──────────────┬────────────────┐
 *    │               │ Short Poll   │ Long Poll    │ SSE   │ WS     │
 *    ├───────────────┼──────────────┼──────────────┼───────┼────────┤
 *    │ Direction     │ C→S only     │ C→S only     │ S→C   │ Both   │
 *    │ Protocol      │ HTTP         │ HTTP         │ HTTP  │ WS     │
 *    │ Connections   │ Many         │ Many         │ One   │ One    │
 *    │ Overhead      │ Very high    │ Moderate     │ Low   │ Lowest │
 *    │ Latency       │ High (timer) │ Low          │ Low   │ Lowest │
 *    │ Complexity    │ Simple       │ Moderate     │ Easy  │ Medium │
 *    └───────────────┴──────────────┴──────────────┴───────┴────────┘
 *  
 *    > Use short polling  → simple status checks, prototyping
 *    > Use long polling   → legacy systems, fallback support
 *    > Use SSE            → dashboards, feeds, notifications (read-only)
 *    > Use WebSockets     → chat, games, live collaboration, tracking
 *
 * f. COMMON MISTAKES
 *    1. Sending objects directly — WS only accepts strings or binary
 *       - socket.send({ type: "chat", text: "hi" });                 // WRONG
 *       - socket.send(JSON.stringify({ type: "chat", text: "hi" })); // RIGHT
 *
 *    2. Not checking readyState — throws if connection is closing
 *       - socket.send(data);                                           // WRONG
 *       - if (socket.readyState === WebSocket.OPEN) socket.send(data); // RIGHT
 *
 *    3. Using ws:// in production — traffic is unencrypted
 *       - new WebSocket("ws://myapp.com");   // WRONG in production
 *       - new WebSocket("wss://myapp.com");  // RIGHT
 *
 *    4. Not cleaning up on disconnect — dead sockets stay in memory
 *       Always listen to "close" event and remove the client from state
 */


/**
 * Installation Guide:
 * 1. Initialize Project: npm init -y
 * 2. Install WebSocket: npm i ws
 * 3. npm i --save-dev @types/node @types/ws
 * 4. Install nodemon: npm i nodemon
 * 5. Approach-1: Open Postman
 *    > Open WebSocket Request:
 *      - WebSocket: ws://localhost:8080
 *      - Click on Connect: New User ::1 
 *    Approach-2: npm i -g wscat
 *    > Open Terminal: wscat -c ws://localhost:8080
*/


import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (socket, request) => {
    const ip = request.socket.remoteAddress;
    console.log('New Client', ip);

    socket.on('message', (rawData) => {
        const message = rawData.toString();
        console.log(rawData);

        wss.clients.forEach((client) => {
            if(client.readyState === WebSocket.OPEN) {
                client.send(`Server Broadcast: ${message}`);
            }
        })
    })

    socket.on('error', (err) => {
        console.log('Socket Error: ', err.message);
    })

    socket.on('close', () => {
        console.log('Client disconneted');
    })

})

console.log('WebSocket Server is live on ws://localhost:8080');