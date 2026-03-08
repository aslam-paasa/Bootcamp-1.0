/**
 * ======================================================================
 * NODE.JS QUERY PARAMETERS — parsing, types, defaults, validation (HINGLISH VERSION)
 * ======================================================================
 *
 * QUERY PARAMETERS KYA HAIN?
 * ──────────────────────────
 * URL mein "?" ke baad key-value pairs jo "&" se separated hote hain.
 * Ye server ko optional data pass karne ke liye use hote hain bina route badle.
 *
 *   /search?q=nodejs&page=2&sort=newest
 *            └─────┘  └────┘  └───────┘
 *            param 1  param 2  param 3
 *
 * ======================================================================
 * KEY CONCEPTS AUR KEYWORDS EXPLAINED (HINGLISH MEIN)
 * ======================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. Query parameters extract karna                                │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: url.parse(req.url, true).query ek plain object return  │
 * │          karta hai jisme saare query parameters hain. true flag │
 * │          required hai — iske bina .query raw string hota hai.   │
 * │                                                                 │
 * │   URL: /?name=Rahul&age=26                                      │
 * │   query → { name: "Rahul", age: "26" }                          │
 * │                                                                 │
 * │   URL: /  (no params)                                           │
 * │   query → {}                                                    │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const { query } = url.parse(req.url, true);                   │
 * │   console.log(query); // { name: "Rahul", age: "26" }           │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 2. Saari values strings hain — convert karo use karne se pehle  │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Har query value string mein aati hai chahe kuch bhi    │
 * │          pass karo. Raw query values par arithmetic concat      │
 * │          karega, add nahi.                                      │
 * │                                                                 │
 * │   query.page + 1            // "21" — string concat  (❌ WRONG) │
 * │   parseInt(query.page) + 1  // 3   — number add      (✅ RIGHT) │
 * │   query.active === "true"   // boolean from string              │
 * │   query.debug === "1"       // boolean from string              │
 * │   query.q || ""             // default empty string             │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const page  = parseInt(query.page)  || 1;                     │
 * │   const limit = parseInt(query.limit) || 10;                    │
 * │   const q     = query.q || "";                                  │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 3. Repeated keys → arrays                                       │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Jab same key ek se zyada baar aati hai, url.parse true │
 * │          ke saath automatically values ko array mein collect    │
 * │          kar leta hai.                                          │
 * │                                                                 │
 * │   URL: ?tag=js&tag=node&tag=express                             │
 * │   query.tag → ["js", "node", "express"]                         │
 * │                                                                 │
 * │   URL: ?tag=js  (single value)                                  │
 * │   query.tag → "js"  (string, array nahi)                        │
 * │                                                                 │
 * │ Hamesha normalise karo agar array expect kar rahe ho:          │
 * │   const tags = [].concat(query.tag || []);                      │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 4. URL encoding — automatic decoding                            │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Browsers special characters ko encode kar dete hain    │
 * │          (spaces → %20, + → %2B). url.parse automatically      │
 * │          decode kar deta hai — aapko original value milta hai.  │
 * │                                                                 │
 * │   URL: ?q=node%20js%20tutorial                                  │
 * │   query.q → "node js tutorial"  (decoded automatically)         │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 5. Query params vs path segments — kab kya use karna?           │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Path segment  → resource identify karta hai  /products/42       │
 * │ Query param   → filter ya modify karta hai    /products?sort=price │
 * │                                                                 │
 * │ Common patterns:                                                │
 * │   ?q=search              search term                            │
 * │   ?page=2&limit=20       pagination                             │
 * │   ?sort=price&order=desc sorting                                │
 * │   ?category=books        filtering                              │
 * │   ?fields=name,email     field selection (sparse fieldsets)     │
 * │   ?debug=true            debug mode on/off                      │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 6. Boolean flags — handle carefully                             │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Flags like ?debug=true, ?admin=1 commonly use karte    │
 * │          hain. Always check string values, not truthiness.      │
 * │                                                                 │
 * │   const debug = query.debug === "true";   // true only if "true"│
 * │   const admin = query.admin === "1";       // true only if "1"  │
 * │   const flag  = query.flag === "1";       // ❌ wrong: query.flag is string "1"
 * │                                                                 │
 * │   // Don't do this:                                             │
 * │   if (query.debug) { ... }  // ❌ "false" bhi truthy hai!       │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 7. Default values — always provide                              │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Jab query parameter missing ho to default value use    │
 * │          karo taake code crash na ho.                           │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const page  = query.page ? parseInt(query.page) : 1;          │
 * │   const limit = query.limit ? parseInt(query.limit) : 20;       │
 * │   const sort  = query.sort || "id";                             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ======================================================================
 * COMPLETE EXAMPLE WITH REAL DATA
 * ======================================================================
 *
 * // E-commerce API with full query parameter support
 * 
 * const products = [
 *   { id: 1, name: "Laptop", price: 50000, category: "electronics", inStock: true, rating: 4.5 },
 *   { id: 2, name: "Phone", price: 30000, category: "electronics", inStock: true, rating: 4.2 },
 *   { id: 3, name: "Shirt", price: 2000, category: "clothing", inStock: true, rating: 4.0 },
 *   { id: 4, name: "Shoes", price: 3000, category: "clothing", inStock: false, rating: 3.8 },
 *   { id: 5, name: "Watch", price: 15000, category: "accessories", inStock: true, rating: 4.3 }
 * ];
 * 
 * const requestHandler = (req, res) => {
 *   const { pathname, query } = url.parse(req.url, true);
 *   
 *   if (pathname === "/api/products") {
 *     let result = [...products];
 *     
 *     // Search
 *     if (query.q) {
 *       const searchTerm = query.q.toLowerCase();
 *       result = result.filter(p => 
 *         p.name.toLowerCase().includes(searchTerm)
 *       );
 *     }
 *     
 *     // Category filter
 *     if (query.category) {
 *       const categories = [].concat(query.category); // array banane ka safe tarika
 *       result = result.filter(p => categories.includes(p.category));
 *     }
 *     
 *     // Price range
 *     if (query.minPrice) {
 *       const min = Number(query.minPrice);
 *       result = result.filter(p => p.price >= min);
 *     }
 *     
 *     if (query.maxPrice) {
 *       const max = Number(query.maxPrice);
 *       result = result.filter(p => p.price <= max);
 *     }
 *     
 *     // Stock filter
 *     if (query.inStock === "true") {
 *       result = result.filter(p => p.inStock);
 *     } else if (query.inStock === "false") {
 *       result = result.filter(p => !p.inStock);
 *     }
 *     
 *     // Sorting
 *     const sortBy = query.sortBy || "id";
 *     const order = query.order === "desc" ? -1 : 1;
 *     
 *     result.sort((a, b) => {
 *       if (a[sortBy] < b[sortBy]) return -order;
 *       if (a[sortBy] > b[sortBy]) return order;
 *       return 0;
 *     });
 *     
 *     // Pagination
 *     const page = parseInt(query.page) || 1;
 *     const limit = parseInt(query.limit) || 10;
 *     const start = (page - 1) * limit;
 *     const paginated = result.slice(start, start + limit);
 *     
 *     // Field selection
 *     let response = paginated;
 *     if (query.fields) {
 *       const fields = query.fields.split(",").map(f => f.trim());
 *       response = paginated.map(p => {
 *         const obj = {};
 *         fields.forEach(f => { if (p[f] !== undefined) obj[f] = p[f]; });
 *         return obj;
 *       });
 *     }
 *     
 *     res.end(JSON.stringify({
 *       page,
 *       limit,
 *       total: result.length,
 *       results: response
 *     }));
 *   }
 * };
 *
 * ======================================================================
 * COMMON MISTAKES (Aksar hone wali galtiyan)
 * ======================================================================
 *
 *   // true flag bhoolna — query raw string rahega
 *   url.parse(req.url).query.name          // ❌ undefined
 *   url.parse(req.url, true).query.name    // ✅ "Rahul"
 *
 *   // String values par arithmetic
 *   query.page + 1                         // ❌ "21"  (string concat)
 *   parseInt(query.page) + 1               // ✅ 3     (number add)
 *
 *   // Repeated key ko hamesha array assume karna
 *   query.tag.map(...)   // ❌ TypeError if single tag (string, not array)
 *   [].concat(query.tag || []).map(...) // ✅ always safe
 *
 *   // Boolean flags galat check karna
 *   if (query.debug) { ... } // ❌ "false" bhi truthy hai
 *   if (query.debug === "true") { ... } // ✅
 *
 *   // parseInt without radix
 *   parseInt(query.page) // ❌ "08" ko 0 de sakta hai
 *   Number(query.page)   // ✅ better
 *   parseInt(query.page, 10) // ✅ with radix
 *
 *   // Default values provide karna bhoolna
 *   const page = query.page; // ❌ undefined ho sakta hai
 *   const page = parseInt(query.page) || 1; // ✅
 *
 * ======================================================================
 * PRACTICAL PATTERNS (Real-life use cases)
 * ======================================================================
 *
 *   // Pagination with validation
 *   let page = Math.max(1, parseInt(query.page) || 1);
 *   let limit = Math.min(100, Math.max(1, parseInt(query.limit) || 20));
 *
 *   // Multiple values as array (normalise)
 *   const categories = [].concat(query.category || []);
 *
 *   // Sort direction
 *   const sortField = query.sortBy || "id";
 *   const sortOrder = query.order === "desc" ? -1 : 1;
 *
 *   // Search with fallback
 *   const searchTerm = query.q ? query.q.toLowerCase() : "";
 *
 *   // Field selection
 *   const fields = query.fields ? query.fields.split(",").map(f => f.trim()) : null;
 *
 *   // Boolean with multiple representations
 *   const isActive = query.active === "true" || query.active === "1";
 *
 * ======================================================================
 */

