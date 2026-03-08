/**
 * ======================================================================
 * NODE.JS DYNAMIC ROUTING — path splitting, segment matching, params (HINGLISH VERSION)
 * ======================================================================
 *
 * DYNAMIC ROUTING KYA HAI?
 * ────────────────────────
 * Ek pattern hai URL patterns ko match karne ka, exact strings ke jagah.
 * Har product ke liye alag route likhne ki zaroorat nahi, ek hi pattern
 * sab product IDs handle kar lega:
 *
 *   /products/1   → ek hi handler, productId = "1"
 *   /products/999 → wahi handler, productId = "999"
 *   /products/abc → wahi handler, productId = "abc" (par validate karna)
 *
 * ======================================================================
 * KEY CONCEPTS AUR KEYWORDS EXPLAINED (HINGLISH MEIN)
 * ======================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. pathname.split("/").filter(Boolean) — path segmentation      │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Pathname string ko segments ki array mein split karta  │
 * │          hai, phir leading "/" se bani empty string hata deta hai│
 * │                                                                 │
 * │   "/products/42".split("/")  → ["", "products", "42"]           │
 * │   .filter(Boolean)           → ["products", "42"]               │
 * │                                                                 │
 * │ filter(Boolean) kaise kaam karta hai:                          │
 * │   Boolean("") → false (filter out)                              │
 * │   Boolean("products") → true (keep)                             │
 * │                                                                 │
 * │ Segment index conventions:                                      │
 * │   parts[0] → resource type  ("products", "users", "api")        │
 * │   parts[1] → resource ID    ("42", "abc")                       │
 * │   parts[2] → sub-resource   ("edit", "reviews", "posts")        │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const { pathname } = url.parse(req.url, true);                │
 * │   const parts = pathname.split("/").filter(Boolean);            │
 * │   // /products/42/edit → ["products", "42", "edit"]             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 2. Segment-based route matching (segments ke based pe routing)  │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Pehle parts[0] check karo (resource type), phir        │
 * │          parts[1] (ID exist karta hai?), phir parts[2]          │
 * │          (sub-resource). Hamesha index exist check karo pehle.  │
 * │                                                                 │
 * │   parts[1]             → truthy check (exists + non-empty)      │
 * │   parts[1] && !parts[2] → sirf ID hai, sub-resource nahi       │
 * │   parts[2] === "edit"  → exact match for sub-resource           │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   if (parts[0] === "products") {                                │
 * │     if (!parts[1])                    // GET /products          │
 * │     else if (parts[1] && !parts[2])   // GET /products/:id      │
 * │     else if (parts[2] === "edit")     // GET /products/:id/edit │
 * │   }                                                             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 3. Extracting and validating dynamic parameters                 │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: parts[1] hamesha string hota hai. Use karne se pehle   │
 * │          validate karo — user kuch bhi bhej sakta hai:          │
 * │          "/products/abc", "/products/0", "/products/-1"         │
 * │                                                                 │
 * │   const id = parts[1];                // "42" (string)          │
 * │   const numId = Number(parts[1]);     // 42   (number)          │
 * │                                                                 │
 * │ Validate numeric IDs:                                           │
 * │   if (!/^\d+$/.test(parts[1])) {                               │
 * │     res.writeHead(400);                                         │
 * │     return res.end("Invalid ID — sirf numbers allowed");        │
 * │   }                                                             │
 * │                                                                 │
 * │ Validate UUID format:                                           │
 * │   const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
 * │   if (!uuidRegex.test(parts[1])) {                              │
 * │     res.writeHead(400);                                         │
 * │     return res.end("Invalid UUID format");                      │
 * │   }                                                             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 4. Multiple dynamic segments — nested resources                 │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: parts[3], parts[4] etc bhi use kar sakte ho deeper    │
 * │          nesting ke liye.                                       │
 * │                                                                 │
 * │   /users/42/posts/5/comments/3                                  │
 * │   → ["users", "42", "posts", "5", "comments", "3"]              │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   if (parts[0] === "users" && parts[2] === "posts") {           │
 * │     const userId = parts[1];                                    │
 * │     const postId = parts[3];                                    │
 * │     // /users/42/posts/5 ...                                    │
 * │   }                                                             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 5. Wildcard/optional segments                                   │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Kabhi kabhi last segment optional ho sakta hai.        │
 * │          Jaise /products/42 and /products/42/details dono       │
 * │          handle karne hain.                                     │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   if (parts[0] === "products" && parts[1]) {                    │
 * │     const productId = parts[1];                                 │
 * │     const subResource = parts[2] || "default";                  │
 * │     // /products/42          → subResource = "default"          │
 * │     // /products/42/details  → subResource = "details"          │
 * │   }                                                             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ======================================================================
 * COMPLETE EXAMPLE WITH REAL DATA
 * ======================================================================
 *
 * // E-commerce API with nested resources
 * 
 * const products = [
 *   { id: 1, name: "Laptop", price: 50000 },
 *   { id: 2, name: "Phone", price: 30000 },
 *   { id: 3, name: "Tablet", price: 20000 }
 * ];
 * 
 * const reviews = {
 *   1: [{ id: 1, text: "Good laptop", rating: 5 }],
 *   2: [{ id: 2, text: "Nice phone", rating: 4 }]
 * };
 * 
 * const requestHandler = (req, res) => {
 *   const { pathname } = url.parse(req.url, true);
 *   const parts = pathname.split("/").filter(Boolean);
 *   const method = req.method;
 * 
 *   // /api/products/...
 *   if (parts[0] === "api" && parts[1] === "products") {
 *     
 *     // GET /api/products - all products
 *     if (!parts[2] && method === "GET") {
 *       sendJSON(res, 200, products);
 *     }
 *     
 *     // GET /api/products/:id - single product
 *     else if (parts[2] && !parts[3] && method === "GET") {
 *       const id = Number(parts[2]);
 *       if (isNaN(id)) return sendError(res, 400, "Invalid ID");
 *       
 *       const product = products.find(p => p.id === id);
 *       product ? sendJSON(res, 200, product) 
 *               : sendError(res, 404, "Product not found");
 *     }
 *     
 *     // GET /api/products/:id/reviews - product reviews
 *     else if (parts[2] && parts[3] === "reviews" && method === "GET") {
 *       const id = Number(parts[2]);
 *       const productReviews = reviews[id] || [];
 *       sendJSON(res, 200, productReviews);
 *     }
 *     
 *     // POST /api/products/:id/reviews - add review
 *     else if (parts[2] && parts[3] === "reviews" && method === "POST") {
 *       // handle POST
 *     }
 *     
 *     else {
 *       sendError(res, 404, "Route not found");
 *     }
 *   }
 * };
 *
 * ======================================================================
 * COMMON MISTAKES (Aksar hone wali galtiyan)
 * ======================================================================
 *
 *   // parts[1] access karne se pehle exist check nahi kiya
 *   const id = parts[1];          // ❌ WRONG — undefined agar /products
 *   if (parts[1]) { const id = parts[1]; }  // ✅ RIGHT
 *
 *   // HTTP method ignore karna
 *   if (parts[0] === "products" && parts[1]) { ... }  // ❌ WRONG
 *   if (parts[0] === "products" && parts[1] && method === "GET") { ... } // ✅ RIGHT
 *
 *   // Headers mein typo — browser silently ignore karega
 *   { "Cotent-Type": "text/pain" }   // ❌ WRONG (original bug)
 *   { "Content-Type": "text/plain" } // ✅ RIGHT
 *
 *   // ID ko number mein convert karna bhoolna
 *   const product = products.find(p => p.id === parts[1]); // ❌ string vs number
 *   const product = products.find(p => p.id === Number(parts[1])); // ✅
 *
 *   // Slice vs splice confuse hona
 *   const id = parts.slice(1); // array milega ["42"] ❌
 *   const id = parts[1];       // string milega "42" ✅
 *
 * ======================================================================
 * PRACTICAL PATTERNS (Real-life use cases)
 * ======================================================================
 *
 *   // RESTful API pattern
 *   GET    /users          → list users
 *   POST   /users          → create user
 *   GET    /users/:id      → get user
 *   PUT    /users/:id      → update user
 *   DELETE /users/:id      → delete user
 *   GET    /users/:id/posts → user ke posts
 *
 *   // Nested resources
 *   if (parts[0] === "users" && parts[2] === "posts") {
 *     const userId = parts[1];
 *     const postId = parts[3];
 *     // /users/42/posts/5
 *   }
 *
 *   // Versioned API
 *   if (parts[0] === "api" && parts[1] === "v1") {
 *     // /api/v1/users
 *   } else if (parts[0] === "api" && parts[1] === "v2") {
 *     // /api/v2/users
 *   }
 *
 *   // Optional trailing slash
 *   if (parts[0] === "about" && (!parts[1] || parts[1] === "")) {
 *     // /about ya /about/ dono handle honge
 *   }
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
  { id: 1, name: "Laptop", price: 50000, category: "electronics", inStock: true },
  { id: 2, name: "Phone", price: 30000, category: "electronics", inStock: true },
  { id: 3, name: "Tablet", price: 20000, category: "electronics", inStock: false },
  { id: 4, name: "Shirt", price: 2000, category: "clothing", inStock: true },
  { id: 5, name: "Shoes", price: 3000, category: "clothing", inStock: true },
  { id: 6, name: "Watch", price: 15000, category: "accessories", inStock: true }
];

const users = [
  { id: 1, name: "Rahul", email: "rahul@example.com", role: "admin" },
  { id: 2, name: "Priya", email: "priya@example.com", role: "user" },
  { id: 3, name: "Amit", email: "amit@example.com", role: "user" }
];

const posts = [
  { id: 1, userId: 1, title: "First post", content: "Hello world" },
  { id: 2, userId: 1, title: "Second post", content: "Node.js rocks" },
  { id: 3, userId: 2, title: "Priya's post", content: "Learning JS" }
];

const reviews = {
  1: [
    { id: 1, userId: 2, text: "Great laptop!", rating: 5 },
    { id: 2, userId: 3, text: "Value for money", rating: 4 }
  ],
  2: [
    { id: 3, userId: 1, text: "Good phone", rating: 4 }
  ]
};

// Helper functions
function sendJSON(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data, null, 2));
}

function sendError(res, status, message) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: message }));
}

function sendHTML(res, status, html) {
  res.writeHead(status, { "Content-Type": "text/html" });
  res.end(html);
}

// ── Request handler ────────────────────────────────────────────────
const requestHandler = (req, res) => {
  const { pathname } = url.parse(req.url, true);
  const parts = pathname.split("/").filter(Boolean);
  const method = req.method;

  console.log(`[${new Date().toISOString()}] ${method} ${pathname} → parts:`, parts);

  // ── Home page ────────────────────────────────────────────────────
  if (pathname === "/") {
    sendHTML(res, 200, `
      <!DOCTYPE html>
      <html>
        <head><title>Dynamic Routing Demo</title></head>
        <body>
          <h1>🔄 Dynamic Routing Demo</h1>
          <p>Parts array: <code>${JSON.stringify(parts)}</code></p>
          <h2>Try these routes:</h2>
          <ul>
            <li><a href="/products">/products</a> - All products</li>
            <li><a href="/products/1">/products/1</a> - Product with ID 1</li>
            <li><a href="/products/999">/products/999</a> - Product not found</li>
            <li><a href="/products/2/edit">/products/2/edit</a> - Edit product</li>
            <li><a href="/products/abc">/products/abc</a> - Invalid ID</li>
            <li><a href="/products/1/reviews">/products/1/reviews</a> - Product reviews</li>
            <li><a href="/users">/users</a> - All users</li>
            <li><a href="/users/1">/users/1</a> - User with ID 1</li>
            <li><a href="/users/1/posts">/users/1/posts</a> - User's posts</li>
            <li><a href="/users/1/posts/1">/users/1/posts/1</a> - Specific post</li>
            <li><a href="/api/v1/products">/api/v1/products</a> - API versioning</li>
            <li><a href="/api/v2/products">/api/v2/products</a> - API versioning</li>
          </ul>
        </body>
      </html>
    `);
    return;
  }

  // ── ========== PRODUCTS ROUTES ========== ────────────────────────
  if (parts[0] === "products") {

    // GET /products — all products
    if (!parts[1] && method === "GET") {
      sendJSON(res, 200, products);
    }

    // GET /products/:id — single product
    else if (parts[1] && !parts[2] && method === "GET") {
      // Validate ID - must be numeric
      if (!/^\d+$/.test(parts[1])) {
        return sendError(res, 400, "Invalid product ID — sirf numbers allowed");
      }

      const id = Number(parts[1]);
      const product = products.find(p => p.id === id);

      if (product) {
        sendJSON(res, 200, product);
      } else {
        sendError(res, 404, `Product with ID ${id} not found`);
      }
    }

    // GET /products/:id/edit — edit form
    else if (parts[1] && parts[2] === "edit" && method === "GET") {
      sendHTML(res, 200, `
        <h1>Edit Product ${parts[1]}</h1>
        <form>
          <label>Name: <input type="text" value="Product ${parts[1]}"></label><br>
          <label>Price: <input type="number" value="1000"></label><br>
          <button type="submit">Save</button>
        </form>
        <p><a href="/products/${parts[1]}">Back to product</a></p>
      `);
    }

    // GET /products/:id/reviews — product reviews
    else if (parts[1] && parts[2] === "reviews" && !parts[3] && method === "GET") {
      if (!/^\d+$/.test(parts[1])) {
        return sendError(res, 400, "Invalid product ID");
      }

      const id = Number(parts[1]);
      const product = products.find(p => p.id === id);

      if (!product) {
        return sendError(res, 404, "Product not found");
      }

      const productReviews = reviews[id] || [];
      sendJSON(res, 200, { product: product.name, reviews: productReviews });
    }

    // POST /products/:id/reviews — add review (simulated)
    else if (parts[1] && parts[2] === "reviews" && method === "POST") {
      sendJSON(res, 201, {
        message: "Review added (simulated)",
        productId: parts[1]
      });
    }

    // Route not found under /products
    else {
      sendError(res, 404, "Product route not found");
    }
  }

  // ── ========== USERS ROUTES ========== ───────────────────────────
  else if (parts[0] === "users") {

    // GET /users — all users
    if (!parts[1] && method === "GET") {
      sendJSON(res, 200, users);
    }

    // GET /users/:id — single user
    else if (parts[1] && !parts[2] && method === "GET") {
      if (!/^\d+$/.test(parts[1])) {
        return sendError(res, 400, "Invalid user ID");
      }

      const id = Number(parts[1]);
      const user = users.find(u => u.id === id);

      if (user) {
        sendJSON(res, 200, user);
      } else {
        sendError(res, 404, "User not found");
      }
    }

    // GET /users/:id/posts — user's posts (nested resource)
    else if (parts[1] && parts[2] === "posts" && !parts[3] && method === "GET") {
      if (!/^\d+$/.test(parts[1])) {
        return sendError(res, 400, "Invalid user ID");
      }

      const userId = Number(parts[1]);
      const userPosts = posts.filter(p => p.userId === userId);

      sendJSON(res, 200, {
        userId,
        count: userPosts.length,
        posts: userPosts
      });
    }

    // GET /users/:id/posts/:postId — specific post (nested resource)
    else if (parts[1] && parts[2] === "posts" && parts[3] && method === "GET") {
      if (!/^\d+$/.test(parts[1]) || !/^\d+$/.test(parts[3])) {
        return sendError(res, 400, "Invalid ID format");
      }

      const userId = Number(parts[1]);
      const postId = Number(parts[3]);
      const post = posts.find(p => p.id === postId && p.userId === userId);

      if (post) {
        sendJSON(res, 200, post);
      } else {
        sendError(res, 404, "Post not found");
      }
    }

    else {
      sendError(res, 404, "User route not found");
    }
  }

  // ── ========== API VERSIONING EXAMPLE ========== ─────────────────
  else if (parts[0] === "api" && parts[1] === "v1" && parts[2] === "products") {
    // GET /api/v1/products — API version 1
    sendJSON(res, 200, {
      version: "v1",
      products: products.map(p => ({ id: p.id, name: p.name })) // v1 has only id+name
    });
  }

  else if (parts[0] === "api" && parts[1] === "v2" && parts[2] === "products") {
    // GET /api/v2/products — API version 2 (more fields)
    sendJSON(res, 200, {
      version: "v2",
      products: products // v2 has all fields
    });
  }

  // ── ========== WILDCARD / OPTIONAL SEGMENTS ========== ───────────
  else if (parts[0] === "docs" && (!parts[1] || parts[1] === "getting-started")) {
    // /docs ya /docs/getting-started dono same page
    sendHTML(res, 200, "<h1>Documentation</h1><p>Getting started guide...</p>");
  }

  // ── ========== CATCH-ALL FOR DYNAMIC DEMO ========== ─────────────
  else if (parts[0] === "debug") {
    // /debug/anything — show parsed parts
    sendHTML(res, 200, `
      <h1>Dynamic Routing Debug</h1>
      <p>Full path: ${pathname}</p>
      <p>Parts array: ${JSON.stringify(parts)}</p>
      <p>parts[0]: ${parts[0] || "(empty)"}</p>
      <p>parts[1]: ${parts[1] || "(empty)"}</p>
      <p>parts[2]: ${parts[2] || "(empty)"}</p>
      <p>parts[3]: ${parts[3] || "(empty)"}</p>
    `);
  }

  // ── ========== 404 NOT FOUND ========== ─────────────────────────
  else {
    sendHTML(res, 404, `
      <h1>404 - Route Not Found</h1>
      <p>Path: ${pathname}</p>
      <p>Parts: ${JSON.stringify(parts)}</p>
      <p><a href="/">Back to Home</a></p>
    `);
  }
};

// ── Server create aur start ────────────────────────────────────────
const server = http.createServer(requestHandler);

const PORT = 3000;
server.listen(PORT, () => {
  console.log("\n" + "=".repeat(60));
  console.log("🔄 DYNAMIC ROUTING DEMO SERVER");
  console.log("=".repeat(60));
  console.log(`\n✅ Server running at http://localhost:${PORT}\n`);
  console.log("📋 ROUTE PATTERNS DEMONSTRATED:");
  console.log("   /products              - List all products");
  console.log("   /products/:id          - Single product (with validation)");
  console.log("   /products/:id/edit     - Edit form");
  console.log("   /products/:id/reviews  - Product reviews (nested)");
  console.log("   /users                 - List all users");
  console.log("   /users/:id             - Single user");
  console.log("   /users/:id/posts       - User's posts (nested)");
  console.log("   /users/:id/posts/:pid  - Specific post (double nested)");
  console.log("   /api/v1/products       - API version 1");
  console.log("   /api/v2/products       - API version 2");
  console.log("   /docs or /docs/getting-started - Optional segment");
  console.log("   /debug/anything        - Debug mode (shows parts)\n");
});

// ======================================================================
// ROUTING PATTERNS QUICK REFERENCE
// ======================================================================
console.log("=".repeat(60));
console.log("📚 ROUTING PATTERNS QUICK REFERENCE");
console.log("=".repeat(60));
console.log(`
🔹 EXACT MATCH:
   if (pathname === "/about") { ... }

🔹 STATIC ROUTE:
   if (parts[0] === "products" && !parts[1]) { ... }  // /products

🔹 DYNAMIC ROUTE:
   if (parts[0] === "products" && parts[1] && !parts[2]) { ... }  // /products/:id

🔹 NESTED ROUTE:
   if (parts[0] === "users" && parts[2] === "posts") { ... }  // /users/:id/posts

🔹 API VERSIONING:
   if (parts[0] === "api" && parts[1] === "v1") { ... }  // /api/v1/...

🔹 OPTIONAL SEGMENTS:
   if (parts[0] === "docs" && (!parts[1] || parts[1] === "getting-started")) { ... }

🔹 CATCH-ALL:
   if (parts[0] === "static" && parts[1]) {  // /static/js/app.js
     const filename = parts.slice(1).join("/");
   }
`);

// ======================================================================
// VALIDATION PATTERNS QUICK REFERENCE
// ======================================================================
console.log("\n" + "=".repeat(60));
console.log("🔍 VALIDATION PATTERNS QUICK REFERENCE");
console.log("=".repeat(60));
console.log(`
📌 NUMERIC ID:        /^\\d+$/                      → "42" ✅, "abc" ❌
📌 UUID v4:           /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
📌 SLUG:              /^[a-z0-9-]+$/                → "my-product" ✅
📌 ALPHANUMERIC:      /^[a-zA-Z0-9]+$/              → "Product123" ✅
📌 EMAIL (simple):    /^[^@]+@[^@]+\.[^@]+$/        → "test@example.com" ✅
`);

console.log("\n" + "=".repeat(60));
console.log("✅ DYNAMIC ROUTING EXAMPLES COMPLETE");
console.log("=".repeat(60));
console.log("\n🚀 Server chal raha hai. CTRL+C press karo band karne ke liye.\n");