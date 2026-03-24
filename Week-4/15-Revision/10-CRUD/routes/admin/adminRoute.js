const express = require('express');
const router  = express.Router();
const {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getAllOrders,
    updateOrderStatus
} = require('../../controllers/adminController');

/**
 * Admin Routes:
 * All routes are prefixed with '/admin' (set in index.js)
 *
 * Product CRUD:
 * POST   /admin/product        → Create product
 * GET    /admin/products       → Read all products
 * PUT    /admin/product/:id    → Update product
 * DELETE /admin/product/:id    → Delete product
 *
 * Order Management:
 * GET    /admin/orders         → Read all orders
 * PUT    /admin/order/:id      → Update order status
 */

router.post('/product',       createProduct);
router.get('/products',       getAllProducts);
router.put('/product/:id',    updateProduct);
router.delete('/product/:id', deleteProduct);

router.get('/orders',         getAllOrders);
router.put('/order/:id',      updateOrderStatus);

module.exports = router;