// ======================================================================
// CODE EXAMPLES — Saare concepts ek saath
// ======================================================================

const http = require("http");
const url = require("url");

// Sample data
const products = [
  { id: 1, name: "Laptop", price: 50000, category: "electronics", inStock: true, rating: 4.5, brand: "Dell" },
  { id: 2, name: "Phone", price: 30000, category: "electronics", inStock: true, rating: 4.2, brand: "Samsung" },
  { id: 3, name: "Tablet", price: 20000, category: "electronics", inStock: false, rating: 4.0, brand: "Apple" },
  { id: 4, name: "Shirt", price: 2000, category: "clothing", inStock: true, rating: 4.0, brand: "Nike" },
  { id: 5, name: "Shoes", price: 3000, category: "clothing", inStock: true, rating: 3.8, brand: "Adidas" },
  { id: 6, name: "Jacket", price: 5000, category: "clothing", inStock: false, rating: 4.3, brand: "Nike" },
  { id: 7, name: "Watch", price: 15000, category: "accessories", inStock: true, rating: 4.3, brand: "Titan" },
  { id: 8, name: "Sunglasses", price: 2500, category: "accessories", inStock: true, rating: 4.1, brand: "RayBan" },
  { id: 9, name: "Backpack", price: 3500, category: "accessories", inStock: true, rating: 4.2, brand: "Wildcraft" }
];

