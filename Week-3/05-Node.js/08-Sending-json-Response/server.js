/**
 * ======================================================================
 * NODE.JS JSON RESPONSES — JSON.stringify, setHeader, JSON APIs (HINGLISH VERSION)
 * ======================================================================
 *
 * JSON API KYA HAI?
 * ───────────────────
 * Ek server jo HTML ki jagah JSON data bhejta aur receive karta hai.
 * JSON universal data format hai jo har language samajhti hai —
 * browsers, mobile apps, aur doosre servers sab same tarike se use karte hain.
 *
 *   JSON = JavaScript Object Notation
 *   API = Application Programming Interface
 *
 * ======================================================================
 * KEY CONCEPTS AUR KEYWORDS EXPLAINED (HINGLISH MEIN)
 * ======================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. JSON.stringify() + JSON.parse()                              │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ JSON.stringify(obj)   → JS object → JSON string (bhejne ke liye)│
 * │ JSON.parse(str)       → JSON string → JS object (lene ke liye)  │
 * │                                                                 │
 * │ JSON vs JS object mein farak:                                   │
 * │   JS keys mein quotes optional  → JSON keys DOUBLE quotes MUST  │
 * │   JS mein functions ho sakte hain → JSON sirf data allow karta  │
 * │   JS mein Date objects hote hain → JSON mein strings/numbers    │
 * │                                                                 │
 * │ Kabhi JSON strings manually mat likho — hamesha JSON.stringify()│
 * │ use karo.                                                       │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   res.end(JSON.stringify({ id: 1, name: "Rahul" }));            │
 * │                                                                 │
 * │   // POST body receive karte waqt:                              │
 * │   try { const data = JSON.parse(body); }                        │
 * │   catch { res.statusCode = 400; res.end(...); }                 │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 2. res.setHeader() vs res.writeHead()                           │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Dono response headers set karte hain, lekin alag time par:      │
 * │                                                                 │
 * │ res.setHeader(name, value)                                      │
 * │   → Ek single header set karta hai. Multiple baar call kar     │
 * │     sakte ho. Headers buffer hote hain jab tak res.end() na call│
 * │     ho.                                                         │
 * │                                                                 │
 * │ res.writeHead(status, headersObj)                               │
 * │   → Status code + multiple headers ek saath set karta hai.      │
 * │   → res.write() ya res.end() se PEHLE call karna hota hai.      │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   // Option A — setHeader then end                              │
 * │   res.setHeader("Content-Type", "application/json");            │
 * │   res.statusCode = 201;                                         │
 * │   res.end(JSON.stringify(data));                                │
 * │                                                                 │
 * │   // Option B — writeHead (sab ek saath)                        │
 * │   res.writeHead(201, { "Content-Type": "application/json" });   │
 * │   res.end(JSON.stringify(data));                                │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 3. Content-Type: application/json                               │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Client ko batata hai ki response body JSON hai.        │
 * │        Is header ke bina client guess karta hai — aur galat     │
 * │        treat kar sakta hai (plain text ya file download).       │
 * │        JSON responses ke liye hamesha ye header set karo.       │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 4. Consistent JSON response shapes                              │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Predictable shapes use karo taake client saare cases handle kar │
 * │ sake:                                                           │
 * │                                                                 │
 * │   Single resource   { "id": 1, "name": "Rahul" }                │
 * │   Collection        [{ "id": 1 }, { "id": 2 }]                  │
 * │   Error             { "error": "User nahi mila" }               │
 * │   Created           { "message": "Ban gaya", "user": { ... } }  │
 * │   Validation error  { "errors": { "email": "Invalid format" } } │
 * │                                                                 │
 * │ JSON APIs ke liye status codes:                                 │
 * │   200 OK, 201 Created, 400 Bad Request, 404 Not Found,          │
 * │   500 Internal Server Error                                      │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 5. POST body parsing — JSON data receive karna                   │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Jab client JSON data bhejta hai (POST/PUT), to wo      │
 * │          streams mein aata hai. Chunks collect karo, phir parse.│
 * │                                                                 │
 * │ Code template:                                                  │
 * │   let body = "";                                                │
 * │   req.on("data", chunk => { body += chunk.toString(); });       │
 * │   req.on("end", () => {                                         │
 * │     try {                                                       │
 * │       const data = JSON.parse(body);                            │
 * │       // data use karo                                          │
 * │     } catch (err) {                                             │
 * │       res.statusCode = 400;                                     │
 * │       res.end(JSON.stringify({ error: "Invalid JSON" }));       │
 * │     }                                                           │
 * │   });                                                           │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 6. JSON response helpers — reusable functions                   │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Baar-baar same code likhne se bachne ke liye helper    │
 * │          functions bana lo.                                     │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   function sendJSON(res, status, data) {                        │
 * │     res.writeHead(status, { "Content-Type": "application/json" });│
 * │     res.end(JSON.stringify(data));                              │
 * │   }                                                             │
 * │                                                                 │
 * │   function sendError(res, status, message) {                    │
 * │     sendJSON(res, status, { error: message });                  │
 * │   }                                                             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ======================================================================
 * COMPLETE EXAMPLE WITH REAL DATA
 * ======================================================================
 *
 * // Users API with CRUD operations
 * 
 * const users = [
 *   { id: 1, name: "Rahul", email: "rahul@example.com" },
 *   { id: 2, name: "Priya", email: "priya@example.com" }
 * ];
 * 
 * function sendJSON(res, status, data) {
 *   res.writeHead(status, { "Content-Type": "application/json" });
 *   res.end(JSON.stringify(data));
 * }
 * 
 * const requestHandler = (req, res) => {
 *   const { pathname } = url.parse(req.url, true);
 *   const { method } = req;
 * 
 *   // GET /api/users - all users
 *   if (pathname === "/api/users" && method === "GET") {
 *     sendJSON(res, 200, users);
 *   }
 *   
 *   // GET /api/users/:id - single user
 *   else if (pathname.startsWith("/api/users/") && method === "GET") {
 *     const id = Number(pathname.split("/")[3]);
 *     const user = users.find(u => u.id === id);
 *     
 *     if (user) sendJSON(res, 200, user);
 *     else sendJSON(res, 404, { error: "User not found" });
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
 *         sendJSON(res, 201, newUser);
 *       } catch {
 *         sendJSON(res, 400, { error: "Invalid JSON" });
 *       }
 *     });
 *   }
 *   
 *   else {
 *     sendJSON(res, 404, { error: "Endpoint not found" });
 *   }
 * };
 *
 * ======================================================================
 * COMMON MISTAKES (Aksar hone wali galtiyan)
 * ======================================================================
 *
 *   // Object directly bhejna — browser "[object Object]" dekhega
 *   res.end(data);                   // ❌ WRONG
 *   res.end(JSON.stringify(data));   // ✅ RIGHT
 *
 *   // Wrong Content-Type — client JSON parse nahi karega
 *   res.setHeader("Content-Type", "text/plain"); // ❌ WRONG
 *   res.setHeader("Content-Type", "application/json"); // ✅ RIGHT
 *
 *   // JSON.parse bina try/catch — invalid body se server crash
 *   const user = JSON.parse(body);   // ❌ WRONG
 *   try { const user = JSON.parse(body); } // ✅ RIGHT
 *   catch { res.statusCode = 400; res.end(JSON.stringify({ error: "Invalid JSON" })); }
 *
 *   // JSON.stringify bhoolna
 *   res.end({ id: 1 });  // ❌ "[object Object]"
 *   res.end(JSON.stringify({ id: 1 })); // ✅
 *
 *   // POST body parse karte waqt buffer bhoolna
 *   const data = JSON.parse(req.body); // ❌ Node mein req.body nahi hota
 *
 * ======================================================================
 * PRACTICAL PATTERNS (Real-life use cases)
 * ======================================================================
 *
 *   // Success response with metadata
 *   sendJSON(res, 200, {
 *     status: "success",
 *     data: users,
 *     count: users.length
 *   });
 *
 *   // Error response with code
 *   sendJSON(res, 400, {
 *     error: "Validation failed",
 *     details: { email: "Already exists" }
 *   });
 *
 *   // Paginated response
 *   sendJSON(res, 200, {
 *     page: 1,
 *     limit: 10,
 *     total: 100,
 *     data: users.slice(0, 10)
 *   });
 *
 *   // Created response with location header
 *   res.writeHead(201, {
 *     "Content-Type": "application/json",
 *     "Location": `/api/users/${newUser.id}`
 *   });
 *   res.end(JSON.stringify(newUser));
 *
 * ======================================================================
 */

