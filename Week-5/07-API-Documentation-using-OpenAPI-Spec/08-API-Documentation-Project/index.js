require('dotenv').config();
require('./config/db');

const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const { swaggerUi, swaggerSpec } = require('./config/swagger');
const adminRoute = require('./routes/admin/adminRoute.js');
const customerRoute = require('./routes/customer/customerRoute.js');

const app = express();
const PORT = process.env.PORT || 3000;


/**
 * Create logs/ folder automatically if it does not exist:
 * - fs.existsSync() checks if the folder already exists.
 * - fs.mkdirSync()  creates the folder if it does not exist.
 * - { recursive: true } means:
 *   > Create parent folders too if they are missing.
 *   > Do not throw an error if folder already exists.
 * - This must run BEFORE morgan tries to write to access.log,
 *   otherwise fs.createWriteStream() will crash with ENOENT error.
 */
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
    console.log('📁 logs/ folder created automatically');
}

/**
 * Built-in Middleware:
 */
app.use(express.json());

/**
 * Morgan Logging:
 * - 'dev'      : logs to console (development)
 * - 'combined' : logs to file   (production)
 */
app.use(morgan('dev'));

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'logs', 'access.log'),
    { flags: 'a' }
);
app.use(morgan('combined', { stream: accessLogStream }));

/**
 * Swagger UI:
 * - Visit http://localhost:3000/api-docs to see all APIs.
 * - swaggerUi.serve      : serves Swagger static files.
 * - swaggerUi.setup(...) : initializes UI with your API spec.
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * Role Based Routing:
 * - /admin    → adminRoute
 * - /customer → customerRoute
 */
app.use('/admin', adminRoute);
app.use('/customer', customerRoute);

/**
 * Error Handling Middleware:
 * - Must always be defined LAST after all routes.
 * - Must always have 4 parameters (err, req, res, next).
 */
app.use((err, req, res, next) => {
    console.error('Global Error:', err.message);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at port ${PORT}`);
    console.log(`📖 Swagger docs at http://localhost:${PORT}/api-docs`);
});