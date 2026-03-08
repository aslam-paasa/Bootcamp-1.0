/**
 * ======================================================================
 * NODE.JS URL MODULE — parsing, routing, query strings (HINGLISH VERSION)
 * ======================================================================
 *
 * url MODULE KYA HAI?
 * ────────────────────────
 * Node ka built-in module jo URL strings ko structured objects mein parse karta hai.
 * http module ke saath use hota hai incoming requests se pathname aur query parameters
 * nikalne ke liye.
 *
 *   const url = require("url");
 *
 * ======================================================================
 * KEY CONCEPTS AUR KEYWORDS EXPLAINED (HINGLISH MEIN)
 * ======================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. url.parse(urlString, parseQueryString)                       │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Raw URL string ko structured object mein todta hai.    │
 * │                                                                 │
 * │ parseQueryString (2nd argument):                                │
 * │   true  → query object ban jata hai  { name: "Rahul", age: "25" }│
 * │   false → query string rehta hai     "name=Rahul&age=25"        │
 * │           Hamesha true pass karo — almost always object chahiye │
 * │                                                                 │
 * │ Parsed object ke properties:                                    │
 * │   pathname → "/about"              (query string ke bina path)  │
 * │   query    → { name: "Rahul" }      (parsed query params)       │
 * │   search   → "?name=Rahul"          (raw query string with ?)   │
 * │   host     → "localhost:3000"                                   │
 * │   protocol → "http:"                                            │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const parsed = url.parse(req.url, true);                      │
 * │   parsed.pathname  // "/about"                                  │
 * │   parsed.query.id  // "42"  (hamesha string — number chahiye to convert)│
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 2. Routing with pathname + method (pathname aur method dono check karo)│
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: pathname AUR req.method dono ko saath mein check karo. │
 * │          Sirf path check karoge to wrong HTTP methods bhi       │
 * │          handlers tak pahunch jayenge (e.g. POST hitting GET route).│
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const { pathname, query } = url.parse(req.url, true);         │
 * │   const { method } = req;                                       │
 * │                                                                 │
 * │   if (pathname === "/" && method === "GET") { ... }              │
 * │   else if (pathname === "/about" && method === "GET") { ... }   │
 * │   else {                                                        │
 * │     res.writeHead(404, { "content-type": "text/plain" });       │
 * │     res.end("404 Not Found");                                   │
 * │   }                                                             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 3. Query parameters                                             │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: URL mein ? ke baad key-value pairs. parseQueryString   │
 * │          = true karne se ye parsed.query par ek plain object    │
 * │          ban jate hain. Sab values strings hain — number chahiye│
 * │          to Number() ya parseInt() use karo.                    │
 * │                                                                 │
 * │   URL: /api/user?id=5&active=true                               │
 * │   parsed.query → { id: "5", active: "true" }                    │
 * │   const id = Number(parsed.query.id); // 5                      │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   if (pathname === "/greet" && method === "GET") {              │
 * │     const name = query.name || "stranger";                      │
 * │     res.writeHead(200, { "content-type": "text/html" });        │
 * │     res.end(`<h1>Namaste, ${name}!</h1>`);                      │
 * │   }                                                             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 4. Request handler alag se define karna                         │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Request handler ko named function ki tarah pehle define│
 * │          karo, phir createServer() mein pass karo. Server wiring│
 * │          aur routing logic alag rehte hain — padhne aur test    │
 * │          karne mein easy.                                       │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const requestHandler = (req, res) => { /* routing * / };      │
 * │   const server = http.createServer(requestHandler);             │
 * │   server.listen(3000);                                          │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 5. url.parse() vs new URL()(modern alternative)                 │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ url.parse() legacy hai but still common in Node codebases.      │
 * │ WHATWG URL API(new URL()) modern standard hai aur Node aur      │
 * │ browser dono mein kaam karta hai.                               │
 * │                                                                 │
 * │   // Legacy (purana tarika)                                     │
 * │   const p = url.parse(req.url, true);                           │
 * │   p.pathname; p.query.name;                                     │
 * │                                                                 │
 * │   // Modern (relative URLs ke liye base chahiye)                │
 * │   const p = new URL(req.url, "http://localhost:3000");          │
 * │   p.pathname;                  // "/about"                      │
 * │   p.searchParams.get("name");  // "Rahul"                       │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 6. URL parts — full breakdown(URL ke hisse)                     │
 * ├─────────────────────────────────────────────────────────────────┤
 * │   URL: https://user:pass@example.com:8080/path/file?q=1#hash    │
 * │                                                                 │
 * │   protocol   → "https:"                                         │
 * │   auth       → "user:pass"                                      │
 * │   hostname   → "example.com"                                    │
 * │   port       → "8080"                                           │
 * │   pathname   → "/path/file"                                     │
 * │   search     → "?q=1"                                           │
 * │   hash       → "#hash"                                          │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 7. new URL().searchParams — modern query handling               │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: WHATWG URL API ke saath query parameters handle karne  │
 * │          ka modern tarika.Map jaisa interface hai.              │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const myUrl = new URL(req.url, "http://localhost:3000");      │
 * │   const name = myUrl.searchParams.get("name");   // "Rahul"     │
 * │   const age = myUrl.searchParams.get("age");     // "25"        │
 * │   myUrl.searchParams.has("active");              // true/false  │
 * │   myUrl.searchParams.append("new", "value");     // add karo    │
 * │   myUrl.searchParams.delete("old");              // hatao       │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ======================================================================
 * COMPLETE EXAMPLE WITH REAL DATA
 * ======================================================================
 *
 * // Products API banate hain with search and filter
 *
 * const http = require("http");
 * const url = require("url");
 * 
 * const products = [
 * { id: 1, name: "Laptop", price: 50000, category: "electronics" },
 * { id: 2, name: "Phone", price: 30000, category: "electronics" },
 * { id: 3, name: "Shirt", price: 2000, category: "clothing" },
 * { id: 4, name: "Shoes", price: 3000, category: "clothing" }
  * ];
 * 
 * const requestHandler = (req, res) => {
 *   const { pathname, query } = url.parse(req.url, true);
 *   const { method } = req;
 * 
 *   // GET /api/products - saare products do
 *   if (pathname === "/api/products" && method === "GET") {
 * let filteredProducts = products;
 *     
 *     // Filter by category if provided
 *     if (query.category) {
 * filteredProducts = products.filter(p => 
 * p.category === query.category
    *       );
 *     }
 *     
 *     // Filter by max price if provided
 *     if (query.maxPrice) {
 *       const maxPrice = Number(query.maxPrice);
 * filteredProducts = filteredProducts.filter(p => 
 * p.price <= maxPrice
      *       );
 *     }
 *     
 *     // Search by name if provided
 *     if (query.search) {
 *       const searchTerm = query.search.toLowerCase();
 * filteredProducts = filteredProducts.filter(p => 
 * p.name.toLowerCase().includes(searchTerm)
        *       );
 *     }
 *     
 * res.writeHead(200, { "content-type": "application/json" });
 * res.end(JSON.stringify(filteredProducts));
 *   }
 *   
 *   // GET /api/products/:id - specific product do
 *   else if (pathname.startsWith("/api/products/") && method === "GET") {
 *     const id = Number(pathname.split("/")[3]);
 *     const product = products.find(p => p.id === id);
 *     
 *     if (product) {
 * res.writeHead(200, { "content-type": "application/json" });
 * res.end(JSON.stringify(product));
 *     } else {
 * res.writeHead(404, { "content-type": "application/json" });
 * res.end(JSON.stringify({ error: "Product nahi mila" }));
 *     }
 *   }
 *   
 *   else {
 * res.writeHead(404, { "content-type": "text/plain" });
 * res.end("404 - Page nahi mili");
 *   }
 * };
 * 
 * ======================================================================
 * COMMON MISTAKES(Aksar hone wali galtiyan)
  * ======================================================================
 *
 *   // parseQueryString=true bhoolna — query string hi reh jayegi
 * url.parse(req.url).query.name    // undefined milega
  * url.parse(req.url, true).query.name // "Rahul" milega ✅
  *
 *   // 200 status bhejna 404 ke liye
 * res.writeHead(200); res.end("Not Found"); // ❌ WRONG status
 * res.writeHead(404); res.end("Not Found"); // ✅ RIGHT
 *
 *   // Sirf pathname check karna — method ignore karna
 *   if (pathname === "/delete") { ... }                       // ❌ WRONG
 *   if (pathname === "/delete" && method === "DELETE") { ... }// ✅ RIGHT
 *
 *   // Query values strings hain — convert karna bhoolna
 *   const id = parsed.query.id;             // "5" (string)
 *   const id = Number(parsed.query.id);     // 5   (number) ✅
 *
 *   // URL parse karte waqt base URL bhoolna (new URL ke saath)
 *   const p = new URL(req.url); // ❌ Error - base required
 *   const p = new URL(req.url, "http://localhost:3000"); // ✅
 *
 * ======================================================================
 * PRACTICAL PATTERNS(Real - life use cases)
  * ======================================================================
 *
 *   // Pagination with query params
 *   const page = Number(query.page) || 1;
 *   const limit = Number(query.limit) || 10;
 *   const start = (page - 1) * limit;
 *   const paginatedData = data.slice(start, start + limit);
 *
 *   // Sorting
 *   const sortBy = query.sortBy || "id";
 *   const sortOrder = query.order === "desc" ? -1 : 1;
 *   const sorted = [...data].sort((a, b) => 
 * a[sortBy] > b[sortBy] ? sortOrder : -sortOrder
      *   );
 *
 *   // Multiple filters
 *   const filters = Object.keys(query).reduce((acc, key) => {
 *     if (key.startsWith("filter_")) {
 *       const field = key.replace("filter_", "");
 * acc[field] = query[key];
 *     }
 *     return acc;
 *   }, {});
 *
 * ======================================================================
 */

