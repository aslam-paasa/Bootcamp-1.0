const express = require('express');
const router = express.Router();
const { viewProducts, placeOrder } = require('../../controllers/customerController');

/**
 * Customer Routes:
 * - All routes here are prefixed with '/customer' (defined in index.js).
 * - So the full paths become:
 *   GET  /customer/viewProducts
 *   POST /customer/placeOrder
 */

router.get('/viewProducts', viewProducts);
router.post('/placeOrder', placeOrder);

module.exports = router;