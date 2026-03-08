/**
 * NODE.JS http MODULE:
 * > server, 
 * > routing, 
 * > JSON, 
 * > queries, 
 * > requests, 
 * > streaming
*/

/**
 * What is http module?
 * ────────────────────────
 * Node.js ka built-in module — npm install karne ki zaroorat nahi.
 * Do main uses hain:
 *   1. HTTP server banane ke liye jo incoming requests ko listen kare
 *   2. Outgoing HTTP requests karne ke liye doosre servers par
 * 
 * > Functions:
 *   a. http.createServer() 	Create a server
 *   b. res.writeHead() 	Set status and headers
 *   c. res.end() 	End and send response
 *   d. http.get() 	Perform a GET request
 *   e. http.request() 	Perform custom HTTP request
*/

/**
 * KEY CONCEPTS AUR KEYWORDS:
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. http.createServer(callback) — server banana                  │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Ek callback register karta hai jo har incoming request │
 * │          par run hota hai.                                      │
 * │                                                                 │
 * │ a. req: IncomingMessage — request object                        │
 * │    - req.url      - path + query string e.g. "/about?id=1"      │
 * │    - req.method   - "GET", "POST", "PUT", "DELETE"              │
 * │    - req.headers  - request headers ka object                   │
 * │                                                                 │
 * │ b. res: ServerResponse — response object                        │
 * │    - res.writeHead(status, headersObj) - status + headers set   │
 * │    - res.write(chunk)                  - partial data bhejo     │
 * │    - res.end(data)                     - final data bhjo + close│
 * │                                          hamesha call karna hai │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const server = http.createServer((req, res) => {              │
 * │     res.writeHead(200, { "Content-Type": "text/plain" });        │
 * │     res.end("Hello, World!");                                    │
 * │   });                                                           │
 * │   server.listen(3000, () => console.log("Running on :3000"));   │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 2. Routing — branching on req.url aur req.method                │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: req.url mein path hota hai. Use if/else ke saath check │
 * │          karo different routes ke liye different responses      │
 * │          bhejne ke liye. Hamesha 404 fallback include karo.     │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   if (req.url === "/" && req.method === "GET") {                │
 * │     res.writeHead(200, { "Content-Type": "text/html" });        │
 * │     res.end("<h1>Home Page</h1>");                              │
 * │   } else if (req.url === "/about") {                            │
 * │     res.writeHead(200, { "Content-Type": "text/html" });        │
 * │     res.end("<h1>About Page</h1>");                             │
 * │   } else {                                                      │
 * │     res.writeHead(404, { "Content-Type": "text/html" });        │
 * │     res.end("<h1>404 - Page Nahin Mili</h1>");                  │
 * │   }                                                             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 3. JSON responses                                               │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Content-Type "application/json" set karo aur           │
 * │          JSON.stringify'd object bhejo. Kabhi raw object mat    │
 * │          bhejo — res.end() sirf strings ya Buffers accept       │
 * │          karta hai.                                             │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const data = { name: "Node", version: 20 };                   │
 * │   res.writeHead(200, { "Content-Type": "application/json" });   │
 * │   res.end(JSON.stringify(data));                                │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 4. Query parameters — url.parse(req.url, true)                  │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: req.url mein raw query string hota hai ex: "/?name=Ali"│
 * │          url.parse with true as second argument use karo to     │
 * │          parse into object. Saari values strings hoti hain —    │
 * │          numbers ke liye convert karo.                          │
 * │                                                                 │
 * │   url.parse("/?name=Ali&age=25", true).query                    │
 * │   → { name: "Ali", age: "25" }                                  │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const { query } = url.parse(req.url, true);                   │
 * │   const name = query.name || "Guest";                           │
 * │   res.end(`Hello, ${name}!`);                                   │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 5. Making outgoing requests — http.get() aur http.request()     │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Node bina kisi library ke HTTP calls kar sakta hai     │
 * │          external APIs par. Response body stream ki tarah aata  │
 * │          hai — chunks collect karo "data" mein aur "end" mein   │
 * │          assemble karo.                                         │
 * │                                                                 │
 * │ http.get(url, callback)                                         │
 * │   GET requests ke liye shorthand. Automatically req.end() call  │
 * │   kar deta hai.                                                 │
 * │                                                                 │
 * │ http.request(options, callback)                                 │
 * │   Full control — POST/PUT/DELETE ya custom headers ke liye.     │
 * │   Manually req.write(data) aur req.end() call karna hota hai.   │
 * │                                                                 │
 * │ Code template (GET):                                            │
 * │   http.get("http://api.example.com/data", (res) => {            │
 * │     let body = "";                                              │
 * │     res.on("data", (chunk) => { body += chunk; });              │
 * │     res.on("end", () => console.log(JSON.parse(body)));         │
 * │   });                                                           │
 * │                                                                 │
 * │ Code template (POST):                                           │
 * │   const payload = JSON.stringify({ title: "foo", userId: 1 });  │
 * │   const req = http.request({                                    │
 * │     hostname: "api.example.com", path: "/posts",                │
 * │     method: "POST",                                             │
 * │     headers: {                                                  │
 * │       "Content-Type": "application/json",                       │
 * │       "Content-Length": Buffer.byteLength(payload),             │
 * │     },                                                          │
 * │   }, (res) => {                                                 │
 * │     let body = "";                                              │
 * │     res.on("data", (chunk) => { body += chunk; });              │
 * │     res.on("end", () => console.log(JSON.parse(body)));         │
 * │   });                                                           │
 * │   req.write(payload);                                           │
 * │   req.end();                                                    │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 6. Streaming response — stream.pipe(res)                        │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Badi files ke liye, poori file memory mein load karna  │
 * │          aur phir bhejna RAM waste hai. Instead, ReadStream ko  │
 * │          directly res mein pipe karo — Node chunks read karta   │
 * │          hai disk se aur turant client ko bhejta hai.           │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const stream = fs.createReadStream("./bigfile.txt");          │
 * │   res.writeHead(200, { "Content-Type": "text/plain" });         │
 * │   stream.pipe(res);   // res.end() automatically call hota hai  │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 7. Server events                                                │
 * ├─────────────────────────────────────────────────────────────────┤
 * │   request      har incoming request par fire hota hai (create-  │
 * │                Server callback jaisa — alternative syntax)      │
 * │   connection   naya TCP connection establish hua                │
 * │   close        server ne connections accept karna band kiya     │
 * │   error        server-level error (e.g. port already in use)    │
 * │                                                                 │
 * │   server.on("error", (err) => {                                 │
 * │     if (err.code === "EADDRINUSE")                              │
 * │       console.error("Port already in use");                     │
 * │   });                                                           │
 * └─────────────────────────────────────────────────────────────────┘
*/