// ======================================================================
// CODE EXAMPLES — Saare concepts ek saath
// ======================================================================

const http = require("http");
const url = require("url");

// Sample data
const users = [
  { id: 1, name: "Rahul", email: "rahul@example.com", age: 25 },
  { id: 2, name: "Priya", email: "priya@example.com", age: 28 },
  { id: 3, name: "Amit", email: "amit@example.com", age: 22 },
  { id: 4, name: "Neha", email: "neha@example.com", age: 30 },
  { id: 5, name: "Vikram", email: "vikram@example.com", age: 35 }
];

const products = [
  { id: 1, name: "Laptop", price: 50000, category: "electronics" },
  { id: 2, name: "Phone", price: 30000, category: "electronics" },
  { id: 3, name: "Shirt", price: 2000, category: "clothing" },
  { id: 4, name: "Shoes", price: 3000, category: "clothing" },
  { id: 5, name: "Watch", price: 15000, category: "accessories" },
  { id: 6, name: "Sunglasses", price: 2500, category: "accessories" }
];

// ── Request handler ────────────────────────────────────────────────
const requestHandler = (req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  const { method } = req;

  console.log(`[${new Date().toISOString()}] ${method} ${pathname}`);

  // ── 1. GET / — Home ─────────────────────────────────────────────
  if (pathname === "/" && method === "GET") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head><title>URL Module Demo</title></head>
        <body>
          <h1>🔗 URL Module Demo</h1>
          <p>URL parsing aur routing ke examples:</p>
          <ul>
            <li><a href="/about">/about</a> - Simple page</li>
            <li><a href="/greet?name=Rahul">/greet?name=Rahul</a> - Query params</li>
            <li><a href="/users">/users</a> - All users (JSON)</li>
            <li><a href="/api/user?id=2">/api/user?id=2</a> - Single user</li>
            <li><a href="/products?category=electronics">/products?category=electronics</a> - Filter products</li>
            <li><a href="/search?q=la&page=2&limit=5">/search?q=la&page=2&limit=5</a> - Search with pagination</li>
            <li><a href="/info/https://example.com">/info/https://example.com</a> - Parse external URL</li>
          </ul>
        </body>
      </html>
    `);

    // ── 2. GET /about — Simple about page ───────────────────────────
  } else if (pathname === "/about" && method === "GET") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(`
      <h1>About Page</h1>
      <p>Yeh Node.js URL module ka demonstration hai.</p>
      <p><a href="/">Back to Home</a></p>
    `);

    // ── 3. GET /greet — Query parameters example ────────────────────
  } else if (pathname === "/greet" && method === "GET") {
    const name = query.name || "Stranger";
    const age = query.age ? Number(query.age) : "unknown";

    res.writeHead(200, { "content-type": "text/html" });
    res.end(`
      <h1>Hello, ${name}!</h1>
      <p>Age: ${age}</p>
      <p>Raw query object: ${JSON.stringify(query)}</p>
      <p><a href="/">Back</a></p>
    `);

    // ── 4. GET /users — All users (JSON) ────────────────────────────
  } else if (pathname === "/users" && method === "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(users));

    // ── 5. GET /api/user — Single user with query param ─────────────
  } else if (pathname === "/api/user" && method === "GET") {
    const id = Number(query.id);

    if (!id) {
      res.writeHead(400, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "id parameter chahiye" }));
      return;
    }

    const user = users.find(u => u.id === id);

    if (user) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "User nahi mila" }));
    }

    // ── 6. GET /users/:id — Dynamic routing with path parameter ─────
  } else if (pathname.startsWith("/users/") && method === "GET") {
    const id = Number(pathname.split("/")[2]);

    if (isNaN(id)) {
      res.writeHead(400, { "content-type": "text/plain" });
      res.end("Invalid user ID");
      return;
    }

    const user = users.find(u => u.id === id);

    if (user) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { "content-type": "text/html" });
      res.end(`<h1>User with ID ${id} nahi mila</h1>`);
    }

    // ── 7. GET /products — Filtering with multiple query params ─────
  } else if (pathname === "/products" && method === "GET") {
    let filteredProducts = [...products];

    // Filter by category
    if (query.category) {
      filteredProducts = filteredProducts.filter(p =>
        p.category === query.category
      );
    }

    // Filter by max price
    if (query.maxPrice) {
      const maxPrice = Number(query.maxPrice);
      filteredProducts = filteredProducts.filter(p =>
        p.price <= maxPrice
      );
    }

    // Filter by min price
    if (query.minPrice) {
      const minPrice = Number(query.minPrice);
      filteredProducts = filteredProducts.filter(p =>
        p.price >= minPrice
      );
    }

    // Search in name
    if (query.search) {
      const searchTerm = query.search.toLowerCase();
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm)
      );
    }

    // Pagination
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const start = (page - 1) * limit;
    const paginatedProducts = filteredProducts.slice(start, start + limit);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({
      page,
      limit,
      total: filteredProducts.length,
      results: paginatedProducts
    }));

    // ── 8. GET /search — Complex query parsing example ──────────────
  } else if (pathname === "/search" && method === "GET") {
    // Parse all query parameters
    const searchParams = {
      q: query.q || "",
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
      sortBy: query.sortBy || "name",
      order: query.order || "asc",
      filters: {}
    };

    // Extract dynamic filters (fields starting with filter_)
    Object.keys(query).forEach(key => {
      if (key.startsWith("filter_")) {
        const field = key.replace("filter_", "");
        searchParams.filters[field] = query[key];
      }
    });

    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({
      message: "Search parameters parsed",
      searchParams,
      rawQuery: query
    }));

    // ── 9. GET /parse — URL parsing demo with new URL() ─────────────
  } else if (pathname === "/parse" && method === "GET") {
    const demoUrl = "https://user:pass@example.com:8080/path/file?q=1&page=2#section";

    try {
      const parsed = new URL(demoUrl);

      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({
        message: "URL parsed with WHATWG URL API",
        url: demoUrl,
        parsed: {
          href: parsed.href,
          protocol: parsed.protocol,
          username: parsed.username,
          password: parsed.password,
          host: parsed.host,
          hostname: parsed.hostname,
          port: parsed.port,
          pathname: parsed.pathname,
          search: parsed.search,
          hash: parsed.hash,
          origin: parsed.origin,
          searchParams: Object.fromEntries(parsed.searchParams)
        }
      }, null, 2));
    } catch (err) {
      res.writeHead(400, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid URL" }));
    }

    // ── 10. GET /info/* — Parse any external URL ────────────────────
  } else if (pathname.startsWith("/info/") && method === "GET") {
    const externalUrl = pathname.slice(6); // Remove '/info/'

    try {
      const parsed = new URL(externalUrl);

      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({
        message: "External URL parsed",
        original: externalUrl,
        parsed: {
          protocol: parsed.protocol,
          hostname: parsed.hostname,
          port: parsed.port,
          pathname: parsed.pathname,
          search: parsed.search,
          hash: parsed.hash,
          searchParams: Object.fromEntries(parsed.searchParams)
        }
      }, null, 2));
    } catch (err) {
      res.writeHead(400, { "content-type": "application/json" });
      res.end(JSON.stringify({
        error: "Invalid URL",
        message: "Please provide a valid URL like: /info/https://example.com"
      }));
    }

    // ── 11. 404 — Route not found ───────────────────────────────────
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end(`
      <h1>404 - Page Nahin Mili</h1>
      <p>The path "${pathname}" does not exist.</p>
      <p><a href="/">Back to Home</a></p>
    `);
  }
};

// ── Server create aur start ────────────────────────────────────────
const server = http.createServer(requestHandler);

const PORT = 3000;
server.listen(PORT, () => {
  console.log("\n" + "=".repeat(60));
  console.log("🚀 URL MODULE DEMO SERVER");
  console.log("=".repeat(60));
  console.log(`\n✅ Server running at http://localhost:${PORT}\n`);
  console.log("📋 TRY THESE URLS:");
  console.log("   http://localhost:3000/");
  console.log("   http://localhost:3000/greet?name=Rahul&age=25");
  console.log("   http://localhost:3000/users");
  console.log("   http://localhost:3000/api/user?id=3");
  console.log("   http://localhost:3000/users/2");
  console.log("   http://localhost:3000/products?category=electronics&maxPrice=40000");
  console.log("   http://localhost:3000/products?search=ph&minPrice=20000");
  console.log("   http://localhost:3000/search?q=laptop&page=2&limit=5&filter_category=electronics");
  console.log("   http://localhost:3000/parse");
  console.log("   http://localhost:3000/info/https://github.com/facebook/react\n");
});

