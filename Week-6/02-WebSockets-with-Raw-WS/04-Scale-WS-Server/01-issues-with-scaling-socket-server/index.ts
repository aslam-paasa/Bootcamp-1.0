/**
 * Scaling a WebSocket server: (Running multiple socket servers)
 * - In the real world, you'd want more than one websocket servers (especially
 *   as your website gets more traffic).
 * - The way to scale websocket servers usually happens by creating a 
 *   'ws fleet' (multiple servers). 
 * - There are usually a central layer behind it that 'orchestrates' messages
 *   ws servers are kept 'stateless'. 
*/


/**
 * What's Scaling?
 * Scaling just means handling more users without crashing the system.
 * a. In HTTP: One user makes one request - done.
 * b. In WebSocket: One user stays connected - 24/7, real-time, like chatting
 *    on WhatsApp.
*/

/**
 * What makes scaling WebSocket servers hard?
 * 1. Persistent Connections = Memory Explosion
 *    - In WebSocket:
 *      a. Each user is like a phone call that never ends.
 *      b. Server holds their connection in memory (RAM).
 *      c. If 100,000 users connect, server is holding 100,000 open connections.
 *    - So, you need:
 *      a. Strong servers
 *      b. Enough memory
 *      c. Logic to clean up stale users
 *    - Imagine running a huge group call on your phone - bettery dies fast,
 *      right? Same with server resources.
 * 
 * 2. Sticky Sessions = Can't Shuffle Traffic
 *    - In regular HTTP:
 *      a. Load Balancer(traffic cop) sends requests to any free server. 
 *      b. Easy and fast. 
 *    - In WebSocket:
 *      a. User A connects to Server-1
 *      b. Now all future chats must go to Server-1 - or else Server-2 won't
 *         know them. This is called "sticky sessions".
 *
 *     - Problem: If Server-1 goes down, all its users get dropped. Boom!!
 * 
 * 3. Shared User State = Everyone Must Know Everything
 *    - WebSocket apps usually need to track:
 *      a. Who's online
 *      b. Who's is this chatroom
 *      c. Who is typing...
 *    - Now, suppose:
 *      a. User-A is on Server-1
 *      b. User-B is on Server-2
 *    - If A types "hello," Server-1 must inform Server-2 to deliver that 
 *      to B. This is called "shared user state" and it's hard to manage.
 *  
 *    - Solution:
 *      - Use Redis Pub/Sub, Kafka, or some centralized system to sync state
 *        between servers.
 *      - Without that, your app becomes "I send a message but nobody saw it". 
 * 
 * 4. Message Routing Across Servers = Extra Work
 *    - Let's say:
 *      a. 5-servers are running.
 *      b. Users are randomly spread across them.
 *      c. Now someone sends a message.
 *    - Your system has to:
 *      a. Identify which server the receiver is on.
 *      b. Route the message to that server.
 *      c. Then finally send it to the user.
 *    - This needs a messaging layer like:
 *      a. Redis
 *      b. Kafka
 *      c. RabbitMQ
 *    - Otherwise, your message is lost in space.
 * 
 * 5. Reconnection & Failover = Super Complex
 *    - If you app is real-time, people expect auto-reconnect. 
 *    - Let's say:
 *      a. User disconnects
 *      b. Reconnects after 5 sec.
 *      c. But now hits a different server(Server-3 instead of Server-1).
 *    - This new server has to:
 *      a. Recreate their session
 *      b. Load chatrooms
 *      c. Sync unread messages
 *    - For this, you need session storage(like Redis or a DB), and code to
 *      replay state on reconnect.
*/


