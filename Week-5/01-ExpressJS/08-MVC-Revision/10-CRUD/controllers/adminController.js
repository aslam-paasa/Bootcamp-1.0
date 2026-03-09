const Product = require('../../models/productModel');
const Order = require('../../models/orderModel');

/**
 * ─── PRODUCT CRUD (Admin) ────────────────────────────────────────────────────
 */

/**
 * CREATE Product:
 * - Admin adds a new product to the store.
 * - POST /admin/product
 * - Body: { name, price, category, stock }
 */
const createProduct = async (req, res) => {
    try {
        const { name, price, category, stock } = req.body;
        const product = new Product({ name, price, category, stock });
        await product.save();
        res.status(201).json({ message: 'Product created', product });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create product', error: err.message });
    }
};

/**
 * READ All Products:
 * - Admin views all products.
 * - GET /admin/products
 */
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ message: 'All products', products });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch products', error: err.message });
    }
};

/**
 * UPDATE Product:
 * - Admin updates a product by ID.
 * - PUT /admin/product/:id
 * - Body: fields to update { name, price, stock, ... }
 * - { new: true } returns the updated document instead of old one
 */
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product updated', product });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update product', error: err.message });
    }
};

/**
 * DELETE Product:
 * - Admin deletes a product by ID.
 * - DELETE /admin/product/:id
 */
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete product', error: err.message });
    }
};

/**
 * ─── ORDER MANAGEMENT (Admin) ────────────────────────────────────────────────
 */

/**
 * READ All Orders:
 * - Admin views all orders placed by customers.
 * - GET /admin/orders
 * - .populate('product') replaces product ObjectId with actual product data
 */
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('product');
        res.status(200).json({ message: 'All orders', orders });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
    }
};

/**
 * UPDATE Order Status:
 * - Admin updates the status of an order.
 * - PUT /admin/order/:id
 * - Body: { status: 'shipped' }
 */
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ message: 'Order status updated', order });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update order', error: err.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getAllOrders,
    updateOrderStatus
};