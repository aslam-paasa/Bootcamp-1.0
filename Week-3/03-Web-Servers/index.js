/**
 * Web Servers:
 * > A web server is software (and hardware) that uses HTTP (Hypertext 
 *   Transfer Protocol) and other protocols to respond to client requests
 *   made over the World Wide Web.
 * > Web Server serves the content over the web. 
 * > This content can be either static or dynamic, depending on whether it 
 *   changes based on user interactions.
 * 
 * Example:
 * - Browser: "Give me homepage"
 * - Server : sends HTML, CSS, JS, Images
*/

/**
 * Types of Web Servers:
 * > There are two main types based on content:
 *   1. Static Server
 *   2. Dynamic Server
*/

/**
 * Static Server:
 * > Static server serves files exactly as they are stored.
 * > No modification. No backend processing.
 * > Server simply reads file and sends it.
 *   [ Browser > request > server > sends file directly ]
 * 
 * Example:
 * 1. HTML Files:
 *    - Example: About Page
 *    - Same content for every user
 * 2. CSS Files:
 *    - Example: colors, layout, design
 * 3. JavaScript Files
 *    - Example: animations, form validation
 * 4. Images and Videos
 *    - Example: logos, banners, pre-recorded videos
 * 
 * > Static Server does not:
 *   - access database
 *   - run backend logic
 *   - generate new content
 * > It only sends existing files.
 * > Example of Static Server: Nginx, Apache, IIS, Caddy, Lighttpd, etc.
*/


/**
 * Dynamic Server:
 * > Dynamic server generates content in real-time using backend logic
 *   and database.
 * > Content can change based on:
 *   - User
 *   - Login Status
 *   - Database data
 *   - User Input
 *   - Time
 *   - Location
 *   - etc.
 * 
 * Real-Life Analogy: Swiggy/Zomato App
 * > Every user sees different content:
 *   - User-A sees their orders
 *   - User-B sees their orders
 * > Content is generated dynamically.
 * 
 * How it works?
 * > Browser sends request
 * > Server runs backend code
 * > Server fetches data from database
 * > Server generates HTML
 * > Server sends HTML to browser
 * 
 * Example of Dynamic Content:
 * 1. User Dashboard    : Shows personal info
 * 2. Login System      : Checks database for user
 * 3. Search Results    : Shows results based on search query
 * 4. E-commerce Website: Shows products from database
 * 5. Instagram Feed    : Different feed for each user
 * 
 * Example of Dynamic Servers/Backend Technologies:
 * > They are used in application servers like:
 *   - Node.js (Express.js)
 *   - Django (Python)
 *   - Flask (Python)
 *   - Ruby on Rails
 *   - Java Spring Boot
*/


/**
 * Features of Web Servers:
 * > A Web Server is not just for sending webpages.
 * > It provides many important features that make website, fast, secure,
 *   and reliable.
 * 
 * > Think of a Web Server like a Smart Restaurant:
 *   - serves food fast
 *   - keeps records
 *   - ensures security
 *   - manages rush hours
 *   - remembers frequent orders
 * 
 * 
 * 1. Serving Static Files Fast & Efficiently
 *    - One of the main jobs of a web server is to send static files quickly.
 *    - Static files are already stored and do not change.
 *    - Examples:
 *      > HTML : structure of website
 *      > CSS  : design
 *      > JS   : frontend logic
 *      > image: logo, photos
 *      > video: pre-recorded videos
 *      > audio: pre-recorded audio
 * 
 *    How it works?
 *    - Browser requests logo.png
 *    - Server finds logo.png
 *    - Server sends logo.png
 * 
 * 2. Dynamic Content Processing:
 *    - Web server can also generate content dynamically using backend 
 *      code.
 *    - It works with backend languages like:
 *      > Node.js
 *      > Python
 *      > Java
 *      > PHP
 * 
 *    Example: Login System
 *    - Browser sends login request
 *    - Server checks database
 *    - Server verifies user
 *    - Server sends user dashboard
 *      (Response is generated in real-time)
 * 
 * 3. Logging & Monitoring:
 *    - Web Servers keep records of everything.
 *    - These records are called logs.
 *    
 *    Types of logs:
 *    a. Access logs
 *       > Who visited
 *       > When visited
 *       > Which page visited
 *    b. Error Logs
 *       > What errors happened
 *       > Why server failed
 * 
 *    Example:
 *    - User visited homepage at 10:00 AM
 *    - Server saves this info in logs
 * 
 * 
 * 4. Security Features
 *    - Web servers protect websites from hackers and attacks.
 *    - Important Security Features:
 *      a. SSL/TLS Encryption
 *         > Converts username: mohammad > encrypted > ajshd7832@#$
 *           So hackers cannot read data.
 *         > This is why websites use:
 *           - https:// instead of http://
 *      b. Access Control:
 *         > Restricts unauthorized users.
 *         > Example: Only admin can access admin panel.
 *      c. Firewall:
 *         > Blocks malicious requests.
 *         > Example: Blocks hackers from accessing server.
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
 * Servers based on Threading:
 * > Servers can be classified based on how they handle multiple requests:
 *   a. Single Threaded Servers
 *   b. Multi Threaded Servers
 * 
 * > First we need to understand some jargons:
 *   1. CPU Core
 *   2. Thread
 *   3. Process
*/

