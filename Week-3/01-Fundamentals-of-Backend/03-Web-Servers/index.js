/**
 * CPU Core:
 * > A core is the physical unit in a CPU that performs tasks or instructions.
 *   a. Single-Core CPU: can only execute one instruction at a time.
 *   b. Multi-Core CPU : multiple cores allow parallel execution of tasks.
 * 
 * Analogy:
 * > Imagine a restaurant with one chef (single-core CPU). The check can cook
 *   only one dish at a time.
 * > Add more chefs (multi-core CPU), and now the restaurant can cook multiple
 *   dishes at once.
*/

/**
 * Thread:
 * > A thread is a virtual core, a software method to split a core's capacity.
 * > Hyper-Threading (HT) or Simultaneous Multithreading (SMT) enables a core
 *   to handle multiple threads at once.
 * > A thread is not a physical core but a way to divide a core's power to
 *   run more tasks.
 * 
 * Analogy:
 * > A chef (core) uses two hands (threads) to handle two tasks simultaneously,
 *   like chopping vegetables and stirring a sauce.
 * 
 *   +---------CPU---------+
 *   |                     |
 *   |  +----Core01----+   |
 *   |  | +----------+ |   |
 *   |  | | Thread 1 | |   |<==== Executes Instruction 1
 *   |  | +----------+ |   |
 *   |  | | Thread 2 | |   |<==== Executes Instruction 1
 *   |  | +----------+ |   |
 *   |  +--------------+   |
 *   |                     |
 *   |  +----Core02----+   |
 *   |  | +----------+ |   |
 *   |  | | Thread 1 | |   |<==== Executes Instruction 3
 *   |  | +----------+ |   |
 *   |  | | Thread 2 | |   |<==== Executes Instruction 4
 *   |  | +----------+ |   |
 *   |  +--------------+   |
 *   +---------------------+
 * 
 * > CPU Example:
 *   +-------------------+-------+------------------+---------------+
 *   |      CPU          | Cores | Threads per Core | Total Threads |
 *   +-------------------+-------+------------------+---------------+
 *   | Intel i3-10100    |   4   |         2        |      8        |
 *   | AMD Ryzen 7 5800x |   8   |         2        |      16       |
 *   | Apple M1          |   8   |         1        |      8        |
 *   +-------------------+-------+------------------+---------------+
*/


/**
 * Process:
 * > A program (app) running on your computer is a process.
 * > A process can use multiple cores and threads to complete tasks.
 * 
 * Analogy:
 * > A process is like a customer order in a restaurant
 * > A customer order might require multiple chefs (cores) to make a
 *   meal faster.
 * > A burger, fries, and drink could each be prepared by different chefs
 *   at once.
 * 
 * 
 *   +----------Process01-----------+        +----------Process02-----------+
 *   | +--------------------------+ |        | +--------------------------+ |
 *   | |    Memory, Code, Data    | |        | |    Memory, Code, Data    | |
 *   | +--------------------------+ |        | +--------------------------+ |
 *   | | Thread 1 (Shares Memory) | |        | | Thread 1 (Shares Memory) | |
 *   | +--------------------------+ |        | +--------------------------+ |
 *   | | Thread 2 (Shares Memory) | |        | | Thread 2 (Shares Memory) | |
 *   | +--------------------------+ |        | +--------------------------+ |
 *   +--------------+---------------+        +---------------+--------------+
 *                  |                                        |
 *                  |                                        |
 *                  +----------------------------------------+
 *                         Inter-process Communication
*/


/**
 * Threads vs Process:
 * > Thread shares the process's memory but can run concurrently.
 * > Independent execution context with its own memory space.
*/


/**
 * CPU Performance Factors:
 * 1. Clock Speed (GHz)
 *    - Number of cycles per second. 
 *    - More cycles mean faster performance.
 *    - Ex: 1 GHz = 1 billion cycles per second.
 * 
 * 2. IPC (Instructions per Clock)
 *    - IPC: How many instructions the CPU can execute in one cycleperformance.
 *    - Performance = Clock Speed * IPC. 
 * 
 *    +-------+-------------+-----+---------------------------+
 *    |  CPU  | Clock Speed | IPC | Total Instructions/Second |
 *    +-------+-------------+-----+---------------------------+
 *    | CPU A |   3.0 GHz   |  4  |    12 billion             |
 *    | CPU B |   3.5 GHz   |  3  |    10.5 billion           |
 *    +-------+-------------+-----+---------------------------+
 * 
 * Conclusion: Even if CPU B has a higher clock speed. CPU A can be faster 
 * due to its higher IPC.
*/

