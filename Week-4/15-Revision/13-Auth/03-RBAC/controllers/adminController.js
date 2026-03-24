const Product = require('../models/productModel');
const Order = require('../models/orderModel');

// ─── SEED ─────────────────────────────────────────────────────────────────────

/**
 * SEED:
 * - POST /admin/seed
 * - Only admin can seed products.
 * - Protected by verifyToken + authorizeRole('admin')
 */
const seedProducts = async (req, res) => {
    try {
        await Product.deleteMany();
        await Product.insertMany([
            { name: 'iPhone 15', price: 999, category: 'electronics', rating: 4.8, stock: 10 },
            { name: 'Samsung TV', price: 499, category: 'electronics', rating: 4.2, stock: 5 },
            { name: 'Nike Shoes', price: 120, category: 'fashion', rating: 4.5, stock: 20 },
            { name: 'Adidas Cap', price: 30, category: 'fashion', rating: 4.0, stock: 50 },
            { name: 'Protein Powder', price: 60, category: 'health', rating: 4.6, stock: 15 },
            { name: 'Yoga Mat', price: 25, category: 'health', rating: 4.3, stock: 30 },
            { name: 'Laptop Stand', price: 45, category: 'electronics', rating: 4.1, stock: 25 },
            { name: 'Water Bottle', price: 15, category: 'health', rating: 3.9, stock: 60 },
            { name: 'Running Shorts', price: 35, category: 'fashion', rating: 4.4, stock: 40 },
            { name: 'Macbook Pro', price: 1999, category: 'electronics', rating: 4.9, stock: 8 },
        ]);
        res.status(201).json({ message: '✅ Products seeded successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Seeding failed', error: err.message });
    }
};

// ─── PRODUCT CRUD (Admin Only) ────────────────────────────────────────────────

/**
 * CREATE Product:
 * - POST /admin/product
 * - Only admin can create products.
 */
const createProduct = async (req, res) => {
    try {
        const { name, price, category, rating, stock } = req.body;
        const product = new Product({ name, price, category, rating, stock });
        await product.save();
        res.status(201).json({ message: 'Product created', product });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create product', error: err.message });
    }
};

/**
 * READ All Products (Admin):
 * - GET /admin/products
 * - Admin sees ALL products regardless of stock.
 * - Supports filtering, searching, sorting and pagination.
 */
const getAllProducts = async (req, res) => {
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

        const filterQuery = {};
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
 * UPDATE Product:
 * - PUT /admin/product/:id
 * - Only admin can update products.
 */
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product updated', product });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update product', error: err.message });
    }
};

/**
 * DELETE Product:
 * - DELETE /admin/product/:id
 * - Only admin can delete products.
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

// ─── ORDER MANAGEMENT (Admin Only) ───────────────────────────────────────────

/**
 * READ All Orders (Admin):
 * - GET /admin/orders
 * - Admin sees ALL orders from ALL customers.
 * - Supports filtering by status, sorting and pagination.
 * - .populate('customer') replaces customerId with user data.
 * - .populate('product')  replaces productId with product data.
 */
const getAllOrders = async (req, res) => {
    try {
        const {
            status,
            sortBy = 'createdAt',
            order = 'desc',
            page = 1,
            limit = 5
        } = req.query;

        const filterQuery = {};
        if (status) filterQuery.status = status;

        const sortOrder = order === 'asc' ? 1 : -1;
        const skip = (Number(page) - 1) * Number(limit);
        const total = await Order.countDocuments(filterQuery);
        const totalPages = Math.ceil(total / Number(limit));

        const orders = await Order
            .find(filterQuery)
            .populate('customer', 'name email')  // only return name and email
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
 * UPDATE Order Status (Admin):
 * - PUT /admin/order/:id
 * - Only admin can update order status.
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
    seedProducts,
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getAllOrders,
    updateOrderStatus
};