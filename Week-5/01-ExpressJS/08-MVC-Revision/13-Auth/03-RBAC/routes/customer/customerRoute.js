const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');
const authorizeRole = require('../../middlewares/authorizeRole');
const {
    viewProducts,
    viewProduct,
    placeOrder,
    viewMyOrders,
    cancelOrder
} = require('../../controllers/customerController');

/**
 * Customer Routes:
 * - Product routes (GET) are PUBLIC → no token required.
 *   Any visitor can browse products without logging in.
 * - Order routes are PROTECTED → require verifyToken + authorizeRole('customer').
 *   Only logged in customers can place or manage orders.
 *
 * Middleware chain for protected routes:
 * Request → verifyToken → authorizeRole('customer') → controller
 *
 * If admin tries to place an order:
 * - Token is valid → verifyToken passes.
 * - Role is 'admin' not 'customer' → authorizeRole returns 403 Forbidden.
 */

// Public routes (no login required)
router.get('/products', viewProducts);
router.get('/product/:id', viewProduct);

// Protected routes (login required + customer role)
router.post('/order', verifyToken, authorizeRole('customer'), placeOrder);
router.get('/orders', verifyToken, authorizeRole('customer'), viewMyOrders);
router.delete('/order/:id', verifyToken, authorizeRole('customer'), cancelOrder);

module.exports = router;