const users = [
  { id: 1, name: "Rahul", email: "rahul@example.com", role: "admin", active: true },
  { id: 2, name: "Priya", email: "priya@example.com", role: "user", active: true },
  { id: 3, name: "Amit", email: "amit@example.com", role: "user", active: false },
  { id: 4, name: "Neha", email: "neha@example.com", role: "editor", active: true },
  { id: 5, name: "Vikram", email: "vikram@example.com", role: "user", active: false }
];

// Helper functions
function sendJSON(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data, null, 2));
}

function sendHTML(res, status, html) {
  res.writeHead(status, { "Content-Type": "text/html" });
  res.end(html);
}

// ── Request handler ────────────────────────────────────────────────
const requestHandler = (req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  const method = req.method;

  console.log(`[${new Date().toISOString()}] ${method} ${pathname}`);
  console.log("📊 Query params:", query);

  // ── Home page with query demo ────────────────────────────────────
  if (pathname === "/") {
    const name = query.name || "Guest";
    const showDebug = query.debug === "true";
    
    let html = `
      <!DOCTYPE html>
      <html>
        <head><title>Query Parameters Demo</title></head>
        <body>
          <h1>🔍 Query Parameters Demo</h1>
          <p>Welcome, <strong>${name}</strong>!</p>
    `;
    
    if (showDebug) {
      html += `<p>Debug mode ON</p>`;
      html += `<pre>Query object: ${JSON.stringify(query, null, 2)}</pre>`;
    }
    
    html += `
          <h2>Try these examples:</h2>
          <ul>
            <li><a href="/?name=Rahul&debug=true">/?name=Rahul&debug=true</a></li>
            <li><a href="/search?q=node&page=2&limit=5">/search?q=node&page=2&limit=5</a></li>
            <li><a href="/products?category=electronics&sortBy=price&order=asc">/products?category=electronics&sortBy=price&order=asc</a></li>
            <li><a href="/products?minPrice=10000&maxPrice=40000&inStock=true">/products?minPrice=10000&maxPrice=40000&inStock=true</a></li>
            <li><a href="/users?role=user&active=true&fields=name,email">/users?role=user&active=true&fields=name,email</a></li>
            <li><a href="/tags?tag=js&tag=node&tag=express">/tags?tag=js&tag=node&tag=express</a></li>
          </ul>
        </body>
      </html>
    `;
    
    sendHTML(res, 200, html);
  }

  // ── GET /search — Search with pagination ─────────────────────────
  else if (pathname === "/search" && method === "GET") {
    // Extract with defaults
    const q = query.q || "";
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const sort = query.sort || "relevance";
    
    // Validate
    const validPage = Math.max(1, page);
    const validLimit = Math.min(100, Math.max(1, limit));
    
    sendJSON(res, 200, {
      message: "Search results",
      params: {
        q,
        page: validPage,
        limit: validLimit,
        sort,
        // Show types
        types: {
          q: typeof q,
          page: typeof validPage,
          limit: typeof validLimit,
          sort: typeof sort
        }
      },
      results: [
        { id: 1, title: `Result 1 for "${q}"` },
        { id: 2, title: `Result 2 for "${q}"` }
      ]
    });
  }

  // ── GET /products — Full filtering, sorting, pagination ──────────
  else if (pathname === "/products" && method === "GET") {
    let result = [...products];
    
    // 1. SEARCH (q parameter)
    if (query.q) {
      const searchTerm = query.q.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.brand.toLowerCase().includes(searchTerm)
      );
    }
    
    // 2. CATEGORY FILTER (single or multiple)
    if (query.category) {
      const categories = [].concat(query.category); // safe array conversion
      result = result.filter(p => categories.includes(p.category));
    }
    
    // 3. BRAND FILTER
    if (query.brand) {
      const brands = [].concat(query.brand);
      result = result.filter(p => brands.includes(p.brand));
    }
    
    // 4. PRICE RANGE
    if (query.minPrice) {
      const min = Number(query.minPrice);
      if (!isNaN(min)) {
        result = result.filter(p => p.price >= min);
      }
    }
    
    if (query.maxPrice) {
      const max = Number(query.maxPrice);
      if (!isNaN(max)) {
        result = result.filter(p => p.price <= max);
      }
    }
    
    // 5. RATING FILTER
    if (query.minRating) {
      const minRating = Number(query.minRating);
      if (!isNaN(minRating)) {
        result = result.filter(p => p.rating >= minRating);
      }
    }
    
    // 6. STOCK FILTER (boolean handling)
    if (query.inStock === "true") {
      result = result.filter(p => p.inStock);
    } else if (query.inStock === "false") {
      result = result.filter(p => !p.inStock);
    }
    
    // 7. SORTING
    const sortBy = query.sortBy || "id";
    const order = query.order === "desc" ? -1 : 1;
    
    // Validate sortBy exists on product
    const validSortFields = ["id", "name", "price", "rating", "brand"];
    const actualSortBy = validSortFields.includes(sortBy) ? sortBy : "id";
    
    result.sort((a, b) => {
      if (a[actualSortBy] < b[actualSortBy]) return -order;
      if (a[actualSortBy] > b[actualSortBy]) return order;
      return 0;
    });
    
    // 8. PAGINATION
    const page = Math.max(1, parseInt(query.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(query.limit) || 10));
    const start = (page - 1) * limit;
    const paginated = result.slice(start, start + limit);
    
    // 9. FIELD SELECTION (sparse fields)
    let finalData = paginated;
    if (query.fields) {
      const fields = query.fields.split(",").map(f => f.trim());
      finalData = paginated.map(p => {
        const obj = {};
        fields.forEach(f => {
          if (p[f] !== undefined) obj[f] = p[f];
        });
        return obj;
      });
    }
    
    // 10. RESPONSE
    sendJSON(res, 200, {
      page,
      limit,
      total: result.length,
      filters: {
        q: query.q || null,
        category: query.category || null,
        brand: query.brand || null,
        minPrice: query.minPrice || null,
        maxPrice: query.maxPrice || null,
        minRating: query.minRating || null,
        inStock: query.inStock || null
      },
      sorting: { sortBy: actualSortBy, order: query.order || "asc" },
      products: finalData
    });
  }

  // ── GET /users — User listing with filters ───────────────────────
  else if (pathname === "/users" && method === "GET") {
    let result = [...users];
    
    // Filter by role
    if (query.role) {
      const roles = [].concat(query.role);
      result = result.filter(u => roles.includes(u.role));
    }
    
    // Filter by active status (boolean)
    if (query.active === "true") {
      result = result.filter(u => u.active);
    } else if (query.active === "false") {
      result = result.filter(u => !u.active);
    }
    
    // Search by name
    if (query.q) {
      const searchTerm = query.q.toLowerCase();
      result = result.filter(u => 
        u.name.toLowerCase().includes(searchTerm) ||
        u.email.toLowerCase().includes(searchTerm)
      );
    }
    
    // Pagination
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const start = (page - 1) * limit;
    
    // Field selection
    let finalData = result.slice(start, start + limit);
    if (query.fields) {
      const fields = query.fields.split(",").map(f => f.trim());
      finalData = finalData.map(u => {
        const obj = {};
        fields.forEach(f => {
          if (u[f] !== undefined) obj[f] = u[f];
        });
        return obj;
      });
    }
    
    sendJSON(res, 200, {
      page,
      limit,
      total: result.length,
      users: finalData
    });
  }

  // ── GET /tags — Multiple values demo ─────────────────────────────
  else if (pathname === "/tags" && method === "GET") {
    // Normalise tags to array (always)
    const tags = [].concat(query.tag || []);
    
    sendJSON(res, 200, {
      message: "Tags received",
      raw: query.tag,
      asArray: tags,
      count: tags.length,
      types: {
        raw: typeof query.tag,
        asArray: Array.isArray(tags) ? "array" : typeof tags
      },
      note: "?tag=js&tag=node&tag=express deta hai array, ?tag=js deta hai string"
    });
  }

  // ── GET /debug — Show parsed query object ────────────────────────
  else if (pathname === "/debug" && method === "GET") {
    sendJSON(res, 200, {
      url: req.url,
      parsedQuery: query,
      queryTypes: Object.fromEntries(
        Object.entries(query).map(([k, v]) => [k, typeof v])
      ),
      note: "Saari values strings hain! Numbers/booleans ke liye convert karo."
    });
  }

  // ── 404 — Not Found ──────────────────────────────────────────────
  else {
    sendHTML(res, 404, `
      <h1>404 - Page Nahin Mili</h1>
      <p>Path: ${pathname}</p>
      <p><a href="/?debug=true">Back to Home with debug</a></p>
    `);
  }
};

