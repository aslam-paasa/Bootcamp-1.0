/**
 * NODE.JS HTTP MODULE — createServer, req, res, routing, methods
*/

/**
 * 1. What is http MODULE?
 *    ────────────────────────
 *    > Node ka built-in module HTTP servers banane ke liye. 
 *    > Install karne ki zaroorat nahi.
 *    > Har incoming request par ek callback trigger hota hai do objects
 *      ke saath:
 *      a. req (IncomingMessage) — client ne kya bheja
 *      b. res (ServerResponse)  — aap kya wapas bhej rahe ho
 *
 *      const http = require("http");
*/

/**
 * KEY CONCEPTS AUR KEYWORDS
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. http.createServer() + server.listen()                        │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: createServer() ek callback register karta hai jo har   │
 * │          incoming request par run hota hai. listen() server ko  │
 * │          ek port se bind karta hai aur connections accept karna │
 * │          start kar deta hai.                                    │
 * │                                                                 │
 * │ listen() async hai — callback tab chalta hai jab port ready ho  │
 * │ listen() ke baad ka code turant run hota hai (event loop)       │
 * │                                                                 │
 * │ Common ports:                                                   │
 * │   80   → default HTTP     443  → default HTTPS                  │
 * │   3000 → common dev port  8080 → alternative dev port           │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const server = http.createServer((req, res) => {              │
 * │     res.end("Hello world");                                     │
 * │   });                                                           │
 * │   server.listen(3000, () => console.log("Running on :3000"));   │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 2. req — request object                                         │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Client ne request ke saath jo kuch bheja, sab kuch     │
 * │          is object mein hota hai.                               │
 * │                                                                 │
 * │   req.url     → path string, e.g. "/about", "/api/users"        │
 * │   req.method  → HTTP verb string: "GET" "POST" "PUT" "DELETE"   │
 * │   req.headers → object of all request headers                   │
 * │                                                                 │
 * │ POST body padhna (chunks mein aata hai):                        │
 * │   let body = "";                                                │
 * │   req.on("data", chunk => body += chunk.toString());            │
 * │   req.on("end", () => {                                         │
 * │     const data = JSON.parse(body);                              │
 * │     res.end("Received");                                        │
 * │   });                                                           │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 3. res — response object                                        │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Client ko response build aur bhejne ke liye use hota hai│
 * │                                                                 │
 * │   res.writeHead(status, headers) → status code + headers set    │
 * │   res.write(data)                → partial data bhejo           │
 * │   res.end(data)                  → final data bhejo aur close   │
 * │                                                                 │
 * │ Hamesha res.end() call karo — client warna hang ho jayega!     │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   res.writeHead(200, { "Content-Type": "application/json" });   │
 * │   res.end(JSON.stringify({ ok: true }));                        │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 4. Status codes                                                 │
 * ├─────────────────────────────────────────────────────────────────┤
 * │   200 OK              → success (sab theek)                     │
 * │   201 Created         → resource create hua (POST response)     │
 * │   301 Moved           → permanent redirect (Location header set)│
 * │   400 Bad Request     → client ne galat data bheja              │
 * │   401 Unauthorized    → authentication chahiye                  │
 * │   403 Forbidden       → authenticated but access nahi           │
 * │   404 Not Found       → route ya resource exist nahi karta      │
 * │   500 Internal Error  → server-side error (kuch toot gaya)      │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 5. Content-Type header                                          │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Browser ko batata hai ki response body ko kaise parse  │
 * │          karna hai. Iske bina browser guess karta hai — aksar   │
 * │          galat guess kar leta hai.                              │
 * │                                                                 │
 * │   "text/plain"              → raw text                          │
 * │   "text/html"               → HTML markup                       │
 * │   "application/json"        → JSON data                         │
 * │   "application/javascript"  → JS file                           │
 * │   "text/css"                → CSS file                          │
 * │   "image/png" / "image/jpeg"→ image binary                      │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 6. URL routing                                                  │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: req.url (aur optional req.method) ke basis par branch  │
 * │          karna, different routes ke liye different content serve│
 * │          karna. Yeh manual version hai jo Express automatically │
 * │          kar deta hai.                                          │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const { method, url } = req;                                  │
 * │                                                                 │
 * │   if (method === "GET" && url === "/")  { ... }                 │
 * │   else if (method === "GET" && url === "/about") { ... }        │
 * │   else if (method === "POST" && url === "/api/users") { ... }   │
 * │   else {                                                        │
 * │     res.writeHead(404, { "Content-Type": "text/html" });        │
 * │     res.end("<h1>404 Not Found</h1>");                          │
 * │   }                                                             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 7. Async request handlers                                       │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: createServer callback async ho sakta hai. File reads,  │
 * │          DB queries ke liye await use karo. Hamesha try/catch   │
 * │          mein wrap karo — unhandled throw se server crash ho    │
 * │          sakta hai for that request.                            │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const server = http.createServer(async (req, res) => {        │
 * │     try {                                                       │
 * │       const data = await fs.readFile("./data.json", "utf-8");   │
 * │       res.writeHead(200, { "Content-Type": "application/json" });│
 * │       res.end(data);                                            │
 * │     } catch (err) {                                             │
 * │       res.writeHead(500);                                       │
 * │       res.end("Server error");                                  │
 * │     }                                                           │
 * │   });                                                           │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 8. Headers — request aur response dono mein                     │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Request headers: client ne bheje, req.headers mein milte hain   │
 * │   const userAgent = req.headers["user-agent"];                   │
 * │   const authToken = req.headers["authorization"];                │
 * │                                                                 │
 * │ Response headers: aap client ko bhejo, res.writeHead() mein     │
 * │   res.writeHead(200, {                                          │
 * │     "Content-Type": "text/html",                                │
 * │     "Set-Cookie": "session=123",                                │
 * │     "Cache-Control": "no-cache"                                 │
 * │   });                                                           │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 9. Query parameters — URL se data nikalna                       │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: URL mein ? ke baad aata hai, e.g. /search?q=node       │
 * │          Node.js ka built-in URL module use karo parse karne ke │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const urlObj = new URL(req.url, `http://${req.headers.host}`);│
 * │   const query = urlObj.searchParams;                            │
 * │   const searchTerm = query.get("q"); // "node"                  │
 * │   const page = query.get("page") || "1";                        │
 * └─────────────────────────────────────────────────────────────────┘
*/

