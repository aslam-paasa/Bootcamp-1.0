const express = require('express');

require('dotenv').config();
require('./config/db');

/**
 * Importing Role Based Routes:
 */
const adminRoute    = require('./routes/admin/adminRoute');
const customerRoute = require('./routes/customer/customerRoute');

const app = express();
const PORT = process.env.PORT || 3000;


/**
 * Built-in Middleware:
 * - express.json() allows us to read JSON data from req.body
 */
app.use(express.json());


/**
 * Role Based Routing:
 * - app.use(path, router) mounts the router at a specific path (prefix).
 * - path must start with '/' → '/admin', '/customer'
 *
 * How it works:
 * - Any request starting with '/admin'    → handled by adminRoute
 * - Any request starting with '/customer' → handled by customerRoute
 *
 * Examples:
 *   POST /admin/editItem        → adminRoute    → editItem controller
 *   POST /admin/editOrder       → adminRoute    → editOrder controller
 *   GET  /admin/getOrders       → adminRoute    → getOrders controller
 *   GET  /customer/viewProducts → customerRoute → viewProducts controller
 *   POST /customer/placeOrder   → customerRoute → placeOrder controller
 */
app.use('/admin', adminRoute);
app.use('/customer', customerRoute);



/**
 * Error Handling Middleware:
 * - Must always be defined LAST, after all routes.
 * - Must always have 4 parameters: (err, req, res, next)
 * - Express identifies it as error middleware only if it has 4 params.
 */
app.use((err, req, res, next) => {
    console.error('Global Error:', err.message);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
});


/**
 * Port Number:
*/
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});