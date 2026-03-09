const Product = require('../../models/productModel');
const Order   = require('../../models/orderModel');

// ─── SEED ────────────────────────────────────────────────────────────────────

const seedProducts = async (req, res) => {
    try {
        await Product.deleteMany();
        await Product.insertMany([
            { name: 'iPhone 15',      price: 999,  category: 'electronics', rating: 4.8, stock: 10 },
            { name: 'Samsung TV',     price: 499,  category: 'electronics', rating: 4.2, stock: 5  },
            { name: 'Nike Shoes',     price: 120,  category: 'fashion',     rating: 4.5, stock: 20 },
            { name: 'Adidas Cap',     price: 30,   category: 'fashion',     rating: 4.0, stock: 50 },
            { name: 'Protein Powder', price: 60,   category: 'health',      rating: 4.6, stock: 15 },
            { name: 'Yoga Mat',       price: 25,   category: 'health',      rating: 4.3, stock: 30 },
            { name: 'Laptop Stand',   price: 45,   category: 'electronics', rating: 4.1, stock: 25 },
            { name: 'Water Bottle',   price: 15,   category: 'health',      rating: 3.9, stock: 60 },
            { name: 'Running Shorts', price: 35,   category: 'fashion',     rating: 4.4, stock: 40 },
            { name: 'Macbook Pro',    price: 1999, category: 'electronics', rating: 4.9, stock: 8  },
        ]);
        res.status(201).json({ message: '✅ Products seeded successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Seeding failed', error: err.message });
    }
};

// ─── PRODUCT CRUD ─────────────────────────────────────────────────────────────

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
 * ─────────────────────────────────────────────────────────────────────────────
 * This single API handles FILTERING, SEARCHING, SORTING and PAGINATION
 * all at once using query parameters from the URL.
 *
 * WHAT ARE QUERY PARAMETERS?
 * - Everything after '?' in a URL is a query parameter.
 * - Multiple params are joined with '&'.
 * - They are accessed in Express via req.query.
 * - Example URL:
 *   /admin/products?category=electronics&search=mac&sortBy=price&order=desc&page=1&limit=3
 *                   |                    |            |                   |
 *                   FILTERING            SEARCHING    SORTING            PAGINATION
 *
 * - console.log(req.query) gives:
 *   {
 *     category: 'electronics',
 *     search: 'mac',
 *     sortBy: 'price',
 *     order: 'desc',
 *     page: '1',       ← Note: always comes as STRING, convert to Number
 *     limit: '3'       ← Note: always comes as STRING, convert to Number
 *   }
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * STEP 1 - FILTERING:
 * - Return only products that match a specific condition.
 * - We build a filterQuery object and pass it to Product.find(filterQuery).
 * - filterQuery = {} means no filter → returns everything.
 *
 * MongoDB Comparison Operators:
 * - $gte : greater than or equal  (>=)  → { price: { $gte: 100 } }
 * - $lte : less than or equal     (<=)  → { price: { $lte: 500 } }
 * - $gt  : greater than           (>)   → { stock: { $gt: 0 } }
 * - $lt  : less than              (<)   → { price: { $lt: 50 } }
 *
 * Example filterQuery built from URL params:
 * ?category=electronics&minPrice=100&maxPrice=500
 * filterQuery = {
 *   category: 'electronics',
 *   price: { $gte: 100, $lte: 500 }
 * }
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * STEP 2 - SEARCHING:
 * - Find products where name CONTAINS the search keyword.
 * - We use $regex (Regular Expression) to match patterns inside strings.
 * - $options: 'i' means case-insensitive.
 *
 * Example:
 * ?search=phone
 * filterQuery.name = { $regex: 'phone', $options: 'i' }
 * → matches 'iPhone', 'PHONE', 'phone 15' etc.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * STEP 3 - SORTING:
 * - Order results by a field in ascending or descending order.
 * - .sort({ field: 1 })  → ascending  (low to high, A→Z)
 * - .sort({ field: -1 }) → descending (high to low, Z→A)
 *
 * sortOrder = order === 'asc' ? 1 : -1
 * - If order is 'asc'  → sortOrder = 1  (ascending)
 * - If order is 'desc' → sortOrder = -1 (descending)
 *
 * [sortBy] is computed property name:
 * - sortBy = 'price' → .sort({ price: 1 })
 * - sortBy = 'rating' → .sort({ rating: -1 })
 *
 * Example:
 * ?sortBy=price&order=asc  → cheapest first
 * ?sortBy=rating&order=desc → highest rated first
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * STEP 4 - PAGINATION:
 * - Instead of returning ALL records at once, return a small chunk (page).
 * - page  : which page you want     (default: 1)
 * - limit : how many items per page (default: 5)
 * - skip  : how many items to skip  = (page - 1) * limit
 *
 * How skip works:
 * - page=1, limit=3 → skip = (1-1) * 3 = 0  → return items 1,2,3
 * - page=2, limit=3 → skip = (2-1) * 3 = 3  → return items 4,5,6
 * - page=3, limit=3 → skip = (3-1) * 3 = 6  → return items 7,8,9
 *
 * totalPages = Math.ceil(total / limit)
 * - Math.ceil rounds UP to nearest whole number.
 * - 10 products / 3 per page = 3.33 → ceil → 4 pages
 *
 * countDocuments(filterQuery):
 * - Counts total documents matching the filter.
 * - Used to calculate totalPages.
 *
 * .skip(n)  → skip first n documents
 * .limit(n) → return only n documents
 */