// ======================================================================
// CODE EXAMPLES — Saare concepts ek saath
// ======================================================================

const http = require("http");
const url = require("url");

// Sample data
let users = [
  { id: 1, name: "Rahul", email: "rahul@example.com", role: "admin", createdAt: "2025-01-15" },
  { id: 2, name: "Priya", email: "priya@example.com", role: "user", createdAt: "2025-01-20" },
  { id: 3, name: "Amit", email: "amit@example.com", role: "user", createdAt: "2025-02-01" },
  { id: 4, name: "Neha", email: "neha@example.com", role: "editor", createdAt: "2025-02-10" },
  { id: 5, name: "Vikram", email: "vikram@example.com", role: "user", createdAt: "2025-02-15" }
];

let posts = [
  { id: 1, userId: 1, title: "First post", content: "Hello world" },
  { id: 2, userId: 1, title: "Second post", content: "Node.js rocks" },
  { id: 3, userId: 2, title: "Priya's post", content: "Learning JS" },
  { id: 4, userId: 3, title: "Amit's thoughts", content: "JSON APIs are cool" }
];

// Helper functions
function sendJSON(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data, null, 2)); // null,2 for pretty print
}

function sendError(res, status, message, details = null) {
  const error = { error: message };
  if (details) error.details = details;
  sendJSON(res, status, error);
}