/**
 * EXAMPLE WITH REAL DATA: Users API with in-memory storage
 * 
 * const http = require("http");
 * const url = require("url");
 * 
 * let users = [
 *   { id: 1, name: "Rajesh", email: "rajesh@example.com" },
 *   { id: 2, name: "Priya", email: "priya@example.com" }
 * ];
 * 
 * const server = http.createServer((req, res) => {
 *   const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
 *   const pathname = parsedUrl.pathname;
 *   const method = req.method;
 * 
 *   // GET /api/users - saare users do
 *   if (method === "GET" && pathname === "/api/users") {
 *     res.writeHead(200, { "Content-Type": "application/json" });
 *     res.end(JSON.stringify(users));
 *   }
 *   
 *   // GET /api/users/:id - specific user do
 *   else if (method === "GET" && pathname.startsWith("/api/users/")) {
 *     const id = parseInt(pathname.split("/")[3]);
 *     const user = users.find(u => u.id === id);
 *     
 *     if (user) {
 *       res.writeHead(200, { "Content-Type": "application/json" });
 *       res.end(JSON.stringify(user));
 *     } else {
 *       res.writeHead(404);
 *       res.end(JSON.stringify({ error: "User not found" }));
 *     }
 *   }
 *   
 *   // POST /api/users - naya user add karo
 *   else if (method === "POST" && pathname === "/api/users") {
 *     let body = "";
 *     req.on("data", chunk => body += chunk);
 *     req.on("end", () => {
 *       try {
 *         const newUser = JSON.parse(body);
 *         newUser.id = users.length + 1;
 *         users.push(newUser);
 *         res.writeHead(201, { "Content-Type": "application/json" });
 *         res.end(JSON.stringify(newUser));
 *       } catch {
 *         res.writeHead(400);
 *         res.end(JSON.stringify({ error: "Invalid JSON" }));
 *       }
 *     });
 *   }
 *   
 *   // 404 - kuch nahi mila
 *   else {
 *     res.writeHead(404);
 *     res.end(JSON.stringify({ error: "Route not found" }));
 *   }
 * });
*/

