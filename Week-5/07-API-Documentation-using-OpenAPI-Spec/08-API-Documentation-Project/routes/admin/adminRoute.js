const express = require('express');
const router  = express.Router();
const {
    seedProducts,
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getAllOrders,
    updateOrderStatus
} = require('../../controllers/adminController.js');

/**
 * @swagger
 * /admin/seed:
 *   post:
 *     summary: Seed dummy products
 *     description: Deletes all existing products and inserts 10 dummy products for testing.
 *     tags: [Admin - Seed]
 *     responses:
 *       201:
 *         description: Products seeded successfully
 *       500:
 *         description: Seeding failed
 */
router.post('/seed', seedProducts);

/**
 * @swagger
 * /admin/product:
 *   post:
 *     summary: Create a new product
 *     description: Creates a new product and saves it to the database.
 *     tags: [Admin - Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       500:
 *         description: Failed to create product
 */
router.post('/product', createProduct);

/**
 * @swagger
 * /admin/products:
 *   get:
 *     summary: Get all products
 *     description: Returns all products with filtering, searching, sorting and pagination.
 *     tags: [Admin - Products]
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
 *         description: Products returned successfully
 *       500:
 *         description: Failed to fetch products
 */
router.get('/products', getAllProducts);

/**
 * @swagger
 * /admin/product/{id}:
 *   put:
 *     summary: Update a product
 *     description: Finds product by ID and updates only the fields provided in body.
 *     tags: [Admin - Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Failed to update product
 *   delete:
 *     summary: Delete a product
 *     description: Finds product by ID and permanently deletes it from the database.
 *     tags: [Admin - Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Failed to delete product
 */
router.put('/product/:id',    updateProduct);
router.delete('/product/:id', deleteProduct);

/**
 * @swagger
 * /admin/orders:
 *   get:
 *     summary: Get all orders
 *     description: Returns all orders with filtering by status, sorting and pagination.
 *     tags: [Admin - Orders]
 *     parameters:
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
 *         description: Orders returned successfully
 *       500:
 *         description: Failed to fetch orders
 */
router.get('/orders', getAllOrders);

/**
 * @swagger
 * /admin/order/{id}:
 *   put:
 *     summary: Update order status
 *     description: Finds order by ID and updates its status.
 *     tags: [Admin - Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, shipped, delivered, cancelled]
 *                 example: shipped
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Failed to update order
 */
router.put('/order/:id', updateOrderStatus);

module.exports = router;