/**
 * Summary:
 * 1. Definition
 *    - Core   : Physical Unit (like a Chef)
 *    - Thread : Virtual Execution Unit (Chef's hands)
 *    - Process: Running Program (like an order)
 * 2. Execution
 *    - Core   : Handles 1 task at a time
 *    - Thread : can handle multiple tasks if HT/SMT is enabled.
 *    - Process: can run multiple threads
 * 3. Example
 *    - Core   : Restaurants with multiple chefs
 *    - Thread : Chef using both hands to speef up work
 *    - Process: Customer order needing many dishes
 * 
 * More cores and threads allow a CPU to handle more tasks simultaneously,
 * improving performance and efficiency. 
*/



/**
 * Web Servers:
 * > A web server is software and hardware that uses HTTP (Hypertext Transfer
 *   Protocol) and other protocols to respond to client requests made over the
 *   World Wide Web.
 * 
 * > Web Server serves the content over the web. 
 * > This content can be either static or dynamic, depending on whether it 
 *   changes based on user interactions.
 * 
 * > Static content refers to web files that remain unchanged and are served
 *   as they are stored on the server. 
 * > These files do not require any backend processing and are directly
 *   delivered to users.
*/

/**
 * Examples of Static Content:
 * 1. HTML Pages:
 *    - A simple About Us page that looks the same for every visitor.
 * 
 * 2. CSS stylesheets → The design and layout of a website.
 * 3. JavaScript files → Frontend functionality like animations.
 * 4. Images and videos → Logos, banners, and pre-recorded videos.
*/


/**
 * Examples of Dynamic Content:
 * 1. User dashboards → A profile page that shows personalized information.
 * 2. Search results → A list of products based on user queries.
 * 3. Live data updates → Stock market prices or real-time weather forecasts.
 * 4. User authentication → Logging in and retrieving user details from a database.
*/


/**
 * Features of Web Servers:
 * 1. Serving Static Files Efficiently
 *    - Web servers handle and deliver static files such as HTML, CSS, JS, 
 *      and images, ensuring fast and efficient content delivery.
 * 
 * 2. Dynamic Content Processing
 *    - Supports server-side programming languages like Python, Node.js, and
 *      PHP to generate dynamic web pages based on user requests.
 * 
 * 3. Logging & Monitoring for Insights
 *    - Maintains access logs and error logs to track server performance, 
 *      troubleshoot issues, and enhance security monitoring.
 * 
 * 4. Robust Security Features
 *    - Implements SSL/TLS encryption, access controls, and firewalls to 
 *      protect web applications from cyber threats and unauthorized access.
 * 
 * 5. Load Balancing & Reverse Proxy:
 *    - Distributes incoming traffic across multiple servers to optimize 
 *      performance, prevent overload, and enhance availability.
 * 
 * 6. Efficient Caching Mechanisms:
 *    - Stores frequently requested data to reduce server load, improve 
 *      response times, and enhance the user experience.
*/


/**
 * Servers:
 * a. Single Threaded Servers
 * b. Multi Threaded Servers
*/

/**
 * Single Threaded Server:
 * > A single-threaded server is a server that uses just one thread of 
 *   execution to handle all requests. 
 * > In other words, it processes one request at a time in a single flow, 
 *   rather than creating or using multiple threads to handle requests in 
 *   parallel. 
 * > This can still be efficient if it uses non-blocking, event-driven 
 *   operations (like Node.js), but it only operates on a single thread of
 *   the CPU.
 * 
 *                                                        +----+
 *                                                        | IO |----------+
 *                                                        +----+          |
 *                                                           ^            |
 *                  +--------+                               |            |
 *   Request A ---->|        |     +-------------+     +------------+     |
 *   Request B ---->| Server |---->| Picks a req |---->| Event Loop |<----+
 *   Request C ---->|        |     +-------------+     +------------+
 *                  +---^----+                               |
 *                      |                                    |
 *                      |                                    V
 *                      +------------------------------------+
 *                              Sends back to the thread
 * 
 * > Although there is only a single core, but multiple requests are handle
 *   concurrently due to non blocking I/O & Context Switching.
 * 
 * 
 * Context Switching:
 * > Context Switching allows the CPU to switch quickly between processes, 
 *   making it appear like multiple tasks are running simultaneously on 
 *   fewer cores/threads.
 * > Steps:
 *   1. Task A starts running on the CPU.
 *   2. The OS pauses Task A, saves its state.
 *   3. The OS starts Task B by loading its state.
 *   4. The cycle repeats, so it seems like tasks run in parallel.
 * 
 * 
 * Limitations of Single Threaded Servers:
 * > If there is a blocking I/O or CPU intensive task then the main thread 
 *   will be blocked and rest of the other requests has to wait till main 
 *   thread becomes available again. 
 * > So for high non-blocking I/O operations single threaded servers like 
 *   Node.js is preferred. 
 * > But for CPU intensive tasks such as image processing or video processing
 *   we need mutli-threading.
*/


