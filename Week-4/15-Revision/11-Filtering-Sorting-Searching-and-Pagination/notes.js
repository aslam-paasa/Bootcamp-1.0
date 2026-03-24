/**
 * ═══════════════════════════════════════════════════════════════
 *                        API REFERENCE
 * ═══════════════════════════════════════════════════════════════
 *
 * BASE URL: http://localhost:3000
 *
 * ───────────────────────────────────────────────────────────────
 *                        ADMIN APIs
 * ───────────────────────────────────────────────────────────────
 *
 * ── SEED ────────────────────────────────────────────────────────
 *
 * POST /admin/seed
 * - Deletes all existing products from the database.
 * - Inserts 10 dummy products for testing.
 * - Use this first before testing any other API.
 *
 * ── PRODUCT CRUD ────────────────────────────────────────────────
 *
 * POST /admin/product
 * - Creates a new product and saves it to the database.
 * - Body (JSON):
 *   {
 *     "name"     : "iPhone 15",
 *     "price"    : 999,
 *     "category" : "electronics",
 *     "rating"   : 4.8,
 *     "stock"    : 10
 *   }
 *
 * GET /admin/products
 * - Returns all products from the database.
 * - Supports filtering, searching, sorting and pagination
 *   via query parameters.
 *
 *   Query Parameters:
 *   ┌─────────────┬────────┬─────────┬──────────────────────────────────────┐
 *   │ Param       │ Type   │ Default │ What it does                         │
 *   ├─────────────┼────────┼─────────┼──────────────────────────────────────┤
 *   │ category    │ String │  —      │ Filter by category                   │
 *   │ minPrice    │ Number │  —      │ Filter products with price >= value  │
 *   │ maxPrice    │ Number │  —      │ Filter products with price <= value  │
 *   │ search      │ String │  —      │ Search by name (case-insensitive)    │
 *   │ sortBy      │ String │ price   │ Sort by field (price, rating, etc.)  │
 *   │ order       │ String │ asc     │ asc = low→high, desc = high→low      │
 *   │ page        │ Number │ 1       │ Page number to return                │
 *   │ limit       │ Number │ 5       │ Number of products per page          │
 *   └─────────────┴────────┴─────────┴──────────────────────────────────────┘
 *
 *   Examples:
 *   GET /admin/products
 *   → Returns all products (page 1, limit 5, sorted by price asc)
 *
 *   GET /admin/products?category=electronics
 *   → Returns only electronics products
 *
 *   GET /admin/products?minPrice=100&maxPrice=500
 *   → Returns products where price is between 100 and 500
 *
 *   GET /admin/products?search=mac
 *   → Returns products whose name contains 'mac' (e.g. Macbook Pro)
 *
 *   GET /admin/products?sortBy=price&order=asc
 *   → Returns all products sorted cheapest first
 *
 *   GET /admin/products?sortBy=rating&order=desc
 *   → Returns all products sorted highest rated first
 *
 *   GET /admin/products?page=1&limit=3
 *   → Returns first 3 products (items 1-3)
 *
 *   GET /admin/products?page=2&limit=3
 *   → Returns next 3 products (items 4-6)
 *
 *   GET /admin/products?category=electronics&search=mac&sortBy=price&order=desc&page=1&limit=3
 *   → Filter by electronics + search 'mac' + sort by price desc + page 1 with 3 items
 *
 * PUT /admin/product/:id
 * - Finds product by ID and updates only the fields provided in body.
 * - Body (JSON): pass only the fields you want to update
 *   {
 *     "price" : 799,
 *     "stock" : 20
 *   }
 * - Example: PUT /admin/product/64abc123...
 *
 * DELETE /admin/product/:id
 * - Finds product by ID and permanently deletes it from the database.
 * - Example: DELETE /admin/product/64abc123...
 *
 * ── ORDER MANAGEMENT ────────────────────────────────────────────
 *
 * GET /admin/orders
 * - Returns all orders placed by all customers.
 * - Replaces product ID with full product data (populate).
 * - Supports filtering by status, sorting and pagination.
 *
 *   Query Parameters:
 *   ┌─────────────┬────────┬───────────┬──────────────────────────────────────────────────────┐
 *   │ Param       │ Type   │ Default   │ What it does                                         │
 *   ├─────────────┼────────┼───────────┼──────────────────────────────────────────────────────┤
 *   │ status      │ String │ —         │ Filter by status: pending/shipped/delivered/cancelled │
 *   │ sortBy      │ String │ createdAt │ Sort by field (createdAt, status, etc.)              │
 *   │ order       │ String │ desc      │ asc = oldest first, desc = newest first              │
 *   │ page        │ Number │ 1         │ Page number to return                                │
 *   │ limit       │ Number │ 5         │ Number of orders per page                            │
 *   └─────────────┴────────┴───────────┴──────────────────────────────────────────────────────┘
 *
 *   Examples:
 *   GET /admin/orders
 *   → Returns all orders (newest first, page 1, limit 5)
 *
 *   GET /admin/orders?status=pending
 *   → Returns only pending orders
 *
 *   GET /admin/orders?status=shipped
 *   → Returns only shipped orders
 *
 *   GET /admin/orders?sortBy=createdAt&order=asc
 *   → Returns all orders oldest first
 *
 *   GET /admin/orders?page=1&limit=3
 *   → Returns first 3 orders
 *
 *   GET /admin/orders?status=pending&sortBy=createdAt&order=desc&page=1&limit=3
 *   → Filter pending + newest first + page 1 with 3 items
 *
 * PUT /admin/order/:id
 * - Finds order by ID and updates its status.
 * - Body (JSON):
 *   {
 *     "status": "shipped"
 *   }
 * - Allowed values: pending | shipped | delivered | cancelled
 * - Example: PUT /admin/order/64abc123...
 *
 * ───────────────────────────────────────────────────────────────
 *                       CUSTOMER APIs
 * ───────────────────────────────────────────────────────────────
 *
 * ── PRODUCTS (Read Only) ────────────────────────────────────────
 *
 * GET /customer/products
 * - Returns all IN-STOCK products only (stock > 0).
 * - Customers never see out-of-stock products.
 * - Supports filtering, searching, sorting and pagination.
 *
 *   Query Parameters:
 *   ┌─────────────┬────────┬─────────┬──────────────────────────────────────┐
 *   │ Param       │ Type   │ Default │ What it does                         │
 *   ├─────────────┼────────┼─────────┼──────────────────────────────────────┤
 *   │ category    │ String │  —      │ Filter by category                   │
 *   │ minPrice    │ Number │  —      │ Filter products with price >= value  │
 *   │ maxPrice    │ Number │  —      │ Filter products with price <= value  │
 *   │ search      │ String │  —      │ Search by name (case-insensitive)    │
 *   │ sortBy      │ String │ price   │ Sort by field (price, rating, etc.)  │
 *   │ order       │ String │ asc     │ asc = low→high, desc = high→low      │
 *   │ page        │ Number │ 1       │ Page number to return                │
 *   │ limit       │ Number │ 5       │ Number of products per page          │
 *   └─────────────┴────────┴─────────┴──────────────────────────────────────┘
 *
 *   Examples:
 *   GET /customer/products
 *   → Returns all in-stock products (page 1, limit 5, sorted by price asc)
 *
 *   GET /customer/products?category=fashion
 *   → Returns only in-stock fashion products
 *
 *   GET /customer/products?minPrice=20&maxPrice=100
 *   → Returns in-stock products where price is between 20 and 100
 *
 *   GET /customer/products?search=shoe
 *   → Returns in-stock products whose name contains 'shoe'
 *
 *   GET /customer/products?sortBy=rating&order=desc
 *   → Returns in-stock products sorted highest rated first
 *
 *   GET /customer/products?page=1&limit=3
 *   → Returns first 3 in-stock products
 *
 *   GET /customer/products?category=health&sortBy=rating&order=desc&page=1&limit=2
 *   → Filter health + highest rated first + page 1 with 2 items
 *
 * GET /customer/product/:id
 * - Returns a single product by ID.
 * - Example: GET /customer/product/64abc123...
 *
 * ── ORDER CRUD ──────────────────────────────────────────────────
 *
 * POST /customer/order
 * - Places a new order.
 * - Checks if product exists and has enough stock.
 * - Reduces product stock after order is placed.
 * - Body (JSON):
 *   {
 *     "customerName" : "Mohammad",
 *     "product"      : "64abc123...",  ← product ID from database
 *     "quantity"     : 2
 *   }
 *
 * GET /customer/orders/:customerName
 * - Returns all orders belonging to the given customer.
 * - Replaces product ID with full product data (populate).
 * - Supports filtering by status, sorting and pagination.
 *
 *   Query Parameters:
 *   ┌─────────────┬────────┬───────────┬──────────────────────────────────────────────────────┐
 *   │ Param       │ Type   │ Default   │ What it does                                         │
 *   ├─────────────┼────────┼───────────┼──────────────────────────────────────────────────────┤
 *   │ status      │ String │ —         │ Filter by status: pending/shipped/delivered/cancelled │
 *   │ sortBy      │ String │ createdAt │ Sort by field (createdAt, status, etc.)              │
 *   │ order       │ String │ desc      │ asc = oldest first, desc = newest first              │
 *   │ page        │ Number │ 1         │ Page number to return                                │
 *   │ limit       │ Number │ 5         │ Number of orders per page                            │
 *   └─────────────┴────────┴───────────┴──────────────────────────────────────────────────────┘
 *
 *   Examples:
 *   GET /customer/orders/Mohammad
 *   → Returns all orders placed by Mohammad (newest first)
 *
 *   GET /customer/orders/Mohammad?status=pending
 *   → Returns only Mohammad's pending orders
 *
 *   GET /customer/orders/Mohammad?status=delivered
 *   → Returns only Mohammad's delivered orders
 *
 *   GET /customer/orders/Mohammad?sortBy=createdAt&order=asc
 *   → Returns Mohammad's orders oldest first
 *
 *   GET /customer/orders/Mohammad?page=1&limit=3
 *   → Returns first 3 of Mohammad's orders
 *
 *   GET /customer/orders/Mohammad?status=pending&sortBy=createdAt&order=desc&page=1&limit=3
 *   → Filter pending + newest first + page 1 with 3 items
 *
 * DELETE /customer/order/:id
 * - Cancels an order by ID.
 * - Only orders with status 'pending' can be cancelled.
 * - Restores product stock after cancellation.
 * - Example: DELETE /customer/order/64abc123...
 *
 * ═══════════════════════════════════════════════════════════════
 *                     RESPONSE FORMAT
 * ═══════════════════════════════════════════════════════════════
 *
 * Success Response (List with Pagination):
 * {
 *   "total"       : 10,    ← total matching documents in database
 *   "totalPages"  : 4,     ← total number of pages
 *   "currentPage" : 1,     ← current page number
 *   "limit"       : 3,     ← items per page
 *   "products"    : [...]  ← array of results
 * }
 *
 * Success Response (Single Item):
 * {
 *   "message" : "Product created",
 *   "product" : { ... }
 * }
 *
 * Error Response:
 * {
 *   "message" : "Failed to fetch products",
 *   "error"   : "error details here"
 * }
 *
 * ═══════════════════════════════════════════════════════════════
 *                     HTTP STATUS CODES
 * ═══════════════════════════════════════════════════════════════
 *
 * 200 - OK           : Request successful (GET, PUT, DELETE)
 * 201 - Created      : Resource created successfully (POST)
 * 400 - Bad Request  : Invalid input (e.g. insufficient stock)
 * 404 - Not Found    : Resource not found (wrong ID)
 * 500 - Server Error : Something went wrong on the server
 *
 * ═══════════════════════════════════════════════════════════════
 */