/**
 * EXAMPLE WITH REAL DATA: Users API with in-memory storage
 * 
 * const http = require("http");
 * const url = require("url");
 * 
 * let users = [
 *   { id: 1, name: "Rahul", email: "rahul@example.com" },
 *   { id: 2, name: "Priya", email: "priya@example.com" }
 * ];
 * 
 * const server = http.createServer((req, res) => {
 *   const { pathname, query } = url.parse(req.url, true);
 *   const method = req.method;
 * 
 *   // Helper for JSON responses
 *   const sendJSON = (status, data) => {
 *     res.writeHead(status, { "Content-Type": "application/json" });
 *     res.end(JSON.stringify(data));
 *   };
 * 
 *   // GET /api/users - all users
 *   if (pathname === "/api/users" && method === "GET") {
 *     sendJSON(200, users);
 *   }
 *   
 *   // GET /api/users/:id - single user
 *   else if (pathname.startsWith("/api/users/") && method === "GET") {
 *     const id = Number(pathname.split("/")[3]);
 *     const user = users.find(u => u.id === id);
 *     
 *     if (user) sendJSON(200, user);
 *     else sendJSON(404, { error: "User nahi mila" });
 *   }
 *   
 *   // POST /api/users - create user
 *   else if (pathname === "/api/users" && method === "POST") {
 *     let body = "";
 *     req.on("data", chunk => body += chunk);
 *     req.on("end", () => {
 *       try {
 *         const newUser = JSON.parse(body);
 *         newUser.id = users.length + 1;
 *         users.push(newUser);
 *         sendJSON(201, newUser);
 *       } catch {
 *         sendJSON(400, { error: "Invalid JSON" });
 *       }
 *     });
 *   }
 *   
 *   // 404
 *   else {
 *     sendJSON(404, { error: "Endpoint nahi mila" });
 *   }
 * });
 * 
 * server.listen(3000, () => {
 *   console.log("Server running at http://localhost:3000");
 * });
*/

