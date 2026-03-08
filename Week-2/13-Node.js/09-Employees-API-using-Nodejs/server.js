/**
 * ======================================================================
 * NODE.JS CRUD API — GET, POST, PUT, DELETE with in-memory store (HINGLISH VERSION)
 * ======================================================================
 *
 * CRUD KYA HAI?
 * ─────────────
 * Chaar operations jo har data-driven API mein chahiye hote hain:
 *
 *   C → CREATE → POST   /employees       → naya employee add karo
 *   R → READ   → GET    /employees       → sabhi employees dekho
 *                GET    /employees/:id   → ek specific employee dekho
 *   U → UPDATE → PUT    /employees/:id   → employee update karo
 *   D → DELETE → DELETE /employees/:id   → employee hatao
 *
 * ======================================================================
 * KEY CONCEPTS AUR KEYWORDS EXPLAINED (HINGLISH MEIN)
 * ======================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. URL splitting for path segments + ID                         │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: url.split("/") ek array banata hai jahan index 0       │
 * │          hamesha empty hota hai (leading slash ki wajah se),    │
 * │          index 1 resource hota hai, index 2 ID hota hai agar    │
 * │          present ho.                                            │
 * │                                                                 │
 * │   "/employees"      → ["", "employees"]          id = undefined │
 * │   "/employees/1"    → ["", "employees", "1"]     id = "1"       │
 * │   "/employees/1/x"  → ["", "employees", "1","x"] id = "1"       │
 * │                                                                 │
 * │ Hamesha parseInt() karo id ko — URL parts strings hote hain,    │
 * │ aur humein numbers chahiye. "1" === 1 false hota hai.           │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const parts = url.split("/");                                 │
 * │   const id    = parts[2] ? parseInt(parts[2]) : null;           │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 2. sendJSON() helper — JSON response bhejne ka helper           │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Har route mein baar-baar writeHead + end likhne se     │
 * │          bachne ke liye helper function. Code clean aur         │
 * │          consistent rehta hai.                                  │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const sendJSON = (status, data) => {                          │
 * │     res.writeHead(status, { "Content-Type": "application/json" });│
 * │     res.end(JSON.stringify(data));                              │
 * │   };                                                            │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 3. Reading a request body (POST / PUT) — body padhna            │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Request body stream ki tarah aata hai — Node "data"    │
 * │          event fire karta hai har chunk ke liye aur "end" event │
 * │          jab saare chunks aa jayein. JSON.parse hamesha         │
 * │          try/catch mein wrap karo; invalid input se server      │
 * │          crash ho sakta hai.                                    │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   let body = "";                                                │
 * │   req.on("data", chunk => { body += chunk.toString(); });       │
 * │   req.on("end", () => {                                         │
 * │     try {                                                       │
 * │       const data = JSON.parse(body);                            │
 * │       // process data                                           │
 * │     } catch {                                                   │
 * │       sendJSON(400, { error: "Invalid JSON" });                 │
 * │     }                                                           │
 * │   });                                                           │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 4. PUT — partial update with spread operator                     │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Spread operator existing fields ko incoming fields ke  │
 * │          saath merge kar deta hai. Sirf wahi fields overwrite   │
 * │          hote hain jo body mein bheje gaye hain; baaki fields   │
 * │          waise hi rehte hain.                                   │
 * │                                                                 │
 * │   employees[index] = { ...employees[index], ...updatedData };   │
 * │                                                                 │
 * │   Pehle: { id: 1, name: "Rahul", role: "dev" }                  │
 * │   Body:   { name: "Rahul Kumar" }                               │
 * │   Baad mein:  { id: 1, name: "Rahul Kumar", role: "dev" }       │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 5. DELETE — splice vs filter                                     │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ splice(index, 1)  → array ko mutate karta hai, removed item     │
 * │                     return karta hai                            │
 * │ filter(...)       → naya array return karta hai, original       │
 * │                     unchanged rehta hai                         │
 * │                                                                 │
 * │ Dono kaam karte hain. splice use kiya yahan kyunki array        │
 * │ mutable hai (let se declare kiya) aur hume deleted record       │
 * │ return karna hai.                                               │
 * │                                                                 │
 * │   const deleted = employees.splice(index, 1)[0];                │
 * │   sendJSON(200, { message: "Employee deleted", employee: deleted }); │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 6. HTTP Methods — Kab kaunsa use karna?                         │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ GET     → Data lena (read-only)                                 │
 * │ POST    → Naya data banana (create)                             │
 * │ PUT     → Poora data replace karna (full update)                │
 * │ PATCH   → Thoda sa data change karna (partial update)           │
 * │ DELETE  → Data hatana                                            │
 * │                                                                 │
 * │ Note: PUT mein poori resource replace hoti hai (missing fields  │
 * │       null ho jayenge). Yahan hum partial update kar rahe hain │
 * │       with spread, jo technically PATCH behavior hai.           │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ======================================================================
 * COMPLETE EXAMPLE WITH REAL DATA
 * ======================================================================
 *
 * // Employee Management API
 * 
 * let employees = [
 *   { id: 1, name: "Rahul", department: "Engineering", salary: 50000 },
 *   { id: 2, name: "Priya", department: "Marketing", salary: 45000 },
 *   { id: 3, name: "Amit", department: "Sales", salary: 40000 }
 * ];
 * 
 * // Helper to find employee by ID
 * const findEmployee = (id) => employees.find(e => e.id === id);
 * const findIndex = (id) => employees.findIndex(e => e.id === id);
 * 
 * // GET all
 * if (method === "GET" && url === "/employees") {
 *   sendJSON(200, employees);
 * }
 * 
 * // GET one
 * else if (method === "GET" && parts[1] === "employees" && id) {
 *   const emp = findEmployee(id);
 *   emp ? sendJSON(200, emp) : sendJSON(404, { error: "Employee not found" });
 * }
 * 
 * // POST create
 * else if (method === "POST" && url === "/employees") {
 *   readBody(newEmp => {
 *     newEmp.id = employees.length + 1;
 *     employees.push(newEmp);
 *     sendJSON(201, { message: "Created", employee: newEmp });
 *   });
 * }
 * 
 * // PUT update
 * else if (method === "PUT" && parts[1] === "employees" && id) {
 *   readBody(updates => {
 *     const index = findIndex(id);
 *     if (index === -1) return sendJSON(404, { error: "Not found" });
 *     
 *     employees[index] = { ...employees[index], ...updates };
 *     sendJSON(200, { message: "Updated", employee: employees[index] });
 *   });
 * }
 * 
 * // DELETE
 * else if (method === "DELETE" && parts[1] === "employees" && id) {
 *   const index = findIndex(id);
 *   if (index === -1) return sendJSON(404, { error: "Not found" });
 *   
 *   const deleted = employees.splice(index, 1)[0];
 *   sendJSON(200, { message: "Deleted", employee: deleted });
 * }
 *
 * ======================================================================
 * CURL COMMANDS FOR TESTING (Testing ke liye commands)
 * ======================================================================
 *
 *   # GET all employees
 *   curl http://localhost:3000/employees
 *
 *   # GET single employee
 *   curl http://localhost:3000/employees/1
 *
 *   # POST create new employee
 *   curl -X POST http://localhost:3000/employees \
 *     -H "Content-Type: application/json" \
 *     -d '{"name": "Neha", "department": "HR", "salary": 42000}'
 *
 *   # PUT update employee (partial)
 *   curl -X PUT http://localhost:3000/employees/1 \
 *     -H "Content-Type: application/json" \
 *     -d '{"name": "Rahul Sharma", "salary": 55000}'
 *
 *   # DELETE employee
 *   curl -X DELETE http://localhost:3000/employees/2
 *
 * ======================================================================
 * COMMON MISTAKES (Aksar hone wali galtiyan)
 * ======================================================================
 *
 *   // ID type mismatch — "1" !== 1
 *   employees.find(e => e.id === parts[2])             // ❌ WRONG
 *   employees.find(e => e.id === parseInt(parts[2]))   // ✅ RIGHT
 *
 *   // JSON.parse bina try/catch — crash on bad input
 *   const data = JSON.parse(body);                     // ❌ WRONG
 *   try { const data = JSON.parse(body); } catch { ... } // ✅ RIGHT
 *
 *   // 200 status bhejna not-found ke liye
 *   sendJSON(200, { message: "Employee nahi mila" });  // ❌ WRONG
 *   sendJSON(404, { error: "Employee nahi mila" });    // ✅ RIGHT
 *
 *   // res.end() bhoolna — client hang rahega
 *   res.writeHead(200); // ❌ WRONG - end() nahi kiya
 *
 *   // JSON.stringify bhoolna
 *   res.end({ id: 1 }); // ❌ "[object Object]"
 *   res.end(JSON.stringify({ id: 1 })); // ✅
 *
 *   // Content-Type header bhoolna
 *   res.writeHead(200); // client confuse hoga
 *   res.writeHead(200, { "Content-Type": "application/json" }); // ✅
 *
 * ======================================================================
 * PRACTICAL PATTERNS (Real-life use cases)
 * ======================================================================
 *
 *   // Pagination
 *   const page = parseInt(query.page) || 1;
 *   const limit = parseInt(query.limit) || 10;
 *   const start = (page - 1) * limit;
 *   const paginated = employees.slice(start, start + limit);
 *   sendJSON(200, {
 *     page,
 *     limit,
 *     total: employees.length,
 *     data: paginated
 *   });
 *
 *   // Filtering
 *   if (query.department) {
 *     result = result.filter(e => e.department === query.department);
 *   }
 *
 *   // Sorting
 *   if (query.sortBy) {
 *     result.sort((a, b) => a[query.sortBy] > b[query.sortBy] ? 1 : -1);
 *   }
 *
 *   // Validation before create/update
 *   if (!newEmp.name) {
 *     return sendJSON(400, { error: "Name is required" });
 *   }
 *
 *   // Check for duplicates
 *   const existing = employees.find(e => e.email === newEmp.email);
 *   if (existing) {
 *     return sendJSON(409, { error: "Email already exists" });
 *   }
 *
 * ======================================================================
 */