/**
 * Multi-Threaded Server:
 * > A multithreaded server is a server that uses multiple threads of 
 *   execution.
 * > Each incoming request can be handed off to its own thread (or a thread
 *   from a pool), allowing the server to process multiple requests 
 *   concurrently. 
 * > This can improve performance on systems with multiple cores or CPUs, 
 *   but also introduces added complexity (e.g., synchronization and thread
 *   management).
 * 
 * > Multi-Threading is used for tasks like image processing or machine 
 *   learning, which benefit from parallel execution.
 * 
 * > If there is a blocking I/O operation or CPU intensive task then 
 *   multi-threading is preferred.
 * 
 *                                +--------------------------------------------+
 *                  +--------+    | Handles data from A    Handles data from A |  Thread
 *   Request-A ---->|        |    +--------------------------------------------+  
 *   Request-B ---->| Server |    |   |    |    Handles data from B            |  Thread
 *   Request-C ---->|        |    +---|----V-----------------------------------+ 
 *                  +--------+    |   |         Handles data from C            |  Thread
 *                                +---V----------------------------------------+
 * 
 * Limitations:
 * > When multiple threads access and modify shared data at the same time, 
 *   it can lead to inconsistent or incorrect results. 
 * > For example, if two threads read the same variable and both increment it,
 *   the result might be incorrect (e.g., two increments resulting in a final
 *   value of 1 instead of 2).
 * 
 * 
 * > To avoid race conditions and ensure thread-safe access to shared memory,
 *   synchronization techniques (such as locks, mutexes, semaphores) need to
 *   be implemented. 
 * > Writing, maintaining, and debugging multithreaded code becomes more 
 *   complex because of the need to manage these synchronization mechanisms.
 * 
 * 
 * > Probability of deadlocks are high in multi-threading. 
 * > Deadlocks occur when two or more threads are blocked forever because 
 *   each is waiting for the other to release a resource. 
 * > This typically happens when threads hold one resource while waiting for
 *   another.
*/


/**
 * Comparison:
 * Aspect Single-Threaded Server Multi-Threaded Server
 * 1. Concurrency Model:
 *    > STS: Uses non-blocking I/O to handle many connections in a single 
 *           event loop. Can handle many connections if tasks are mostly 
 *           I/O-based.
 *    > MTS: Creates or uses multiple threads (or a thread pool).
 *           Each request can be handled in a separate thread, allowing 
 *           multiple truly parallel flows.
 * 
 * 2. Complexity:
 *    > STS: Generally simpler to develop and debug (no shared memory 
 *           concurrency, fewer race conditions).
 *    > MTS: More complex, due to potential race conditions, deadlocks, and
 *           need for synchronization across threads.
 * 
 * 3. Resource Usage:
 *    > STS: Uses less memory because there’s usually only one main thread 
 *      and possibly a small internal thread pool (like in Node.js).
 *    > MTS: Each thread uses additional stack space and management overhead,
 *           leading to higher memory usage especially for large numbers of 
 *           threads.
 * 
 * 4. CPU-Bound Performance:
 *    > STS: If a task is CPU-heavy, it blocks the single thread/event loop, 
 *           stopping other tasks.
 *    > MTS: Can distribute CPU-heavy tasks among different threads 
 *           (on multi-core systems), increasing overall throughput.
 * 
 * 5. Typical Use Case:
 *    > STS: Good for many small, quick I/O tasks without blocking, but one 
 *           large CPU task can degrade response for all.
 *    > MTS: Multiple requests/tasks can proceed in parallel, improving 
 *           responsiveness for CPU-bound or mixed workloads, at cost of 
 *           threading overhead.
*/


/**
 * Synchronous vs Asynchronous Operations:
 * 1. Thread:
 *    > Synchronous Operations: 
 *      - In synchronous operations, the thread waits for the task to complete
 *        before moving on to the next task. 
 *      - This means that the thread cannot perform any other tasks until the
 *        current task is finished.
 *    > Asynchronous Operations: 
 *      - In asynchronous operations, the thread does not wait for the task 
 *        to complete. 
 *      - Instead, it can continue executing other tasks while waiting for the
 *        task (e.g., file read, network request) to complete in the 
 *        background.
 * 
 * 2. Blocking/Non-Blocking:
 *    > Synchronous Operations: 
 *      - These operations are blocking. 
 *      - The thread is blocked and cannot proceed until the task, such as a 
 *        file read or network request, is completed.
 *    > Asynchronous Operations: 
 *      - These are non-blocking. 
 *      - The thread continues executing other tasks while it is waiting for 
 *        a task to complete. 
 *      - It can switch to other work without having to wait for the task to 
 *        finish.
 * 
 * 3. ..........
 * ........
*/