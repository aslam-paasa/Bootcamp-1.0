const express = require('express');
const router = express.Router();
const {
    viewProducts,
    viewProduct,
    placeOrder,
    viewMyOrders,
    cancelOrder
} = require('../../controllers/customerController');

/**
 * Customer Routes:
 * All routes are prefixed with '/customer' (set in index.js)
 *
 * Products (Read only):
 * GET    /customer/products             → View all in-stock products
 * GET    /customer/product/:id          → View single product
 *
 * Orders:
 * POST   /customer/order                → Place order
 * GET    /customer/orders/:customerName → View my orders
 * DELETE /customer/order/:id            → Cancel order
 */

router.get('/products', viewProducts);
router.get('/product/:id', viewProduct);

router.post('/order', placeOrder);
router.get('/orders/:customerName', viewMyOrders);
router.delete('/order/:id', cancelOrder);

module.exports = router;