/**
 * ═══════════════════════════════════════════════════════════════
 *                    REQUEST LOGGING
 * ═══════════════════════════════════════════════════════════════
 *
 * WHAT IS LOGGING?
 * - Logging means recording what is happening in your application.
 * - Every time someone makes a request to your server, you want to
 *   know:
 *   a. What method was used?  (GET, POST, PUT, DELETE)
 *   b. What route was hit?    (/admin/products)
 *   c. What status was returned? (200, 404, 500)
 *   d. How long did it take?  (ms)
 *
 * WITHOUT LOGGING:
 * - You have no idea what requests are coming in.
 * - You cannot debug issues easily.
 * - You cannot track errors in production.
 *
 * WITH LOGGING:
 * - Every request is recorded automatically.
 * - You can see exactly what happened and when.
 * - Helps you find bugs and monitor your app.
 *
 * ───────────────────────────────────────────────────────────────
 *                        MORGAN
 * ───────────────────────────────────────────────────────────────
 *
 * WHAT IS MORGAN?
 * - Morgan is a simple HTTP request logger middleware for Express.
 * - It automatically logs every incoming request to the console.
 * - Install: npm i morgan
 *
 * HOW IT WORKS:
 * - Morgan is added as a middleware using app.use(morgan(...)).
 * - Every time a request hits your server, Morgan logs it before
 *   passing it to your route handler.
 *
 * Request Flow with Morgan:
 *
 * Client Request
 *      ↓
 * Morgan Middleware  ← logs the request automatically
 *      ↓
 * Your Route Handler (home, details, fileUpload, etc.)
 *      ↓
 * Response sent back to Client
 *
 * ───────────────────────────────────────────────────────────────
 *                    MORGAN LOG FORMATS
 * ───────────────────────────────────────────────────────────────
 *
 * Morgan has 5 built-in log formats (tokens):
 *
 * 1. 'tiny' (Simplest):
 *    - Logs: method, url, status, response size, response time
 *    - Output: GET /products 200 1.234 ms
 *
 * 2. 'dev' (Best for Development):
 *    - Logs: method, url, status (colored), response time
 *    - Output: GET /products 200 2.345 ms
 *    - Status colors:
 *      > Green  : 2xx (success)
 *      > Yellow : 3xx (redirect)
 *      > Red    : 4xx and 5xx (errors)
 *
 * 3. 'short':
 *    - Logs: ip, method, url, status, response size, response time
 *    - Output: ::1 GET /products HTTP/1.1 200 - 2.345 ms
 *
 * 4. 'common':
 *    - Logs: ip, date, method, url, status, response size
 *    - Output: ::1 - [Date] "GET /products HTTP/1.1" 200 123
 *
 * 5. 'combined' (Best for Production):
 *    - Logs everything: ip, date, method, url, status,
 *      response size, referrer, user-agent
 *    - Output: ::1 - [Date] "GET /products HTTP/1.1" 200 123
 *             "-" "Mozilla/5.0 ..."
 *
 * ───────────────────────────────────────────────────────────────
 *              SAVING LOGS TO A FILE (Production)
 * ───────────────────────────────────────────────────────────────
 *
 * - In development, logs go to the console.
 * - In production, logs should be saved to a file so you can
 *   review them later.
 *
 * morgan(format, { stream: writeStream })
 * - stream : tells Morgan where to write logs (file instead of console)
 * - flags  : 'a' means append (add to end of file, do not overwrite)
 *
 * ───────────────────────────────────────────────────────────────
 *                 MORGAN vs WINSTON
 * ───────────────────────────────────────────────────────────────
 *
 * ┌──────────────┬────────────────────────────┬──────────────────────────────┐
 * │              │ Morgan                     │ Winston                      │
 * ├──────────────┼────────────────────────────┼──────────────────────────────┤
 * │ Purpose      │ HTTP request logging only  │ General purpose logging      │
 * │ Complexity   │ Simple (beginner friendly) │ Complex (more configuration) │
 * │ Log Levels   │ No                         │ Yes (info, warn, error, etc) │
 * │ Log to File  │ Yes (with fs.createWriteStream) │ Yes (built-in transports) │
 * │ Best For     │ Logging HTTP requests      │ Logging app-level events     │
 * └──────────────┴────────────────────────────┴──────────────────────────────┘
 *
 * Recommendation:
 * - Start with Morgan  → simple, works out of the box.
 * - Use Winston later  → when you need log levels and advanced logging.
 *
 * ═══════════════════════════════════════════════════════════════
 */