/**
 * Now let's understand with some real-life examples:
 * Imagine you're building your own chat app like WhatsApp or Discord,
 * but suddenly 1 lakh users join your app at the same time. Let's see how 
 * you can handle this:
 * 
 * 1. Use Many Servers (Load Divide Karo):
 *    - What it means:
 *      - Don't run everything on the server. Use multiple servers to handle 
 *        different users.
 *    - Real-life Example: Discord
 *      - Har game channel ya group chat alag server handle karta hai.
 *      - Agar ek server busy ho, doosra server handle karega.
 *    - How to do this?
 *      - Use Docker or PM2 to run multiple instances of your WebSocket server.
 *    - Relatable Analogy:
 *      - Like having 10 counters in a bank instead of 1 - sab line fast
 *        move karegi.
 *    - Tech Used: Docker, PM2, Kubernetes, etc.
 * 
 * 2. Central Control System (Boss Server):
 *    - What it means:
 *      - Make one central system that knows who's online, kisne kya message
 *        bheja, etc.
 *    - Real-life Example: Whatsapp
 *      - Redis: Who's online?
 *      - Kafka: Kis user ko message bhejna hai?
 *    - Relatable Analogy:
 *      - Like a class monitor who knows where every student is and passes
 *        notes secretly.
 *    - Tech Used: Redis, Kafka, etc.
 * 
 * 3. Smart & Auto-Scaling Servers:
 *    - What it means:
 *      - Servers should automatically increase or decrease based on how
 *        many users are online.
 *    - Real-life Example: Slack
 *      - AWS auto-scaling: Jab load jyda ho, new server ban jata hai.
 *      - Redis: Users ke login sessions store hoti hai.
 *    - Relatable Analogy:
 *      - Like Zomato adding more delivery boys at lunch time.
 *    - Tech Used: AWS, Kubernetes, etc.
 * 
 * 4. Traffic Manager (Load Balancer):
 *    - What it means:
 *      - Use a traffic cop(load balancer) to guide each user to the nearest
 *        or least busy server.
 *    - Real-life Example: Twitter
 *      - AWS ELB(Elastic Load Balancer)
 *      - Geo-Routing: India ke users ko India ka server mile.
 *    - Relatable Analogy:
 *      - Like Google Maps sending you via fastest route.
 *    - Tech Used: AWS ELB, Geo-Routing, etc.
 * 
 * 5. Auto-Reconnect System (Socket Fail Recovery):
 *    - What it means:
 *      - If user internet disconnects, your app should auto-reconnect 
 *        without login again.
 *    - Real-life Example: Telegram
 *      - Uses socket.io for auto-reconnect.
 *      - Slient retry in auto-reconnect. 
 *    - Relatable Analogy:
 *      - Like your phone reconnecting to WIFI automatically when signal is
 *        back.
 *      - WhatsApp ke background sync.
 *    - Tech Used: socket.io, etc.
 * 
 * 6. Queue System for Messages:
 *    - What it means:
 *      - Store messages safely in a queue if users is offline or server is
 *        slow.
 *    - Real-life Example: Facebook Messenger
 *      - Uses RabbitMQ for message storage.
 *      - Message gets stored, even if user is offline.
 *    - Relatable Analogy:
 *      - Like your courier guy leaving a missed delivery slip if you're not
 *        home.
 *      - Like your mom saving your favorite food in the fridge for you.
 *    - Tech Used: RabbitMQ, etc.
 * 
 * Popular Tech Combinations:
 * 1. Gaming: Node.js + Redis + Kubernetes (Discord style)
 * 2. Chat Apps: Node.js + Kafka + ELB (WhatsApp style)
 * 3. Business: Node.js + RabbitMQ + HAProxy (Slack style)
 * 
 * Note: This is the reason scaling WebSocket servers is hard.
*/


/**
 * Summary:
 * If you're solo dev, start with:
 * 1. One Node.js WebSocket server
 * 2. Use Redis to store who's online
 * 3. Later add Redis, Kafka or RabbitMQ when you want to deliver messages 
 *    + scaling
 * 4. Then add Load Balancer when traffic grows.
 * 
 * Just like growing from a small shop to a full shopping mall.
*/