/**
 * ======================================================================
 * COMMON MISTAKES (Aksar hone wali galtiyan)
 * ======================================================================
 *
 *   // res.end() bhoolna — client hamesha hang rahega
 *   res.write("Hello"); // ❌ WRONG — end() nahi kiya
 *   res.end("Hello");   // ✅ RIGHT
 *
 *   // Event loop block karna — saare concurrent requests freeze
 *   const data = fs.readFileSync("file.txt"); // ❌ WRONG server mein
 *   const data = await fs.readFile("file.txt"); // ✅ RIGHT
 *
 *   // Async handler mein try/catch nahi lagana
 *   const server = http.createServer(async (req, res) => {
 *     const d = await mightFail(); // no try/catch → ❌ WRONG
 *   });
 *
 *   // Content-Type set karna bhoolna
 *   res.end(JSON.stringify({ data })); // browser samjhega nahi
 *   res.writeHead(200, { "Content-Type": "application/json" }); // ✅
 *   res.end(JSON.stringify({ data }));
 *
 *   // 404 response mein body dena bhoolna
 *   res.writeHead(404); // client confused rahega
 *   res.end();          // thik hai, but better to give message
 *   res.writeHead(404, { "Content-Type": "text/html" });
 *   res.end("<h1>404 - Page nahi mili</h1>"); // ✅
*/

/**
 * ======================================================================
 * PRACTICAL PATTERNS (Real-life use cases)
 * ======================================================================
 *
 *   // CORS headers allow karna (Cross-Origin Resource Sharing)
 *   res.writeHead(200, {
 *     "Content-Type": "application/json",
 *     "Access-Control-Allow-Origin": "*",
 *     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE"
 *   });
 *
 *   // JSON response helper function
 *   function sendJSON(res, status, data) {
 *     res.writeHead(status, { "Content-Type": "application/json" });
 *     res.end(JSON.stringify(data));
 *   }
 *
 *   // Parse JSON body helper
 *   function parseJSONBody(req, callback) {
 *     let body = "";
 *     req.on("data", chunk => body += chunk);
 *     req.on("end", () => {
 *       try {
 *         callback(null, JSON.parse(body));
 *       } catch (err) {
 *         callback(err);
 *       }
 *     });
 *   }
 *
 *   // Simple logger middleware
 *   function logRequest(req) {
 *     const timestamp = new Date().toISOString();
 *     console.log(`[${timestamp}] ${req.method} ${req.url}`);
 *   }
 *
 * ======================================================================
 */


const http = require("http");
const fs = require("fs/promises");
const path = require("path");

const PORT = 3000;