// ======================================================================
// URL METHODS QUICK REFERENCE
// ======================================================================
console.log("=".repeat(60));
console.log("📚 URL MODULE METHODS QUICK REFERENCE");
console.log("=".repeat(60));
console.log(`
🔧 LEGACY METHODS (url.parse):
   url.parse(urlString, parseQueryString)
   url.format(urlObject)
   url.resolve(from, to)

🔧 MODERN WHATWG API (new URL()):
   new URL(urlString, base)
   url.searchParams.get(key)
   url.searchParams.set(key, value)
   url.searchParams.has(key)
   url.searchParams.append(key, value)
   url.searchParams.delete(key)
   url.searchParams.forEach(callback)

🔧 URL Object Properties:
   href, protocol, hostname, port, pathname
   search, hash, username, password, origin
`);

// ======================================================================
// URL EXAMPLES WITH OUTPUT
// ======================================================================
console.log("\n" + "=".repeat(60));
console.log("📝 URL PARSING EXAMPLES");
console.log("=".repeat(60));

const exampleUrls = [
  "https://user:pass@api.example.com:8080/users?page=2&limit=10#top",
  "http://localhost:3000/products?category=electronics&sort=price",
  "/search?q=node.js&lang=en&page=3"
];

exampleUrls.forEach((exampleUrl, index) => {
  console.log(`\n${index + 1}. URL: ${exampleUrl}`);

  try {
    // For relative URLs, we need a base
    const base = "http://localhost:3000";
    const fullUrl = exampleUrl.startsWith("http") ? exampleUrl : base + exampleUrl;
    const parsed = new URL(fullUrl);

    console.log("   Protocol:", parsed.protocol);
    console.log("   Hostname:", parsed.hostname);
    console.log("   Port:", parsed.port || "(default)");
    console.log("   Pathname:", parsed.pathname);
    console.log("   Search Params:", Object.fromEntries(parsed.searchParams));
    console.log("   Hash:", parsed.hash || "(none)");
  } catch (err) {
    console.log("   Error parsing:", err.message);
  }
});

console.log("\n" + "=".repeat(60));
console.log("✅ URL MODULE EXAMPLES COMPLETE");
console.log("=".repeat(60));
console.log("\n🚀 Server chal raha hai. CTRL+C press karo band karne ke liye.\n");