/**
 * Understand Some jargons:
 * 1. CPU Core
 * 2. Thread
 * 3. Process
*/

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
 * Single Threaded Server: (Node.js)
 * > A single-threaded server is a server that uses just one thread of 
 *   execution to handle all requests. 
 * > In other words, it processes one request at a time in a single flow, 
 *   rather than creating or using multiple threads to handle requests in 
 *   parallel. 
 * > This can still be efficient if it uses non-blocking, event-driven 
 *   operations (like Node.js), but it only operates on a single thread of
 *   the CPU.
 * 
 * How Single Threaded Server handles Multiple Requests?
 * > Even though there is one thread, it can still handle many users
 *   concurrently using Event Loop, Non-Blocking I/O & Context Switching.
 * > Components involved:
 *   a. Request Queue
 *   b. Event Loop
 *   c. I/O Operations
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
 * 
 * Event Loop:
 * > Event Loop is like a manager of the single thread.
 * > It's job:
 *   1. Pick request
 *   2. Process request
 *   3. If I/O operation needed, delegate to system
 *   4. Move to next request
 *   5. When I/O finishes, send response
 * > Example: 
 *   - Req-A > needs database > takes time
 *   - Instead of waiting, server moves to Request B
 *   - This makes server efficient.
 * 
 * Non-Blocking I/O:
 * > Non-Blocking means Server does not wait for slow operations.
 * > Slow operations include:
 *   - Database calls
 *   - File reading
 *   - Network calls
 * > Example:
 *   - Req-A > database query > takes 2 seconds
 *   - Instead of waiting 2 seconds, server handles Request B.
 *   - This is why Node.js is fast.
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
 * Multi-Threaded Server: (Golang)
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
 * 3. Efficiency:
 *    > Synchronous Operations: 
 *      Synchronous operations can be inefficient because the thread 
 *      is idle and does not perform any work while waiting for the 
 *      task (such as a file read or I/O operation) to complete.
 *    > Asynchronous Operations: 
 *      Asynchronous operations are more efficient because the thread is
 *      free to perform other tasks while waiting for the I/O operation 
 *      to finish. This allows for better resource utilization.
 * 
 * 4. Use of Resources:
 *    > Synchronous Operations: 
 *      The thread becomes idle and consumes system resources without 
 *      performing any meaningful work during the wait. This results in 
 *      wasted resources.
 *    > Asynchronous Operations: 
 *      The thread remains busy, efficiently utilizing system resources 
 *      by working on other tasks while waiting for the primary task to 
 *      complete.
 * 
 * 5. Task Completion:
 *    > Synchronous Operations: 
 *      In synchronous operations, the thread is blocked until the task 
 *      is completed, which means no other tasks can be performed in the
 *      meantime.
 *    > Asynchronous Operations: 
 *      In asynchronous operations, the thread receives an event or 
 *      callback once the task is completed, and it processes that result
 *      when notified, without blocking other tasks.
 * 
 * 6. Example of Usage:
 *    > Synchronous Operations: 
 *      Synchronous operations are typically used in traditional, blocking
 *      environments, where tasks are executed in sequence and the thread
 *      waits for each task to finish (e.g., file read operations in a 
 *      traditional system).
 *    > Asynchronous Operations: 
 *      Non-blocking I/O operations are used in environments like Node.js,
 *      where tasks like file reading, network requests, or handling HTTP
 *      requests are executed asynchronously, allowing the thread to 
 *      perform other tasks concurrently.
*/