// ── Server create aur start ────────────────────────────────────────
const server = http.createServer(requestHandler);

const PORT = 3000;
server.listen(PORT, () => {
  console.log("\n" + "=".repeat(60));
  console.log("🔍 QUERY PARAMETERS DEMO SERVER");
  console.log("=".repeat(60));
  console.log(`\n✅ Server running at http://localhost:${PORT}\n`);
  console.log("📋 QUERY PARAMETER EXAMPLES:");
  console.log("\n   🔹 BASIC USAGE:");
  console.log("   http://localhost:3000/?name=Rahul");
  console.log("   http://localhost:3000/?name=Priya&debug=true");
  console.log("\n   🔹 SEARCH + PAGINATION:");
  console.log("   http://localhost:3000/search?q=node");
  console.log("   http://localhost:3000/search?q=js&page=2&limit=5");
  console.log("\n   🔹 FILTERING (single):");
  console.log("   http://localhost:3000/products?category=electronics");
  console.log("   http://localhost:3000/products?minPrice=10000&maxPrice=40000");
  console.log("\n   🔹 FILTERING (multiple):");
  console.log("   http://localhost:3000/products?category=electronics&category=clothing");
  console.log("   http://localhost:3000/products?brand=Nike&brand=Adidas");
  console.log("\n   🔹 SORTING:");
  console.log("   http://localhost:3000/products?sortBy=price&order=asc");
  console.log("   http://localhost:3000/products?sortBy=rating&order=desc");
  console.log("\n   🔹 BOOLEAN FLAGS:");
  console.log("   http://localhost:3000/products?inStock=true");
  console.log("   http://localhost:3000/users?active=true");
  console.log("\n   🔹 FIELD SELECTION:");
  console.log("   http://localhost:3000/users?fields=name,email,role");
  console.log("   http://localhost:3000/products?fields=id,name,price&limit=3");
  console.log("\n   🔹 MULTIPLE VALUES DEMO:");
  console.log("   http://localhost:3000/tags?tag=js&tag=node&tag=express");
  console.log("\n   🔹 DEBUG MODE:");
  console.log("   http://localhost:3000/debug?name=Rahul&age=25&active=true&tags=js&tags=node\n");
});