// ── Request handler ────────────────────────────────────────────────
const requestHandler = (req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  const { method } = req;

  console.log(`[${new Date().toISOString()}] ${method} ${pathname}`);

  // ── 1. GET /api/users — all users (with optional filtering) ─────
  if (pathname === "/api/users" && method === "GET") {
    let result = [...users];
    
    // Filter by role if provided
    if (query.role) {
      result = result.filter(u => u.role === query.role);
    }
    
    sendJSON(res, 200, {
      status: "success",
      count: result.length,
      users: result
    });
  }

  // ── 2. GET /api/users/:id — single user ─────────────────────────
  else if (pathname.startsWith("/api/users/") && method === "GET") {
    const parts = pathname.split("/").filter(Boolean);
    const id = Number(parts[2]); // /api/users/42 → ["api", "users", "42"]
    
    if (isNaN(id)) {
      return sendError(res, 400, "Invalid user ID");
    }
    
    const user = users.find(u => u.id === id);
    
    if (user) {
      sendJSON(res, 200, {
        status: "success",
        user
      });
    } else {
      sendError(res, 404, `User with ID ${id} not found`);
    }
  }

  // ── 3. POST /api/users — create new user ────────────────────────
  else if (pathname === "/api/users" && method === "POST") {
    let body = "";
    
    req.on("data", chunk => {
      body += chunk.toString();
    });
    
    req.on("end", () => {
      try {
        const newUser = JSON.parse(body);
        
        // Validate required fields
        if (!newUser.name || !newUser.email) {
          return sendError(res, 400, "Name and email are required");
        }
        
        // Check if email already exists
        const existingUser = users.find(u => u.email === newUser.email);
        if (existingUser) {
          return sendError(res, 409, "Email already exists");
        }
        
        // Add new user
        newUser.id = users.length + 1;
        newUser.createdAt = new Date().toISOString().split("T")[0];
        newUser.role = newUser.role || "user";
        
        users.push(newUser);
        
        // Send response with Location header
        res.writeHead(201, {
          "Content-Type": "application/json",
          "Location": `/api/users/${newUser.id}`
        });
        res.end(JSON.stringify({
          status: "success",
          message: "User created",
          user: newUser
        }, null, 2));
        
      } catch (err) {
        sendError(res, 400, "Invalid JSON format");
      }
    });
  }

  // ── 4. PUT /api/users/:id — update user (full update) ───────────
  else if (pathname.startsWith("/api/users/") && method === "PUT") {
    const parts = pathname.split("/").filter(Boolean);
    const id = Number(parts[2]);
    
    if (isNaN(id)) {
      return sendError(res, 400, "Invalid user ID");
    }
    
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      try {
        const updates = JSON.parse(body);
        const userIndex = users.findIndex(u => u.id === id);
        
        if (userIndex === -1) {
          return sendError(res, 404, `User with ID ${id} not found`);
        }
        
        // Update user (full replace)
        users[userIndex] = { ...updates, id };
        
        sendJSON(res, 200, {
          status: "success",
          message: "User updated",
          user: users[userIndex]
        });
        
      } catch (err) {
        sendError(res, 400, "Invalid JSON format");
      }
    });
  }

  // ── 5. PATCH /api/users/:id — partial update ────────────────────
  else if (pathname.startsWith("/api/users/") && method === "PATCH") {
    const parts = pathname.split("/").filter(Boolean);
    const id = Number(parts[2]);
    
    if (isNaN(id)) {
      return sendError(res, 400, "Invalid user ID");
    }
    
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      try {
        const updates = JSON.parse(body);
        const userIndex = users.findIndex(u => u.id === id);
        
        if (userIndex === -1) {
          return sendError(res, 404, `User with ID ${id} not found`);
        }
        
        // Partial update (only provided fields)
        users[userIndex] = { ...users[userIndex], ...updates };
        
        sendJSON(res, 200, {
          status: "success",
          message: "User updated",
          user: users[userIndex]
        });
        
      } catch (err) {
        sendError(res, 400, "Invalid JSON format");
      }
    });
  }

  // ── 6. DELETE /api/users/:id — delete user ──────────────────────
  else if (pathname.startsWith("/api/users/") && method === "DELETE") {
    const parts = pathname.split("/").filter(Boolean);
    const id = Number(parts[2]);
    
    if (isNaN(id)) {
      return sendError(res, 400, "Invalid user ID");
    }
    
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return sendError(res, 404, `User with ID ${id} not found`);
    }
    
    const deletedUser = users[userIndex];
    users = users.filter(u => u.id !== id);
    
    sendJSON(res, 200, {
      status: "success",
      message: "User deleted",
      user: deletedUser
    });
  }

  // ── 7. GET /api/users/:id/posts — nested resource ───────────────
  else if (pathname.match(/^\/api\/users\/\d+\/posts$/) && method === "GET") {
    const parts = pathname.split("/").filter(Boolean);
    const userId = Number(parts[2]); // /api/users/2/posts → ["api", "users", "2", "posts"]
    
    const userPosts = posts.filter(p => p.userId === userId);
    
    sendJSON(res, 200, {
      status: "success",
      userId,
      count: userPosts.length,
      posts: userPosts
    });
  }

  // ── 8. GET /api/posts — all posts (with query params) ───────────
  else if (pathname === "/api/posts" && method === "GET") {
    let result = [...posts];
    
    // Filter by userId
    if (query.userId) {
      const userId = Number(query.userId);
      result = result.filter(p => p.userId === userId);
    }
    
    // Limit
    if (query.limit) {
      const limit = Number(query.limit);
      result = result.slice(0, limit);
    }
    
    sendJSON(res, 200, {
      status: "success",
      count: result.length,
      posts: result
    });
  }

  // ── 9. GET /api/headers — show request headers (echo) ───────────
  else if (pathname === "/api/headers" && method === "GET") {
    sendJSON(res, 200, {
      status: "success",
      headers: req.headers,
      method: req.method,
      url: req.url
    });
  }

  // ── 10. POST /api/echo — echo back what was sent ────────────────
  else if (pathname === "/api/echo" && method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        sendJSON(res, 200, {
          status: "success",
          message: "Echo",
          received: data,
          timestamp: new Date().toISOString()
        });
      } catch {
        sendJSON(res, 200, {
          status: "success",
          message: "Echo (raw)",
          received: body,
          note: "Send JSON next time for parsed response"
        });
      }
    });
  }

  // ── 11. GET /api/status — API health check ───────────────────────
  else if (pathname === "/api/status" && method === "GET") {
    sendJSON(res, 200, {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      endpoints: [
        "GET /api/users",
        "GET /api/users/:id",
        "POST /api/users",
        "PUT /api/users/:id",
        "PATCH /api/users/:id",
        "DELETE /api/users/:id",
        "GET /api/users/:id/posts",
        "GET /api/posts",
        "GET /api/headers",
        "POST /api/echo",
        "GET /api/status"
      ]
    });
  }

  // ── 12. 404 — Not Found ─────────────────────────────────────────
  else {
    sendError(res, 404, `Endpoint ${method} ${pathname} not found`);
  }
};

