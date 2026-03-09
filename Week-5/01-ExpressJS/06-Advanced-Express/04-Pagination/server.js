/*
  ASSIGNMENT 27 — Pagination, Sorting, Searching & Filtering
  ============================================================

  THE PROBLEM WITH RETURNING ALL DATA:
  Imagine your database has 100,000 users.
  If you do User.find() and return all of them at once:
  - The response is HUGE (MB of data)
  - The browser freezes trying to render it
  - Your server runs out of memory
  - The user sees nothing useful — just a wall of data

  THE SOLUTION: Pagination + Searching + Sorting + Filtering
  All four work together via QUERY STRINGS in the URL.

  WHAT EACH ONE DOES:
  --------------------
  Pagination  → split data into pages  → ?page=2&limit=10
  Searching   → find by keyword        → ?search=alice
  Filtering   → narrow by a field      → ?city=delhi&role=admin
  Sorting     → order the results      → ?sortBy=name&order=asc

  A REAL URL combining all four:
  /users?page=2&limit=10&search=ali&city=delhi&sortBy=name&order=asc
  → Page 2, 10 per page, name contains "ali", city is "delhi", sorted by name A→Z

  MONGOOSE METHODS USED:
  -----------------------
  .find(filter)     → filter documents
  .sort({ field })  → sort results
  .skip(n)          → skip n documents (used for pagination)
  .limit(n)         → only return n documents
  .countDocuments() → count total matching documents (for total pages)

  SETUP (run in terminal before starting):
  -----------------------------------------
  npm init -y
  npm install express mongoose dotenv
  node assignment-27.js

  .env file:
  MONGO_URI=your_mongodb_connection_string
*/

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.error("Connection failed:", err.message));

/* ---------------------------------------------------------------
  SCHEMA & MODEL
---------------------------------------------------------------- */
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
    city: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

/* ---------------------------------------------------------------
  SEED ROUTE — POST /seed
  ------------------------
  Creates 30 fake users so we have data to paginate through.
  Only needed once. After running, your DB has test data.

  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/seed
---------------------------------------------------------------- */
app.post("/seed", async (req, res) => {
    try {
        await User.deleteMany(); // clear existing users first

        const cities = ["Delhi", "Mumbai", "Pune", "Chennai", "Kolkata"];
        const roles = ["user", "admin"];

        const users = Array.from({ length: 30 }, (_, i) => ({
            name: `User ${i + 1}`,
            email: `user${i + 1}@test.com`,
            age: 18 + (i % 40),
            city: cities[i % cities.length],
            role: roles[i % 2],
        }));

        await User.insertMany(users);
        res.json({ message: "30 users seeded successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* ---------------------------------------------------------------
  MAIN ROUTE — GET /users
  ------------------------
  This single route handles ALL four features together:
  Pagination + Searching + Filtering + Sorting

  All options come from query strings in the URL.
  Every query param has a sensible DEFAULT so the route works
  even if the client sends none of them.
---------------------------------------------------------------- */
app.get("/users", async (req, res) => {
    try {

        /* -----------------------------------------------------------
          STEP 1 — READ QUERY PARAMS WITH DEFAULTS
          -----------------------------------------
          Extract all query params and set defaults for missing ones.
    
          page    → which page to return (default: 1)
          limit   → how many per page   (default: 5)
          search  → keyword to search in name or email
          city    → filter by city
          role    → filter by role
          sortBy  → which field to sort by (default: createdAt)
          order   → "asc" or "desc"      (default: desc = newest first)
        ----------------------------------------------------------- */
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        const city = req.query.city || "";
        const role = req.query.role || "";
        const sortBy = req.query.sortBy || "createdAt";
        const order = req.query.order || "desc";

        /* -----------------------------------------------------------
          STEP 2 — BUILD THE FILTER OBJECT
          ----------------------------------
          The filter object is passed to .find() to narrow results.
          We only add a condition to the filter if the value exists.
    
          $regex → MongoDB operator for partial string matching
          $options: "i" → case-insensitive (finds "alice" and "Alice")
        ----------------------------------------------------------- */
        const filter = {};

        if (search) {
            /*
              Search across BOTH name and email fields.
              $or means: match documents where name OR email contains the keyword.
            */
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ];
        }

        if (city) {
            filter.city = { $regex: city, $options: "i" }; // case-insensitive city match
        }

        if (role) {
            filter.role = role; // exact match for role
        }

        /* -----------------------------------------------------------
          STEP 3 — BUILD THE SORT OBJECT
          --------------------------------
          Mongoose .sort() takes an object like: { name: 1 } or { name: -1 }
          1  = ascending  (A → Z, 0 → 9, oldest → newest)
          -1 = descending (Z → A, 9 → 0, newest → oldest)
        ----------------------------------------------------------- */
        const sortOrder = order === "asc" ? 1 : -1;
        const sortObj = { [sortBy]: sortOrder };

        /* -----------------------------------------------------------
          STEP 4 — CALCULATE SKIP FOR PAGINATION
          ----------------------------------------
          SKIP tells MongoDB how many documents to jump over
          before starting to return results.
    
          Page 1 → skip 0  (start from the beginning)
          Page 2 → skip 5  (jump over the first 5)
          Page 3 → skip 10 (jump over the first 10)
    
          Formula: skip = (page - 1) * limit
        ----------------------------------------------------------- */
        const skip = (page - 1) * limit;

        /* -----------------------------------------------------------
          STEP 5 — QUERY THE DATABASE
          ----------------------------
          Run TWO queries in parallel using Promise.all():
          1. users      → the actual page of data
          2. totalCount → total matching documents (needed for total pages)
    
          Running them in parallel is faster than running them one by one.
        ----------------------------------------------------------- */
        const [users, totalCount] = await Promise.all([
            User.find(filter)
                .sort(sortObj)   // apply sort
                .skip(skip)      // jump to the right page
                .limit(limit),   // only return this many
            User.countDocuments(filter), // count ALL matches (not just this page)
        ]);

        /* -----------------------------------------------------------
          STEP 6 — CALCULATE PAGINATION META
          ------------------------------------
          totalPages → how many pages exist in total
          hasNextPage → is there a page after this one?
          hasPrevPage → is there a page before this one?
        ----------------------------------------------------------- */
        const totalPages = Math.ceil(totalCount / limit);

        res.json({
            // pagination meta — the client uses this to build page buttons
            meta: {
                totalCount,
                totalPages,
                currentPage: page,
                limit,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
            // the actual data for this page
            users,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

/*
  TEST URLS — try these in the browser after seeding:
  =====================================================

  All users (default — page 1, 5 per page, newest first):
  → http://localhost:3000/users

  Page 2:
  → http://localhost:3000/users?page=2

  10 per page:
  → http://localhost:3000/users?limit=10

  SEARCH by name:
  → http://localhost:3000/users?search=user1

  FILTER by city:
  → http://localhost:3000/users?city=delhi

  FILTER by role:
  → http://localhost:3000/users?role=admin

  SORT by name A→Z:
  → http://localhost:3000/users?sortBy=name&order=asc

  SORT by age oldest first:
  → http://localhost:3000/users?sortBy=age&order=asc

  COMBINE EVERYTHING:
  → http://localhost:3000/users?page=1&limit=5&search=user&city=mumbai&sortBy=age&order=asc
*/