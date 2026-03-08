/**
 * Scaling Stateless vs Stateful Applications:
 * - We have done projects like Betteruptime, Excellidraw, Secondbrain. All
 *   of them are stateless applications.
 * 
 * Why is the backend stateless?
 * +---------+       +---------+       +----------+
 * | Client  |       | Server  |       | Database |
 * +---------+       +---------+       +----------+
 * 
 * - Backend is stateless because it doesn't store any data. It only processes
 *   the data and returns the result to the client. The state is stored in the
 *   database.
 * - And we should always keep our backend stateless so that we can scale
 *   very easily. So, if we have a lot of users, we can just add more servers
 *   to handle the load.
 * 
 * - It isn't necessary for frontend to go to backend-1 or backend-2, as long
 *   as we have enough servers to handle the load. 
 * - Let's say, we are signing up, we hit the backend-1, an entry will go
 *   into the database. Then on the first page, we want to get our existing
 *   post, we can hit backend-2, the data will be fetched from the database,
 *   because in the end, the data doesn't pulled from the backend but the
 *   database.
 * 
 * Note: We need a central place where all our data is stored. So, we can
 *       scale independently.
 * 
 * 
 * Stateful Application:
 * Let's say we are building a chat application, and most of the time if
 * we have something bi-directional communication like ludo, trading app,
 * etc. then we have some level of statefulness.
 * 
 * 1. Previous Chat History:
 *    - When a new user joins, we want them to see past messages.
 *    - That means the server must remember (store) those old messages.
 * 
 * 2. Active WebSocket Connections:
 *    - Server keeps socket objects for all connected clients.
 *    - When socket.send() is called, it knows which client to send it to.
 * 
 * So, the server holds a memory of connected users and past messages - that's
 * what makes it stateful.
*/

/**
 * Common Interview Questions:
 * A common interview question in software engineering is to explain the 
 * difference between stateful and stateless servers. This question tests 
 * your understanding of backend architecture and your ability to design 
 * systems that can scale and handle various types of workloads.
 * 
 * 
 * Stateless Servers:
 * - Stateless servers do not hold any state in memory. When you write HTTP 
 *   servers, they typically do not maintain any in-memory variables. Instead, 
 *   they rely on external storage, such as a database, to manage state.
 * 
 * Advantages of Stateless Servers:
 * 1. No Need for Stickiness: 
 *    Users can connect to any available server because there is no need 
 *    to maintain a connection to a specific server. This makes load 
 *    balancing straightforward.
 * 
 * 2. Easy Autoscaling: 
 *    Stateless servers can easily scale up and down based on CPU usage. 
 *    Traffic can be routed to any available server, making it simple to 
 *    manage resources.
 * 
 * Example Diagram:
 * In the diagram, users (u1 and u2) can connect to any instance of Backend1
 * or Backend2, which in turn interact with a Postgres database to manage 
 * state.
 * 
 * +--------+        +---------+       
 * | User-1 |------->| Backend |------------------+
 * +--------+        +---------+                  |
 *                                                V
 * +--------+        +---------+              +----------+
 * | User-2 |------->| Backend |------------->| Database |
 * +--------+        +---------+              +----------+
 * 
 *                   +---------+       
 *                   | Backend |
 *                   +---------+
 * 
 * 
 * Stateful Servers:
 * - Stateful servers hold state within the server's memory. This means that 
 *   the server maintains in-memory variables that are used to manage the 
 *   state of the application.
 * 
 * Examples of Stateful Servers:
 * 1. In-Memory Cache: 
 *    Creating an in-memory cache to store frequently accessed data for 
 *    improved performance.
 * 
 * 2. Real-Time Game State: 
 *    Storing the state of a game in memory for real-time multiplayer games.
 * 
 * 3. Chat Application: 
 *    Maintaining a list of the 10 most recent chat messages in memory for 
 *    a chat application.
 * 
 * 
 * Stickiness:
 * - In cases where the server holds state, there is a need for stickiness. 
 *   Stickiness ensures that the user who is interested in a specific room 
 *   or game state gets connected to the specific server that holds the 
 *   relevant state.
 * 
 * Example Diagram:
 * In the diagram, users (u1, u2, and u3) are connected to specific WebSocket
 * servers (ws1, ws2) that hold the state for different rooms. 
 * 
 * For example, u1 and u2 are connected to ws1, which manages rooms 1, 2, 
 * while u3 is connected to ws2, which manages rooms 3, 4.
 * 
 * +--------+        
 * | User-1 |-------------------+      +----------+
 * +--------+                   |      |  WS 1    |
 *                              |-----+| Room 1   |
 * +--------+                   |      | Room 2   |
 * | User-2 |-------------------+      +----------+
 * +--------+        
 * 
 * 
 * +--------+        
 * | User-3 |-------------------+      +----------+
 * +--------+                   |      |  WS 2    |
 *                              +-----+| Room 3   |
 *                                     | Room 4   |
 *                                     +----------+   
 * 
 *                                     +----------+
 *                                     |    WS    |
 *                                     +----------+
 * 
 * Note:
 * Understanding the differences between stateful and stateless backends 
 * is essential for designing scalable and efficient systems. Stateless 
 * servers offer simplicity and ease of scaling, while stateful servers 
 * are necessary for applications that require in-memory state management, 
 * such as real-time games and chat applications. Stickiness is a crucial 
 * concept for stateful servers to ensure that users are connected to the 
 * correct server holding their state.
*/