const express = require('express');
const router  = express.Router();
const {
    viewProducts,
    viewProduct,
    placeOrder,
    viewMyOrders,
    cancelOrder
} = require('../../controllers/customerController.js');

/**
 * @swagger
 * /customer/products:
 *   get:
 *     summary: Get all in-stock products
 *     description: >
 *       Returns all products where stock is greater than 0.
 *       Customers never see out-of-stock products.
 *       Supports filtering, searching, sorting and pagination.
 *     tags: [Customer - Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Filter products with price >= value
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Filter products with price <= value
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by product name (case-insensitive)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: price
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: asc = low to high, desc = high to low
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           default: 5
 *         description: Items per page
 *     responses:
 *       200:
 *         description: In-stock products returned successfully
 *       500:
 *         description: Failed to fetch products
 */
router.get('/products', viewProducts);

/**
 * @swagger
 * /customer/product/{id}:
 *   get:
 *     summary: Get a single product
 *     description: Returns a single product by its MongoDB ID.
 *     tags: [Customer - Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Product ID
 *     responses:
 *       200:
 *         description: Product details returned successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Failed to fetch product
 */
router.get('/product/:id', viewProduct);

/**
 * @swagger
 * /customer/order:
 *   post:
 *     summary: Place a new order
 *     description: >
 *       Places a new order for a product.
 *       Checks if product exists and has enough stock.
 *       Reduces product stock after order is placed.
 *     tags: [Customer - Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       400:
 *         description: Insufficient stock
 *       404:
 *         description: Product not found
 *       500:
 *         description: Failed to place order
 */
router.post('/order', placeOrder);

/**
 * @swagger
 * /customer/orders/{customerName}:
 *   get:
 *     summary: Get my orders
 *     description: >
 *       Returns all orders belonging to the given customer.
 *       Supports filtering by status, sorting and pagination.
 *     tags: [Customer - Orders]
 *     parameters:
 *       - in: path
 *         name: customerName
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the customer
 *         example: Mohammad
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, shipped, delivered, cancelled]
 *         description: Filter by order status
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: createdAt
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: asc = oldest first, desc = newest first
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           default: 5
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Customer orders returned successfully
 *       500:
 *         description: Failed to fetch orders
 */
router.get('/orders/:customerName', viewMyOrders);

/**
 * @swagger
 * /customer/order/{id}:
 *   delete:
 *     summary: Cancel an order
 *     description: >
 *       Cancels a pending order by ID.
 *       Only orders with status pending can be cancelled.
 *       Restores product stock after cancellation.
 *     tags: [Customer - Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Order ID
 *     responses:
 *       200:
 *         description: Order cancelled and stock restored
 *       400:
 *         description: Cannot cancel a non-pending order
 *       404:
 *         description: Order not found
 *       500:
 *         description: Failed to cancel order
 */
router.delete('/order/:id', cancelOrder);

module.exports = router;