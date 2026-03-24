require('dotenv').config();
require('./config/db');

/**
 * Importing Role Based Routes:
 */
const express = require('express');
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
 * - All routes starting with '/admin'    → adminRoute
 * - All routes starting with '/customer' → customerRoute
 */
app.use('/admin',    adminRoute);
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