// ─── index.js ─────────────────────────────────────────────────────────────────

require('dotenv').config();
require('./config/db');

const express       = require('express');
const morgan        = require('morgan');  // Step 1: require morgan
const fs            = require('fs');
const path          = require('path');
const adminRoute    = require('./routes/admin/adminRoute');
const customerRoute = require('./routes/customer/customerRoute');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

/**
 * Step 2: Setup Morgan
 *
 * DEVELOPMENT: Log to console using 'dev' format
 * - 'dev' format is colored and easy to read in terminal.
 * - Use this while building your app locally.
 */
app.use(morgan('dev'));

/**
 * Step 3: Save logs to file (Production)
 *
 * fs.createWriteStream():
 * - Creates a writable stream to a file.
 * - path.join(__dirname, 'logs', 'access.log') creates path to log file.
 * - { flags: 'a' } means APPEND mode:
 *   > New logs are added to end of file.
 *   > Old logs are never deleted.
 *   > If file doesn't exist, it will be created automatically.
 *
 * morgan('combined', { stream: accessLogStream }):
 * - 'combined' format logs everything including ip and user-agent.
 * - stream tells morgan to write to the file instead of console.
 */
const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'logs', 'access.log'),
    { flags: 'a' }
);
app.use(morgan('combined', { stream: accessLogStream }));

/**
 * Role Based Routing:
 */
app.use('/admin',    adminRoute);
app.use('/customer', customerRoute);

/**
 * Error Handling Middleware:
 */
app.use((err, req, res, next) => {
    console.error('Global Error:', err.message);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});

/**
 * ═══════════════════════════════════════════════════════════════
 *                   WHAT YOU WILL SEE
 * ═══════════════════════════════════════════════════════════════
 *
 * Console Output (morgan 'dev'):
 * ┌─────────────────────────────────────────────────────────────┐
 * │ POST /admin/seed           201  4.231 ms                    │
 * │ GET  /admin/products       200  2.134 ms                    │
 * │ GET  /admin/products?category=electronics  200  1.342 ms    │
 * │ PUT  /admin/product/64abc  200  3.211 ms                    │
 * │ DELETE /admin/product/64abc 200  2.100 ms                   │
 * │ GET  /customer/products    200  1.876 ms                    │
 * │ POST /customer/order       201  5.432 ms                    │
 * │ GET  /wrongroute           404  0.543 ms  ← shown in red    │
 * └─────────────────────────────────────────────────────────────┘
 *
 * File Output (logs/access.log with 'combined' format):
 * ┌─────────────────────────────────────────────────────────────┐
 * │ ::1 - [12/Jan/2025:10:30:00 +0000]                         │
 * │ "POST /admin/seed HTTP/1.1" 201 45                         │
 * │ "-" "PostmanRuntime/7.32.1"                                │
 * │                                                             │
 * │ ::1 - [12/Jan/2025:10:30:05 +0000]                         │
 * │ "GET /admin/products HTTP/1.1" 200 512                     │
 * │ "-" "PostmanRuntime/7.32.1"                                │
 * └─────────────────────────────────────────────────────────────┘
 *
 * ═══════════════════════════════════════════════════════════════
 *                    FOLDER STRUCTURE
 * ═══════════════════════════════════════════════════════════════
 *
 * project/
 * ├── index.js
 * ├── logs/               ← create this folder manually
 * │   └── access.log      ← morgan writes logs here automatically
 * ├── config/
 * │   └── db.js
 * ├── models/
 * │   ├── productModel.js
 * │   └── orderModel.js
 * ├── routes/
 * │   ├── admin/
 * │   │   └── adminRoute.js
 * │   └── customer/
 * │       └── customerRoute.js
 * └── controllers/
 *     ├── adminController.js
 *     └── customerController.js
 *
 * ─────────────────────────────────────────────────────────────
 * IMPORTANT:
 * - Create the logs/ folder manually before running the server.
 * - Otherwise fs.createWriteStream() will throw an error because
 *   the folder does not exist.
 * - Add logs/ to .gitignore so log files are not pushed to GitHub:
 *   logs/
 * ─────────────────────────────────────────────────────────────
 */