/**
 * COMMON MISTAKES:
 * 1. Raw object bhejna — res.end() sirf string ya Buffer leta hai
 *     res.end({ name: "Node" });                 // ❌ WRONG — "[object Object]" bhejega
 *     res.end(JSON.stringify({ name: "Node" })); // ✅ RIGHT
 *
 * 2. res.end() bhoolna — client wait karta rahega response ka
 *    res.write("Hello");            // ❌ WRONG agar res.end() call nahi kiya
 *    res.write("Hello"); res.end(); // ✅ RIGHT
 *
 * 3. data.length use karna Content-Length ke liye — unicode ke saath galat
 *    "Content-Length": data.length             // ❌ WRONG for non-ASCII
 *    "Content-Length": Buffer.byteLength(data) // ✅ RIGHT
 *
 * 4. http module dobara import karna — duplicate require se error nahi but messy hai
 *    const http = require("http"); ... const http = require("http"); // ❌ WRONG
 *
 * 5. JSON.parse bina try/catch — invalid JSON se server crash
 *    const data = JSON.parse(body);                       // ❌ WRONG
 *    try { const data = JSON.parse(body); } catch { ... } // ✅ RIGHT
*/

/**
 * PRACTICAL PATTERNS (Real-life use cases)
 *
 *   // Health check endpoint
 *   if (pathname === "/health" && method === "GET") {
 *     sendJSON(200, { status: "healthy", timestamp: new Date().toISOString() });
 *   }
 *
 *   // Echo server (returns what you sent)
 *   if (pathname === "/echo" && method === "POST") {
 *     req.pipe(res); // just pipe request back as response
 *   }
 *
 *   // File download with streaming
 *   if (pathname === "/download") {
 *     const stream = fs.createReadStream("./file.zip");
 *     res.writeHead(200, {
 *       "Content-Type": "application/zip",
 *       "Content-Disposition": "attachment; filename=file.zip"
 *     });
 *     stream.pipe(res);
 *   }
 *
 *   // Proxy request to another server
 *   if (pathname.startsWith("/proxy")) {
 *     const proxyReq = http.request({ ... }, (proxyRes) => {
 *       res.writeHead(proxyRes.statusCode, proxyRes.headers);
 *       proxyRes.pipe(res);
 *     });
 *     req.pipe(proxyReq);
 *   }
 */


/* 1. Import http Module */
const http = require('http');

/**
 * 2. Creating a Basic HTTP Server 
 *    a. req: Incoming message (HTTP request object)
 *    b. res: Server response object
 *    c. res.writeHead(statusCode, headers): Sets response headers
 *    d. res.end(data): Ends the response and sends data back to the client
 * */
const http = require('http');

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('Hello, World!');
// });


/**
 * 3. Responding based on Route
*/
// const server = http.createServer((req, res) => {
//   if (req.url === '/') {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end('<h1>Home Page</h1>');
//   } else if (req.url === '/about') {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end('<h1>About Page</h1>');
//   } else {
//     res.writeHead(404, { 'Content-Type': 'text/html' });
//     res.end('<h1>404 Not Found</h1>');
//   }
// });


/**
 * 4. Handling JSON Response
*/
// const server = http.createServer((req, res) => {
//   const data = { name: 'Code Snippet', language: 'JavaScript' };
//   res.writeHead(200, { 'Content-Type': 'application/json' });
//   res.end(JSON.stringify(data));
// });


/**
 * 5. Handling Query Params: http://localhost:3000/?name=Code
*/
// const url = require('url');

// const server = http.createServer((req, res) => {
//   const parsedUrl = url.parse(req.url, true); // true = parse query string
//   const name = parsedUrl.query.name;

//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end(`Hello, ${name || 'Guest'}!`);
// });



/**
 * 6. Making HTTP Requests:
 *    a. GET Request
 *    b. POST Request
*/

/* GET Request */
// http.get('http://jsonplaceholder.typicode.com/posts/1', (res) => {
//   let data = '';
//   res.on('data', (chunk) => data += chunk);
//   res.on('end', () => console.log(JSON.parse(data)));
// });


/* POST Request */
// const data = JSON.stringify({ title: 'foo', body: 'bar', userId: 1 });

// const options = {
//   hostname: 'jsonplaceholder.typicode.com',
//   path: '/posts',
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Content-Length': data.length
//   }
// };

// const req = http.request(options, (res) => {
//   let responseData = '';
//   res.on('data', (chunk) => responseData += chunk);
//   res.on('end', () => console.log(JSON.parse(responseData)));
// });

// req.write(data);
// req.end();


/**
 * 7. Events in http.Server
 *    a. request 	Emitted when a request is received
 *    b. connection 	When a new TCP stream is established
 *    c. close 	When the server is closed
 *    d. checkContinue 	Client sends Expect: 100-continue
*/
// server.on('request', (req, res) => {
//   console.log('New request received');
// });


/**
 * 8. Streaming Response 
*/
// const server = http.createServer((req, res) => {
//   const stream = fs.createReadStream('./bigfile.txt');
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   stream.pipe(res);
// });



server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});


