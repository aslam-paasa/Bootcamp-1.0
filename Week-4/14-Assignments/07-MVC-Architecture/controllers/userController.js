/*
  controllers/userController.js — User CRUD Logic
  =================================================
  Admin-facing user management.
  Includes CRUD + pagination + search + filter + sort.
*/

const User = require("../models/User");

/* ---------------------------------------------------------------
  GET /api/v1/users — get all users (admin only)
  Supports: ?page ?limit ?search ?city ?role ?sortBy ?order
---------------------------------------------------------------- */
exports.getAllUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        const city = req.query.city || "";
        const role = req.query.role || "";
        const sortBy = req.query.sortBy || "createdAt";
        const order = req.query.order || "desc";

        // Build filter
        const filter = {};
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ];
        }
        if (city) filter.city = { $regex: city, $options: "i" };
        if (role) filter.role = role;

        const skip = (page - 1) * limit;
        const sortOrder = order === "asc" ? 1 : -1;

        const [users, totalCount] = await Promise.all([
            User.find(filter).sort({ [sortBy]: sortOrder }).skip(skip).limit(limit),
            User.countDocuments(filter),
        ]);

        res.json({
            success: true,
            meta: {
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
                limit,
                hasNextPage: page < Math.ceil(totalCount / limit),
                hasPrevPage: page > 1,
            },
            users,
        });
    } catch (err) {
        next(err);
    }
};

/* ---------------------------------------------------------------
  GET /api/v1/users/:id
---------------------------------------------------------------- */
exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ success: false, error: "User not found." });
        res.json({ success: true, user });
    } catch (err) {
        next(err);
    }
};

/* ---------------------------------------------------------------
  PATCH /api/v1/users/:id — update user (admin or own profile)
---------------------------------------------------------------- */
exports.updateUser = async (req, res, next) => {
    try {
        // Prevent password update through this route — use /auth/change-password
        delete req.body.password;

        // If an avatar was uploaded, add its path to the update
        if (req.file) {
            req.body.avatar = `/uploads/${req.file.filename}`;
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!user) return res.status(404).json({ success: false, error: "User not found." });

        res.json({ success: true, user });
    } catch (err) {
        next(err);
    }
};

/* ---------------------------------------------------------------
  DELETE /api/v1/users/:id — admin only
---------------------------------------------------------------- */
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ success: false, error: "User not found." });
        res.json({ success: true, message: "User deleted.", user });
    } catch (err) {
        next(err);
    }
};