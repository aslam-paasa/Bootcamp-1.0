const express = require('express');

/**
 * Router Level Middleware:
 * - Instead of handling request at application level [using app.use()],
 *   we will handle at router level using Router.use().
 * */ 
const Router = express.Router();

/**
 * Router Level Middleware:
*/
Router.use((req, res, next) => {
    console.log('Middleware is working fine from router');
});

/**
 * Router Level API:
*/
Router.get('/route', (req, res) => {
    res.status(200).send('Hello from Router');
})

module.exports = Router;