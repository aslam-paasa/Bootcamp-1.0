/**
 * Advanced Backend:
 * Why does does one Node.js backend needs to talk to another golang, python,
 * etc backend? Usually, communication happen between client and server,
 * when client hits the server then server sends response to the client.
 * But as our application grows, we don't want to keep everything in a
 * single server which is exposed over the internet. Also, there is something
 * called as asychronous processes like a notification, email, video
 * processing, etc.
 * 
 * When we transfer money via gpay, the actual transfer i.e., -100 from my
 * bank, +100 from their bank needs to happen on a backend-1 (primary backend),
 * but the notification, email, sms, etc., can happen in it's own time, even
 * it happens after 10sec, it's fine, and the primary backend service should
 * not be worried about this.
 * 
 * So, the primary backend is the core service which is handling the
 * core business logic, and then a bunch of backend processes handling
 * asynchronous requests like notification, email, sms, etc. And these
 * asyschronous processes usually run on different servers, and our primary
 * server needs to talk to them and instruct them to do their job. This is
 * how general backend is architected, called microservices.
*/

/**
 * Types of Communication:
 * 1. Synchronous (Strong Coupling)
 *    a. HTTP (REST/GraphQL)
 *    b. WebSockets (debatable if sync or async)
 * 
 * 2. Asynchronous (Loose Coupling)
 *    a. Message Queues (RabbitMQ, Kafka)
 *    b. Pub Subs (Redis, RabbitMQ)
 *    c. Server-Sent Events
 *    d. Websocket (debatable if sync or async)
 * 
 * If one system is talking to another system directly, via HTTP, and we
 * are waiting for response from another service, called synchronous
 * communication
 * Ex: HTTP, WebSockets
 * 
 * If one system is talking to another system. and we just pushed it to the
 * queue and we don't care about the response, called asynchronous 
 * communication.
 * Ex: Message Queue, Pub Subs, Server-Sent Events, Websocket
*/


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
 * Why are we learning WebSockets? Is this also used for backend systems
 * to talk to each other?
 * - Rarely used for backends to talk to each other, but it is usually
 *   used for a browser to talk to a server.
 * - But browser talk to server via HTTP, we have talked so many times.
 *   Why are we introducting new protocol?
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
 * 1. Network 3-way Handshake happens every time
 *    - When your computer (client) wants to talk to a server (like Google), 
 *      they need to first establish a reliable connection, and this is
 *      done in 3-steps:
 *      a. Client -> SYN -> Server
 *         "Hey server, are you there? Can we talk?"
 *      b. Server -> SYN-ACK -> Client
 *         "Yes, I’m here! Let’s talk!"
 *      c. Client -> ACK -> Server
 *         "Great! Let’s start!"
 *    - Now the connection is ready for sending actual data (like loading a 
 *      webpage). And this 3-step process happens for every single request
 *      you make! (3-way handshake)
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
 *   has new data (or a timeout)
 * - But it's not efficient, like api call every 5 seconds to ask
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
 * - Another reason is: Head-of-Line Blocking
 *   - When you are waiting for a response from the server, you can't do anything
 *     else.This is called Head-of-Line Blocking.
 *   - For example, a lost packet halts every chunk in flight until it's 
 *     retransmitted. Users see a pause in all videos updates, even if only
 *     one message is lost.
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
 *                    a. Create TCP connection
 *                    b. Upgrade HTTP(TCP) to WebSocket by two way handshake
 *                       - client send request for connection upgradation
 *                       - Request is acknowledged and socket connection 
 *                         formed as response, which is bi-directional
 *                         (2-way handshake).
 *                    c. Now both client and server can send and receive data
 *                       at the same time.
 *                    d. We create an array which contains:
 *                       [Sender IP & Port, Receiver IP & Port]
*/