const Product = require('../../models/productModel');
const Order   = require('../../models/orderModel');

/**
 * ─── PRODUCT (Customer) ──────────────────────────────────────────────────────
 */

/**
 * READ All Products:
 * - Customer views all available products.
 * - GET /customer/products
 */
const viewProducts = async (req, res) => {
    try {
        const products = await Product.find({ stock: { $gt: 0 } }); // only in-stock
        res.status(200).json({ message: 'Available products', products });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch products', error: err.message });
    }
};

/**
 * READ Single Product:
 * - Customer views a single product by ID.
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

/**
 * ─── ORDER CRUD (Customer) ───────────────────────────────────────────────────
 */

/**
 * CREATE Order:
 * - Customer places a new order.
 * - POST /customer/order
 * - Body: { customerName, product (productId), quantity }
 */
const placeOrder = async (req, res) => {
    try {
        const { customerName, product, quantity } = req.body;

        // Check if product exists and has enough stock
        const foundProduct = await Product.findById(product);
        if (!foundProduct) return res.status(404).json({ message: 'Product not found' });
        if (foundProduct.stock < quantity) {
            return res.status(400).json({ message: 'Insufficient stock' });
        }

        // Create the order
        const order = new Order({ customerName, product, quantity });
        await order.save();

        // Reduce stock after order is placed
        foundProduct.stock -= quantity;
        await foundProduct.save();

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (err) {
        res.status(500).json({ message: 'Failed to place order', error: err.message });
    }
};

/**
 * READ My Orders:
 * - Customer views their own orders by name.
 * - GET /customer/orders/:customerName
 * - .populate('product') replaces product ObjectId with actual product data
 */
const viewMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            customerName: req.params.customerName
        }).populate('product');
        res.status(200).json({ message: 'Your orders', orders });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
    }
};

/**
 * DELETE Order (Cancel):
 * - Customer cancels their order by ID.
 * - DELETE /customer/order/:id
 * - Stock is restored when order is cancelled
 */
const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        if (order.status !== 'pending') {
            return res.status(400).json({ message: `Cannot cancel a ${order.status} order` });
        }

        // Restore stock before deleting
        await Product.findByIdAndUpdate(order.product, {
            $inc: { stock: order.quantity }  // $inc increments the value
        });

        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Order cancelled and stock restored' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to cancel order', error: err.message });
    }
};

module.exports = { viewProducts, viewProduct, placeOrder, viewMyOrders, cancelOrder };