// ======================================================================
// CODE EXAMPLES — Saare concepts ek saath
// ======================================================================

const http = require("http");
const url = require("url");

// In-memory data store
let employees = [
  { id: 1, name: "Rahul", department: "Engineering", salary: 50000, email: "rahul@example.com" },
  { id: 2, name: "Priya", department: "Marketing", salary: 45000, email: "priya@example.com" },
  { id: 3, name: "Amit", department: "Sales", salary: 40000, email: "amit@example.com" },
  { id: 4, name: "Neha", department: "HR", salary: 42000, email: "neha@example.com" }
];

let nextId = 5; // For auto-incrementing IDs

// Helper functions
function sendJSON(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data, null, 2));
}

function sendError(res, status, message) {
  sendJSON(res, status, { error: message });
}

function parseBody(req, callback) {
  let body = "";
  req.on("data", chunk => { body += chunk.toString(); });
  req.on("end", () => {
    try {
      const data = JSON.parse(body);
      callback(null, data);
    } catch (err) {
      callback(err);
    }
  });
}

// ── Request handler ────────────────────────────────────────────────
const requestHandler = (req, res) => {
  const { method, url } = req;
  const parts = url.split("/").filter(Boolean); // Remove empty strings
  const id = parts[1] ? parseInt(parts[1]) : null; // /employees/1 → parts[0]="employees", parts[1]="1"

  console.log(`[${new Date().toISOString()}] ${method} ${url}`);

  // ── 1. GET /employees — all employees ─────────────────────────────
  if (method === "GET" && parts[0] === "employees" && !parts[1]) {
    sendJSON(res, 200, {
      count: employees.length,
      employees
    });
  }

  // ── 2. GET /employees/:id — single employee ───────────────────────
  else if (method === "GET" && parts[0] === "employees" && parts[1]) {
    if (isNaN(id)) {
      return sendError(res, 400, "Invalid employee ID");
    }

    const employee = employees.find(e => e.id === id);

    if (employee) {
      sendJSON(res, 200, employee);
    } else {
      sendError(res, 404, `Employee with ID ${id} not found`);
    }
  }

  // ── 3. POST /employees — create new employee ──────────────────────
  else if (method === "POST" && parts[0] === "employees" && !parts[1]) {
    parseBody(req, (err, newEmployee) => {
      if (err) {
        return sendError(res, 400, "Invalid JSON");
      }

      // Validate required fields
      if (!newEmployee.name) {
        return sendError(res, 400, "Name is required");
      }

      // Auto-assign ID
      newEmployee.id = nextId++;

      // Set defaults for optional fields
      newEmployee.department = newEmployee.department || "General";
      newEmployee.salary = newEmployee.salary || 0;

      employees.push(newEmployee);

      // Send response with Location header
      res.writeHead(201, {
        "Content-Type": "application/json",
        "Location": `/employees/${newEmployee.id}`
      });
      res.end(JSON.stringify({
        message: "Employee created",
        employee: newEmployee
      }, null, 2));
    });
  }

  // ── 4. PUT /employees/:id — full update (replace) ─────────────────
  else if (method === "PUT" && parts[0] === "employees" && parts[1]) {
    if (isNaN(id)) {
      return sendError(res, 400, "Invalid employee ID");
    }

    const index = employees.findIndex(e => e.id === id);

    if (index === -1) {
      return sendError(res, 404, `Employee with ID ${id} not found`);
    }

    parseBody(req, (err, updatedData) => {
      if (err) {
        return sendError(res, 400, "Invalid JSON");
      }

      // Validate
      if (!updatedData.name) {
        return sendError(res, 400, "Name is required");
      }

      // Full replace (id preserve karo)
      employees[index] = {
        id,
        name: updatedData.name,
        department: updatedData.department || "General",
        salary: updatedData.salary || 0,
        email: updatedData.email || null
      };

      sendJSON(res, 200, {
        message: "Employee updated (full replace)",
        employee: employees[index]
      });
    });
  }

  // ── 5. PATCH /employees/:id — partial update (like our original PUT) ─
  else if (method === "PATCH" && parts[0] === "employees" && parts[1]) {
    if (isNaN(id)) {
      return sendError(res, 400, "Invalid employee ID");
    }

    const index = employees.findIndex(e => e.id === id);

    if (index === -1) {
      return sendError(res, 404, `Employee with ID ${id} not found`);
    }

    parseBody(req, (err, updates) => {
      if (err) {
        return sendError(res, 400, "Invalid JSON");
      }

      // Partial update — only provided fields change
      employees[index] = { ...employees[index], ...updates, id }; // id preserve karo

      sendJSON(res, 200, {
        message: "Employee updated (partial)",
        employee: employees[index]
      });
    });
  }

  // ── 6. DELETE /employees/:id — delete employee ────────────────────
  else if (method === "DELETE" && parts[0] === "employees" && parts[1]) {
    if (isNaN(id)) {
      return sendError(res, 400, "Invalid employee ID");
    }

    const index = employees.findIndex(e => e.id === id);

    if (index === -1) {
      return sendError(res, 404, `Employee with ID ${id} not found`);
    }

    const deleted = employees.splice(index, 1)[0];

    sendJSON(res, 200, {
      message: "Employee deleted",
      employee: deleted
    });
  }

  // ── 7. GET /employees?department=Engineering — filter by query ───
  else if (method === "GET" && parts[0] === "employees" && !parts[1]) {
    // Query parameters handle karna ho to url.parse use karo
    // Yahan sirf example ke liye basic query handling dikha rahe hain
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;

    let result = [...employees];

    // Filter by department
    if (query.department) {
      result = result.filter(e => e.department === query.department);
    }

    // Filter by min salary
    if (query.minSalary) {
      const min = Number(query.minSalary);
      result = result.filter(e => e.salary >= min);
    }

    // Pagination
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const start = (page - 1) * limit;
    const paginated = result.slice(start, start + limit);

    sendJSON(res, 200, {
      page,
      limit,
      total: result.length,
      employees: paginated
    });
  }

  // ── 8. GET /api-docs — API documentation ──────────────────────────
  else if (method === "GET" && parts[0] === "api-docs") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head><title>Employee API Docs</title></head>
        <body>
          <h1>📋 Employee API Documentation</h1>
          <h2>Endpoints:</h2>
          <ul>
            <li><strong>GET /employees</strong> - All employees</li>
            <li><strong>GET /employees/:id</strong> - Single employee</li>
            <li><strong>POST /employees</strong> - Create employee</li>
            <li><strong>PUT /employees/:id</strong> - Full update</li>
            <li><strong>PATCH /employees/:id</strong> - Partial update</li>
            <li><strong>DELETE /employees/:id</strong> - Delete employee</li>
          </ul>
          <h2>Query Parameters (GET /employees):</h2>
          <ul>
            <li><strong>department</strong> - Filter by department</li>
            <li><strong>minSalary</strong> - Minimum salary filter</li>
            <li><strong>page</strong> - Page number (default: 1)</li>
            <li><strong>limit</strong> - Items per page (default: 10)</li>
          </ul>
          <p><a href="/employees">Try /employees</a></p>
        </body>
      </html>
    `);
  }

  // ── 9. 404 — Route not found ─────────────────────────────────────
  else {
    sendError(res, 404, `Route ${method} ${url} not found`);
  }
};

// ── Server create aur start ────────────────────────────────────────
const server = http.createServer(requestHandler);

const PORT = 3000;
server.listen(PORT, () => {
  console.log("\n" + "=".repeat(60));
  console.log("📦 CRUD API DEMO SERVER");
  console.log("=".repeat(60));
  console.log(`\n✅ Server running at http://localhost:${PORT}\n`);
  console.log("📋 AVAILABLE ENDPOINTS:");
  console.log("\n   🔹 EMPLOYEES CRUD:");
  console.log("   GET    /employees              - All employees");
  console.log("   GET    /employees/:id          - Single employee");
  console.log("   POST   /employees              - Create employee");
  console.log("   PUT    /employees/:id          - Full update");
  console.log("   PATCH  /employees/:id          - Partial update");
  console.log("   DELETE /employees/:id          - Delete employee");
  console.log("\n   🔹 FILTERING & PAGINATION:");
  console.log("   GET    /employees?department=Engineering");
  console.log("   GET    /employees?minSalary=40000");
  console.log("   GET    /employees?page=2&limit=2");
  console.log("   GET    /employees?department=HR&minSalary=40000");
  console.log("\n   🔹 DOCS:");
  console.log("   GET    /api-docs                - API documentation");
  console.log("\n📝 TEST WITH CURL:");
  console.log("   curl http://localhost:3000/employees");
  console.log("   curl http://localhost:3000/employees/1");
  console.log("");
  console.log("   curl -X POST http://localhost:3000/employees \\");
  console.log("     -H \"Content-Type: application/json\" \\");
  console.log("     -d '{\"name\":\"Vikram\",\"department\":\"IT\",\"salary\":60000}'");
  console.log("");
  console.log("   curl -X PUT http://localhost:3000/employees/1 \\");
  console.log("     -H \"Content-Type: application/json\" \\");
  console.log("     -d '{\"name\":\"Rahul Sharma\",\"salary\":55000}'");
  console.log("");
  console.log("   curl -X DELETE http://localhost:3000/employees/2\n");
});