// ======================================================================
// QUERY PARAMETER HANDLING CHEAT SHEET
// ======================================================================
console.log("=".repeat(60));
console.log("📚 QUERY PARAMETER HANDLING CHEAT SHEET");
console.log("=".repeat(60));
console.log(`
🔹 EXTRACT:
   const { query } = url.parse(req.url, true);

🔹 STRING -> NUMBER:
   const page = parseInt(query.page) || 1;
   const price = Number(query.price) || 0;

🔹 STRING -> BOOLEAN:
   const debug = query.debug === "true";
   const active = query.active === "1";

🔹 MULTIPLE VALUES (always array):
   const tags = [].concat(query.tag || []);

🔹 DEFAULT VALUES:
   const q = query.q || "";
   const sort = query.sort || "id";

🔹 VALIDATION:
   const page = Math.max(1, parseInt(query.page) || 1);
   const limit = Math.min(100, parseInt(query.limit) || 10);

🔹 FIELD SELECTION:
   const fields = query.fields ? query.fields.split(",").map(f => f.trim()) : null;

🔹 RANGE FILTERS:
   if (query.minPrice) result = result.filter(p => p.price >= Number(query.minPrice));
   if (query.maxPrice) result = result.filter(p => p.price <= Number(query.maxPrice));

🔹 SORTING:
   const sortBy = query.sortBy || "id";
   const order = query.order === "desc" ? -1 : 1;
`);

console.log("\n" + "=".repeat(60));
console.log("✅ QUERY PARAMETERS EXAMPLES COMPLETE");
console.log("=".repeat(60));
console.log("\n🚀 Server chal raha hai. CTRL+C press karo band karne ke liye.\n");