const Product = require('../models/productModel');
const Order = require('../models/orderModel');

// ─── PRODUCTS (Customer - Read Only) ─────────────────────────────────────────

/**
 * VIEW All Products (Customer):
 * - GET /customer/products
 * - Customer only sees IN-STOCK products (stock > 0).
 * - Supports filtering, searching, sorting and pagination.
 */
const viewProducts = async (req, res) => {
    try {
        const {
            category,
            minPrice,
            maxPrice,
            search,
            sortBy = 'price',
            order = 'asc',
            page = 1,
            limit = 5
        } = req.query;

        // stock: { $gt: 0 } ensures customer only sees in-stock products
        const filterQuery = { stock: { $gt: 0 } };
        if (category) filterQuery.category = category;
        if (minPrice || maxPrice) filterQuery.price = {};
        if (minPrice) filterQuery.price.$gte = Number(minPrice);
        if (maxPrice) filterQuery.price.$lte = Number(maxPrice);
        if (search) filterQuery.name = { $regex: search, $options: 'i' };

        const sortOrder = order === 'asc' ? 1 : -1;
        const skip = (Number(page) - 1) * Number(limit);
        const total = await Product.countDocuments(filterQuery);
        const totalPages = Math.ceil(total / Number(limit));

        const products = await Product
            .find(filterQuery)
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(Number(limit));

        res.status(200).json({ total, totalPages, currentPage: Number(page), limit: Number(limit), products });

    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch products', error: err.message });
    }
};

/**
 * VIEW Single Product (Customer):
 * - GET /customer/product/:id
 */
const viewProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product details', product });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch product', error: err.message });
    }
};

// ─── ORDERS (Customer) ────────────────────────────────────────────────────────

/**
 * PLACE Order (Customer):
 * - POST /customer/order
 * - Body: { product (productId), quantity }
 *
 * Key difference from old version:
 * - customer field is taken from req.user.userId (decoded from JWT token).
 * - Customer does not manually pass their ID in the body.
 * - This prevents a customer from placing orders as someone else.
 */
const placeOrder = async (req, res) => {
    try {
        const { product, quantity } = req.body;

        // Get customer ID from decoded token (set by verifyToken)
        const customerId = req.user.userId;

        const foundProduct = await Product.findById(product);
        if (!foundProduct) return res.status(404).json({ message: 'Product not found' });
        if (foundProduct.stock < quantity) {
            return res.status(400).json({ message: 'Insufficient stock' });
        }

        const order = new Order({ customer: customerId, product, quantity });
        await order.save();

        // Reduce stock after placing order
        foundProduct.stock -= quantity;
        await foundProduct.save();

        res.status(201).json({ message: 'Order placed successfully', order });

    } catch (err) {
        res.status(500).json({ message: 'Failed to place order', error: err.message });
    }
};

/**
 * VIEW My Orders (Customer):
 * - GET /customer/orders
 * - Customer can only see THEIR OWN orders.
 *
 * Key security point:
 * - customer filter uses req.user.userId from JWT token.
 * - Customer cannot see other customers orders.
 * - Even if they change the URL, the token always identifies them correctly.
 */
const viewMyOrders = async (req, res) => {
    try {
        const {
            status,
            sortBy = 'createdAt',
            order = 'desc',
            page = 1,
            limit = 5
        } = req.query;

        // Always filter by logged in customer's ID from token
        const filterQuery = { customer: req.user.userId };
        if (status) filterQuery.status = status;

        const sortOrder = order === 'asc' ? 1 : -1;
        const skip = (Number(page) - 1) * Number(limit);
        const total = await Order.countDocuments(filterQuery);
        const totalPages = Math.ceil(total / Number(limit));

        const orders = await Order
            .find(filterQuery)
            .populate('product', 'name price')  // only return name and price
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(Number(limit));

        res.status(200).json({ total, totalPages, currentPage: Number(page), limit: Number(limit), orders });

    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
    }
};

/**
 * CANCEL Order (Customer):
 * - DELETE /customer/order/:id
 *
 * Key security point:
 * - Check order.customer.toString() === req.user.userId
 * - Customer can only cancel THEIR OWN orders.
 * - Even if they pass someone else's order ID, it will be rejected.
 */
const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        // Security check: ensure this order belongs to the logged in customer
        if (order.customer.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Access denied. This is not your order.' });
        }

        if (order.status !== 'pending') {
            return res.status(400).json({ message: `Cannot cancel a ${order.status} order` });
        }

        // Restore stock before cancelling
        await Product.findByIdAndUpdate(order.product, {
            $inc: { stock: order.quantity }
        });

        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Order cancelled and stock restored' });

    } catch (err) {
        res.status(500).json({ message: 'Failed to cancel order', error: err.message });
    }
};

module.exports = { viewProducts, viewProduct, placeOrder, viewMyOrders, cancelOrder };