// ======================================================================
// CRUD PATTERNS CHEAT SHEET
// ======================================================================
console.log("=".repeat(60));
console.log("📚 CRUD PATTERNS CHEAT SHEET");
console.log("=".repeat(60));
console.log(`
🔹 GET ALL:
   GET    /resource
   → 200 OK + array

🔹 GET ONE:
   GET    /resource/:id
   → 200 OK + object
   → 404 Not Found

🔹 CREATE:
   POST   /resource
   Body:  { ... }
   → 201 Created + Location header
   → 400 Bad Request

🔹 FULL UPDATE (PUT):
   PUT    /resource/:id
   Body:  { ... } (all fields)
   → 200 OK + updated object
   → 404 Not Found

🔹 PARTIAL UPDATE (PATCH):
   PATCH  /resource/:id
   Body:  { ... } (only changed fields)
   → 200 OK + updated object
   → 404 Not Found

🔹 DELETE:
   DELETE /resource/:id
   → 200 OK + deleted object
   → 404 Not Found

🔹 FILTERING:
   GET    /resource?field=value
   GET    /resource?min=10&max=100

🔹 PAGINATION:
   GET    /resource?page=2&limit=10
   → { page, limit, total, data }
`);

// ======================================================================
// STATUS CODES FOR CRUD APIS
// ======================================================================
console.log("\n" + "=".repeat(60));
console.log("📋 STATUS CODES FOR CRUD APIS");
console.log("=".repeat(60));
console.log(`
200 OK          - GET, PUT, PATCH, DELETE success
201 Created     - POST success (naya resource ban gaya)
204 No Content  - DELETE success (kuch return nahi karna)
400 Bad Request - Client ne galat data bheja
404 Not Found    - Resource nahi mila
409 Conflict     - Duplicate entry (email already exists)
422 Unprocessable - Validation failed
500 Server Error - Kuch toot gaya
`);

console.log("\n" + "=".repeat(60));
console.log("✅ CRUD API EXAMPLES COMPLETE");
console.log("=".repeat(60));
console.log("\n🚀 Server chal raha hai. CTRL+C press karo band karne ke liye.\n");