console.log("\n" + "=".repeat(60));
console.log("🚀 NODE.JS HTTP SERVER — COMPLETE EXAMPLE");
console.log("=".repeat(60));
console.log(`\nServer http://localhost:${PORT} par start hoga...\n`);

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  // Logger - har request log karo
  console.log(`[${new Date().toISOString()}] ${method} ${url}`);

  // ── 1. GET / — Home page (HTML) ─────────────────────────────────
  if (method === "GET" && url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head><title>Home</title></head>
        <body>
          <h1>🏠 Home Page</h1>
          <p>Welcome to our Node.js HTTP server!</p>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/api">API Info</a></li>
            <li><a href="/users">Users API</a></li>
            <li><a href="/old-page">Redirect Example</a></li>
            <li><a href="/file">Serve File</a></li>
          </ul>
        </body>
      </html>
    `);

    // ── 2. GET /about — About page (HTML) ───────────────────────────
  } else if (method === "GET" && url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head><title>About</title></head>
        <body>
          <h1>📖 About Page</h1>
          <p>This server demonstrates Node.js HTTP module features.</p>
          <p><a href="/">Back to Home</a></p>
        </body>
      </html>
    `);

    // ── 3. GET /api — Simple JSON response ───────────────────────────
  } else if (method === "GET" && url === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      message: "API is working!",
      status: "success",
      timestamp: new Date().toISOString(),
      endpoints: [
        "/",
        "/about",
        "/api",
        "/users",
        "/old-page",
        "/file"
      ]
    }));

    // ── 4. GET /users — Users list API ───────────────────────────────
  } else if (method === "GET" && url === "/users") {
    const users = [
      { id: 1, name: "Rajesh", email: "rajesh@example.com" },
      { id: 2, name: "Priya", email: "priya@example.com" },
      { id: 3, name: "Amit", email: "amit@example.com" }
    ];

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));

    // ── 5. GET /users/:id — Single user API ─────────────────────────
  } else if (method === "GET" && url.startsWith("/users/")) {
    const id = parseInt(url.split("/")[2]);
    const users = [
      { id: 1, name: "Rajesh", email: "rajesh@example.com" },
      { id: 2, name: "Priya", email: "priya@example.com" },
      { id: 3, name: "Amit", email: "amit@example.com" }
    ];

    const user = users.find(u => u.id === id);

    if (user) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "User not found" }));
    }

    // ── 6. GET /search?q=something — Query parameters ────────────────
  } else if (method === "GET" && url.startsWith("/search")) {
    const parsedUrl = new URL(url, `http://${req.headers.host}`);
    const query = parsedUrl.searchParams;
    const searchTerm = query.get("q") || "nothing";
    const page = query.get("page") || "1";

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      searchTerm,
      page,
      results: [`Result 1 for ${searchTerm}`, `Result 2 for ${searchTerm}`]
    }));

    // ── 7. POST /api/users — Create new user (with body parsing) ────
  } else if (method === "POST" && url === "/api/users") {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const userData = JSON.parse(body);
        // In real app, save to database
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
          message: "User created",
          user: { id: Date.now(), ...userData }
        }));
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });

    // ── 8. GET /old-page — 301 redirect example ─────────────────────
  } else if (method === "GET" && url === "/old-page") {
    res.writeHead(301, { "Location": "/" });
    res.end();

    // ── 9. GET /file — Serve a file example ─────────────────────────
  } else if (method === "GET" && url === "/file") {
    try {
      // Try to serve a sample file
      const filePath = path.join(__dirname, "sample.txt");
      const data = await fs.readFile(filePath, "utf-8");

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(data);
    } catch (err) {
      // File not found, create it
      const sampleContent = `This is a sample file created at ${new Date().toISOString()}`;
      await fs.writeFile(path.join(__dirname, "sample.txt"), sampleContent);

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(sampleContent + "\n\n(File was just created)");
    }

    // ── 10. GET /headers — Show request headers ─────────────────────
  } else if (method === "GET" && url === "/headers") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      headers: req.headers,
      method: req.method,
      url: req.url
    }));

    // ── 11. GET /cors — CORS headers example ────────────────────────
  } else if (method === "GET" && url === "/cors") {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    });
    res.end(JSON.stringify({ message: "CORS headers are set!" }));

    // ── 12. 404 — Page not found ────────────────────────────────────
  } else {
    // Check content type based on Accept header
    const accept = req.headers["accept"] || "";

    if (accept.includes("application/json")) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Route not found" }));
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(`
        <!DOCTYPE html>
        <html>
          <head><title>404 Not Found</title></head>
          <body>
            <h1>404 - Page Nahin Mili</h1>
            <p>The requested path "${url}" does not exist.</p>
            <p><a href="/">Go to Home</a></p>
          </body>
        </html>
      `);
    }
  }
});

