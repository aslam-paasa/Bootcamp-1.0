const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');
const authorizeRole = require('../../middlewares/authorizeRole');
const {
    seedProducts,
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getAllOrders,
    updateOrderStatus
} = require('../../controllers/adminController');

/**
 * Admin Routes:
 * - ALL routes are protected by verifyToken + authorizeRole('admin').
 * - verifyToken  : checks if JWT token is valid.
 * - authorizeRole: checks if user's role is 'admin'.
 *
 * If a customer tries to access these routes:
 * - Token is valid → verifyToken passes.
 * - Role is 'customer' not 'admin' → authorizeRole returns 403 Forbidden.
 *
 * Middleware chain:
 * Request → verifyToken → authorizeRole('admin') → controller
 */

router.post('/seed', verifyToken, authorizeRole('admin'), seedProducts);

router.post('/product', verifyToken, authorizeRole('admin'), createProduct);
router.get('/products', verifyToken, authorizeRole('admin'), getAllProducts);
router.put('/product/:id', verifyToken, authorizeRole('admin'), updateProduct);
router.delete('/product/:id', verifyToken, authorizeRole('admin'), deleteProduct);

router.get('/orders', verifyToken, authorizeRole('admin'), getAllOrders);
router.put('/order/:id', verifyToken, authorizeRole('admin'), updateOrderStatus);

module.exports = router;