// ── Server create aur start ────────────────────────────────────────
const server = http.createServer(requestHandler);

const PORT = 3000;
server.listen(PORT, () => {
  console.log("\n" + "=".repeat(60));
  console.log("📦 JSON API DEMO SERVER");
  console.log("=".repeat(60));
  console.log(`\n✅ Server running at http://localhost:${PORT}\n`);
  console.log("📋 AVAILABLE ENDPOINTS:");
  console.log("\n   🔹 USERS CRUD:");
  console.log("   GET    /api/users              - All users");
  console.log("   GET    /api/users/:id          - Single user");
  console.log("   POST   /api/users              - Create user");
  console.log("   PUT    /api/users/:id          - Full update");
  console.log("   PATCH  /api/users/:id          - Partial update");
  console.log("   DELETE /api/users/:id          - Delete user");
  console.log("\n   🔹 NESTED RESOURCES:");
  console.log("   GET    /api/users/:id/posts    - User's posts");
  console.log("\n   🔹 POSTS:");
  console.log("   GET    /api/posts               - All posts");
  console.log("   GET    /api/posts?userId=1      - Filter by user");
  console.log("   GET    /api/posts?limit=2       - Limit results");
  console.log("\n   🔹 UTILITY:");
  console.log("   GET    /api/headers             - Show headers");
  console.log("   POST   /api/echo                - Echo JSON");
  console.log("   GET    /api/status              - API health");
  console.log("\n📝 TEST WITH CURL:");
  console.log("   curl http://localhost:3000/api/users");
  console.log("   curl -X POST http://localhost:3000/api/users \\");
  console.log("     -H \"Content-Type: application/json\" \\");
  console.log("     -d '{\"name\":\"Test\",\"email\":\"test@example.com\"}'\n");
});

