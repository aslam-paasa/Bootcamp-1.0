const Product = require('../../models/productModel');
const Order   = require('../../models/orderModel');

// ─── PRODUCTS (Customer) ──────────────────────────────────────────────────────

/**
 * READ All Products (Customer):
 * ─────────────────────────────────────────────────────────────────────────────
 * Same filtering, searching, sorting and pagination as admin BUT:
 *
 * Key difference from admin:
 * - filterQuery starts with { stock: { $gt: 0 } }
 * - $gt: 0 means "stock greater than 0" → only show IN-STOCK products.
 * - Customer should never see out-of-stock products.
 * - Admin can see ALL products regardless of stock.
 *
 * All other filter, search, sort, paginate logic is identical to admin.
 */
const viewProducts = async (req, res) => {
    try {
        const {
            category,
            minPrice,
            maxPrice,
            search,
            sortBy = 'price',
            order  = 'asc',
            page   = 1,
            limit  = 5
        } = req.query;

        // ── Step 1: Filter + Search Query ─────────────────────────────────────
        // stock: { $gt: 0 } is always present for customers
        const filterQuery = { stock: { $gt: 0 } };

        if (category) {
            filterQuery.category = category;
        }
        if (minPrice || maxPrice) {
            filterQuery.price = {};
            if (minPrice) filterQuery.price.$gte = Number(minPrice);
            if (maxPrice) filterQuery.price.$lte = Number(maxPrice);
        }
        if (search) {
            filterQuery.name = { $regex: search, $options: 'i' };
        }

        // ── Step 2: Sorting ───────────────────────────────────────────────────
        const sortOrder = order === 'asc' ? 1 : -1;

        // ── Step 3: Pagination ────────────────────────────────────────────────
        const skip       = (Number(page) - 1) * Number(limit);
        const total      = await Product.countDocuments(filterQuery);
        const totalPages = Math.ceil(total / Number(limit));

        // ── Step 4: Execute Query ─────────────────────────────────────────────
        const products = await Product
            .find(filterQuery)
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(Number(limit));

        res.status(200).json({
            total,
            totalPages,
            currentPage : Number(page),
            limit       : Number(limit),
            products
        });

    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch products', error: err.message });
    }
};

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

const placeOrder = async (req, res) => {
    try {
        const { customerName, product, quantity } = req.body;

        const foundProduct = await Product.findById(product);
        if (!foundProduct) return res.status(404).json({ message: 'Product not found' });
        if (foundProduct.stock < quantity) {
            return res.status(400).json({ message: 'Insufficient stock' });
        }

        const order = new Order({ customerName, product, quantity });
        await order.save();

        foundProduct.stock -= quantity;
        await foundProduct.save();

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (err) {
        res.status(500).json({ message: 'Failed to place order', error: err.message });
    }
};

/**
 * READ My Orders (Customer):
 * ─────────────────────────────────────────────────────────────────────────────
 * FILTERING:
 * - Always filters by customerName from URL params (:customerName).
 * - Optionally filters by status from query params (?status=pending).
 *
 * filterQuery starts with customerName so customer only sees THEIR orders:
 * filterQuery = { customerName: 'Mohammad' }
 *
 * If status is also provided:
 * filterQuery = { customerName: 'Mohammad', status: 'pending' }
 *
 * SORTING:
 * - Default: newest orders first (createdAt desc).
 *
 * PAGINATION:
 * - Same skip/limit logic.
 */
const viewMyOrders = async (req, res) => {
    try {
        const {
            status,
            sortBy = 'createdAt',
            order  = 'desc',
            page   = 1,
            limit  = 5
        } = req.query;

        // ── Step 1: Filter Query ──────────────────────────────────────────────
        // Always scope orders to this customer only
        const filterQuery = { customerName: req.params.customerName };
        if (status) {
            filterQuery.status = status;
        }

        // ── Step 2: Sorting ───────────────────────────────────────────────────
        const sortOrder = order === 'asc' ? 1 : -1;

        // ── Step 3: Pagination ────────────────────────────────────────────────
        const skip       = (Number(page) - 1) * Number(limit);
        const total      = await Order.countDocuments(filterQuery);
        const totalPages = Math.ceil(total / Number(limit));

        // ── Step 4: Execute Query ─────────────────────────────────────────────
        const orders = await Order
            .find(filterQuery)
            .populate('product')
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(Number(limit));

        res.status(200).json({
            total,
            totalPages,
            currentPage : Number(page),
            limit       : Number(limit),
            orders
        });

    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
    }
};

const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        if (order.status !== 'pending') {
            return res.status(400).json({ message: `Cannot cancel a ${order.status} order` });
        }

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