const getAllProducts = async (req, res) => {
    try {
        const {
            category,
            minPrice,
            maxPrice,
            search,
            sortBy = 'price',   // default sort field
            order  = 'asc',     // default sort order
            page   = 1,         // default page
            limit  = 5          // default items per page
        } = req.query;

        // ── Step 1: Build Filter + Search Query ───────────────────────────────
        const filterQuery = {}; // empty = return all

        // Filtering by category
        if (category) {
            filterQuery.category = category;
        }

        // Filtering by price range
        if (minPrice || maxPrice) {
            filterQuery.price = {};
            if (minPrice) filterQuery.price.$gte = Number(minPrice); // convert string → number
            if (maxPrice) filterQuery.price.$lte = Number(maxPrice); // convert string → number
        }

        // Searching by name (case-insensitive)
        if (search) {
            filterQuery.name = { $regex: search, $options: 'i' };
        }

        // ── Step 2: Sorting ───────────────────────────────────────────────────
        const sortOrder = order === 'asc' ? 1 : -1; // 1 = asc, -1 = desc

        // ── Step 3: Pagination ────────────────────────────────────────────────
        const skip       = (Number(page) - 1) * Number(limit);
        const total      = await Product.countDocuments(filterQuery);
        const totalPages = Math.ceil(total / Number(limit));

        // ── Step 4: Execute Query ─────────────────────────────────────────────
        const products = await Product
            .find(filterQuery)              // apply filter + search
            .sort({ [sortBy]: sortOrder })  // apply sorting
            .skip(skip)                     // apply pagination skip
            .limit(Number(limit));          // apply pagination limit

        res.status(200).json({
            total,        // total matching products
            totalPages,   // total number of pages
            currentPage : Number(page),
            limit       : Number(limit),
            products
        });

    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch products', error: err.message });
    }
};

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

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete product', error: err.message });
    }
};

// ─── ORDER MANAGEMENT (Admin) ─────────────────────────────────────────────────

/**
 * READ All Orders (Admin):
 * ─────────────────────────────────────────────────────────────────────────────
 * FILTERING:
 * - Filter orders by status: pending, shipped, delivered, cancelled.
 * - ?status=pending → only show pending orders.
 *
 * SORTING:
 * - Default sort is by createdAt descending → newest orders first.
 * - ?sortBy=createdAt&order=desc
 *
 * PAGINATION:
 * - Same skip/limit logic as products.
 *
 * .populate('product'):
 * - Orders store only the product's ObjectId (reference).
 * - .populate('product') replaces that ObjectId with the full product document.
 * - Without populate: { product: '64abc123...' }
 * - With populate:    { product: { name: 'iPhone', price: 999, ... } }
 */
const getAllOrders = async (req, res) => {
    try {
        const {
            status,
            sortBy = 'createdAt',
            order  = 'desc',
            page   = 1,
            limit  = 5
        } = req.query;

        // ── Step 1: Filter Query ──────────────────────────────────────────────
        const filterQuery = {};
        if (status) {
            filterQuery.status = status; // e.g. { status: 'pending' }
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
            .populate('product')            // replace productId with full product data
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