// Server start karo
server.listen(PORT, () => {
  console.log("\n" + "=".repeat(60));
  console.log(`✅ SERVER RUNNING at http://localhost:${PORT}`);
  console.log("=".repeat(60));
  console.log("\n📋 AVAILABLE ENDPOINTS:");
  console.log("   GET  /          - Home page (HTML)");
  console.log("   GET  /about     - About page (HTML)");
  console.log("   GET  /api       - API info (JSON)");
  console.log("   GET  /users     - Users list (JSON)");
  console.log("   GET  /users/1   - Single user (JSON)");
  console.log("   GET  /search?q=node - Search with query");
  console.log("   POST /api/users - Create user (send JSON)");
  console.log("   GET  /old-page  - Redirect to /");
  console.log("   GET  /file      - Serve sample file");
  console.log("   GET  /headers   - Show request headers");
  console.log("   GET  /cors      - CORS headers example");
  console.log("\n📝 Try these in your browser or use curl/postman\n");
});

// Server close handler (for graceful shutdown)
process.on("SIGINT", () => {
  console.log("\n\n👋 Server band ho raha hai...");
  server.close(() => {
    console.log("✅ Server band ho gaya. Alvida!");
    process.exit(0);
  });
});

// Create a sample file if it doesn't exist
async function createSampleFile() {
  const filePath = path.join(__dirname, "sample.txt");
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, `Sample file created at ${new Date().toISOString()}`);
    console.log("📄 Sample file created: sample.txt");
  }
}
createSampleFile();

// ======================================================================
// HTTP STATUS CODES QUICK REFERENCE
// ======================================================================
console.log("\n" + "=".repeat(60));
console.log("📚 HTTP STATUS CODES QUICK REFERENCE");
console.log("=".repeat(60));
console.log(`
🟢 2xx SUCCESS:
   200 OK                    - Sab theek, data bheja
   201 Created               - Naya resource ban gaya
   204 No Content            - Success but kuch nahi bhejna

🔵 3xx REDIRECT:
   301 Moved Permanently     - Permanent redirect (Location header)
   302 Found                 - Temporary redirect
   304 Not Modified          - Cache use karo

🟡 4xx CLIENT ERROR:
   400 Bad Request           - Client ne galat data bheja
   401 Unauthorized          - Login karo pehle
   403 Forbidden             - Login to kar liya but access nahi
   404 Not Found             - Page/resource nahi mila
   429 Too Many Requests     - Rate limit exceed

🔴 5xx SERVER ERROR:
   500 Internal Server Error - Kuch toot gaya
   502 Bad Gateway           - Upstream server ne galat jawab diya
   503 Service Unavailable   - Server overload ya down
`);

// ======================================================================
// CONTENT TYPES QUICK REFERENCE
// ======================================================================
console.log("\n" + "=".repeat(60));
console.log("📄 CONTENT TYPES QUICK REFERENCE");
console.log("=".repeat(60));
console.log(`
   text/plain                - Plain text
   text/html                 - HTML markup
   text/css                  - CSS stylesheet
   application/javascript    - JavaScript file
   application/json          - JSON data
   application/xml           - XML data
   image/png                 - PNG image
   image/jpeg                - JPEG image
   image/gif                 - GIF image
   audio/mpeg                - MP3 audio
   video/mp4                 - MP4 video
   multipart/form-data       - File upload
   application/x-www-form-urlencoded - Form data
`);

// ======================================================================
// HTTP METHODS QUICK REFERENCE
// ======================================================================
console.log("\n" + "=".repeat(60));
console.log("🔧 HTTP METHODS QUICK REFERENCE");
console.log("=".repeat(60));
console.log(`
   GET     - Data lena (read)
   POST    - Naya data banana (create)
   PUT     - Data update karna (replace)
   PATCH   - Data partial update karna
   DELETE  - Data hatana
   HEAD    - Sirf headers lena, body nahi
   OPTIONS - Allowed methods puchna
`);

console.log("\n" + "=".repeat(60));
console.log("✅ HTTP MODULE EXAMPLES COMPLETE");
console.log("=".repeat(60));
console.log("\n🚀 Server chal raha hai. CTRL+C press karo band karne ke liye.\n");