/**
 * Concurrency vs Parallelism:
 * 1. Concurrency: 
 *    - Multiple tasks can start, run, and complete in overlapping time
 *      periods. 
 *    - The tasks appear to progress at the same time, but they might be
 *      rapidly switching in a single core (time-slicing) or managed by 
 *      an event loop.
 *    - It’s about managing multiple tasks—not necessarily doing them 
 *      literally at the exact same moment.
 * 
 *    +----------------------------------------------+
 *    | [Task-A] [Task-B] [Task-A] [Task-B] [Task-A] | Thread
 *    +-------------|--------------------------------+
 *                  V
 *                Context
 * 
 * 2. Parallelism:
 *    - Multiple tasks actually run at the exact same time on different
 *      CPU cores or machines. 
 *    - Here, the tasks truly execute in parallel, so the system can do 
 *      more total work simultaneously.
 * 
 *    +------------+
 *    | [ Task-A ] | Thread
 *    +------------+
 *    +------------+
 *    | [ Task-B ] | Thread
 *    +------------+
 * 
 * - Concurrency is useful in I/O-bound applications like web servers, 
 *   whereas parallelism is essential for CPU-heavy tasks like video 
 *   processing or machine learning.
 * 
 * Summary: 
 * 1. Developer doing task-1 then switching to task-2 then task-3
 *    then back to task-1, task-2, task-3. This is called concurrency.
 * 2. Developer-1 is doing task-1, Developer-2 is doing task-2, 
 *    Developer-3 is doing task-3. This is called parallelism.
 * 3. Context Switching + Parallelism:
 *    Developer-1 is doing task-1, Developer-2 is doing task-2, 
 *    Developer-3 is doing task-3. Then Developer-1 switch to task-4,
 *    Developer-2 switch to task-5, Developer-3 switch to task-6.
 *    This is called context switching + parallelism.
*/

/**
 * Multiprocessing:
 * > Multiprocessing allows a program to use multiple CPU cores to run 
 *   tasks in parallel.
 * > This is especially useful for CPU-heavy tasks like data processing, 
 *   machine learning, and video editing.
 * > Each process runs independently, with its own memory, which helps 
 *   avoid issues like race conditions (common in multithreading).
 * > Processes communicate with each other using methods like 
 *   Inter-Process Communication (IPC), which can include message passing
 *   or shared memory.
 * > An example of multiprocessing in Node.js is Node.js Clustering, where
 *   multiple processes can handle requests in parallel, improving 
 *   performance and scalability.
 * 
 *            Process-1                           Process-2
 *   +------------------------------+    +------------------------------+
 *   | [ Memory, Code, Data       ] |    | [ Memory, Code, Data       ] |
 *   | [ Thread 1 (Shares Memory) ] |    | [ Thread 1 (Shares Memory) ] |
 *   | [ Thread 2 (Shares Memory) ] |    | [ Thread 2 (Shares Memory) ] |
 *   +---------------|--------------+    +---------------|--------------+
 *                   |                                   |
 *                   V                                   V
 *                   +-----------------------------------+
 *                        Inter-process Communication
*/


/**
 * Why Node.js uses Multi-Threading?
 * > By default, Node.js is single-threaded when it executes JavaScript 
 *   code. This means that all the JavaScript operations run on a single
 *   main thread (called the event loop). For tasks like handling HTTP 
 *   requests or managing event-driven callbacks, Node.js uses this
 *   single thread to process everything in a non-blocking, asynchronous
 *   mann
 * > If you have an HTTP server in Node.js, the event loop handles 
 *   incoming requests one by one without blocking the execution of other
 *   requests.
 * 
 * When Node.js uses multi-threading internally:
 * > While JavaScript in Node.js runs on a single thread, Node.js 
 *   internally uses multiple threads for certain tasks through its 
 *   libuv thread pool. This allows Node.js to offload specific operations
 *   that would otherwise block the main thread, improving performance
 *   for I/O-bound tasks.
 * 
 *   a. File System Operations (fs.readFile):
 *      When you read or write files, Node.js uses multiple threads in
 *      the thread pool to perform these tasks asynchronously.
 * 
 *   b. DNS Lookups (dns.lookup):
 *      Resolving domain names to IP addresses can be offloaded to other
 *      threads, so the main thread remains free to handle other operations.
 * 
 *   c. Cryptography (crypto.pbkdf2, crypto.randomBytes):
 *      Complex cryptographic operations like hashing or generating random
 *      values are handled in the thread pool to avoid blocking the main
 *      event loop.
 * 
 *   d. Compression (zlib.gzip):
 *      Operations like data compression or decompression are also run in
 *      the libuv thread pool, allowing the main thread to focus on other
 *      tasks.
*/


/**
 * Create a server which will use multithreaded architecture, and for
 * each request it will open new thread.
*/