// ======================================================================
// JSON RESPONSE PATTERNS CHEAT SHEET
// ======================================================================
console.log("=".repeat(60));
console.log("📚 JSON RESPONSE PATTERNS CHEAT SHEET");
console.log("=".repeat(60));
console.log(`
🔹 SUCCESS (single):
   {
     "status": "success",
     "user": { "id": 1, "name": "Rahul" }
   }

🔹 SUCCESS (collection):
   {
     "status": "success",
     "count": 2,
     "users": [ { "id": 1 }, { "id": 2 } ]
   }

🔹 SUCCESS (paginated):
   {
     "status": "success",
     "page": 1,
     "limit": 10,
     "total": 100,
     "users": [ ... ]
   }

🔹 CREATED (201):
   {
     "status": "success",
     "message": "User created",
     "user": { "id": 3, "name": "Priya" }
   }

🔹 ERROR (400):
   {
     "error": "Validation failed",
     "details": {
       "email": "Already exists",
       "name": "Required"
     }
   }

🔹 NOT FOUND (404):
   {
     "error": "User with ID 99 not found"
   }

🔹 HEALTH CHECK:
   {
     "status": "healthy",
     "timestamp": "2026-03-04T10:30:00.000Z",
     "uptime": 123.45,
     "endpoints": [ ... ]
   }
`);

// ======================================================================
// STATUS CODES FOR JSON APIS
// ======================================================================
console.log("\n" + "=".repeat(60));
console.log("📋 STATUS CODES FOR JSON APIS");
console.log("=".repeat(60));
console.log(`
200 OK          - Success, data bheja
201 Created     - Naya resource ban gaya
204 No Content  - Success, kuch nahi bhejna (DELETE)
400 Bad Request - Client ne galat data bheja
401 Unauthorized - Login karo pehle
403 Forbidden    - Login to kiya but access nahi
404 Not Found    - Resource nahi mila
409 Conflict     - Duplicate resource (email already exists)
422 Unprocessable - Validation failed
429 Too Many Requests - Rate limit
500 Server Error - Kuch toot gaya
`);

console.log("\n" + "=".repeat(60));
console.log("✅ JSON API EXAMPLES COMPLETE");
console.log("=".repeat(60));
console.log("\n🚀 Server chal raha hai. CTRL+C press karo band karne ke liye.\n");