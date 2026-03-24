/*
  ASSIGNMENT 21 — RBAC (Role-Based Access Control)
  ==================================================

  WHAT IS RBAC?
  RBAC stands for Role-Based Access Control.
  It is a way to control WHAT each type of user can do in your app
  based on their ROLE.

  Instead of writing separate checks for every route,
  you assign users a ROLE and then define what each role can do.

  REAL WORLD EXAMPLE:
  --------------------
  Think of a company building:
  - Regular Employee → can enter office floors only
  - Manager          → can enter office + meeting rooms
  - Admin            → can enter everything including server room

  In a backend app:
  - "user"      → can read posts, edit their own profile
  - "moderator" → can delete any post
  - "admin"     → can do everything including managing users

  WITHOUT RBAC (messy):
  ----------------------
  You write if (user.role === "admin") checks scattered everywhere
  in every route. Hard to maintain and easy to miss one.

  WITH RBAC (clean):
  -------------------
  You write ONE reusable middleware that accepts the allowed roles.
  Then attach it to any route that needs protection.
  One place to change → affects all routes instantly.

  SYNTAX WE WILL BUILD:
  ----------------------
  app.get("/admin",     verifyToken, authorise("admin"),              handler)
  app.get("/moderate",  verifyToken, authorise("admin", "moderator"), handler)
  app.get("/dashboard", verifyToken, authorise("admin", "moderator", "user"), handler)

  authorise() is a function that RETURNS a middleware.
  You pass it the roles that are allowed.
  It checks req.user.role against that list.

  SETUP (run in terminal before starting):
  -----------------------------------------
  npm init -y
  npm install express mongoose dotenv bcrypt jsonwebtoken
  node assignment-21.js

  .env file:
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_super_secret_key_here
*/

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.error("Connection failed:", err.message));

/* ---------------------------------------------------------------
  SCHEMA — User
  --------------
  role field has three possible values: user, moderator, admin.
  This is what RBAC uses to decide what each person can access.
---------------------------------------------------------------- */
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role: {
        type: String,
        enum: ["user", "moderator", "admin"],
        default: "user",
    },
});

const User = mongoose.model("User", userSchema);

/* ---------------------------------------------------------------
  HELPER — generateToken
  -----------------------
  We include the role inside the token payload so the server
  can read the role on every request without hitting the database.
---------------------------------------------------------------- */
const generateToken = (user) => {
    return jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

/* ---------------------------------------------------------------
  MIDDLEWARE 1 — verifyToken
  ---------------------------
  Same as before — checks if the user is logged in at all.
  Sets req.user = { userId, role } for the next middleware to use.
---------------------------------------------------------------- */
const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { userId, role }
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid or expired token." });
    }
};

/* ---------------------------------------------------------------
  MIDDLEWARE 2 — authorise(...roles)
  ------------------------------------
  This is the heart of RBAC.

  authorise() is a function that takes one or more allowed roles
  as arguments and RETURNS a middleware function.

  This pattern is called a "middleware factory" — a function
  that creates and returns a middleware based on what you pass in.

  HOW IT WORKS:
  authorise("admin", "moderator")
  → returns a middleware function
  → that middleware checks if req.user.role is in ["admin", "moderator"]
  → if yes → next()
  → if no  → 403 Forbidden

  The ...roles syntax means you can pass any number of roles:
  authorise("admin")
  authorise("admin", "moderator")
  authorise("admin", "moderator", "user")
---------------------------------------------------------------- */
const authorise = (...roles) => {
    /*
      This inner function is the actual middleware.
      It has access to "roles" from the outer function
      via closure (JavaScript remembers the outer variable).
    */
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                error: `Access denied. Required role: [${roles.join(", ")}]. Your role: ${req.user.role}`,
            });
        }
        next(); // role is allowed — proceed to the route handler
    };
};

/* ---------------------------------------------------------------
  ROUTES — each protected with a different role requirement
---------------------------------------------------------------- */

/*
  POST /register
  ---------------
  Create users with different roles to test RBAC.

  Test in Postman — create 3 users:
  Regular user → { "name": "Alice",     "email": "alice@test.com",     "password": "hello123" }
  Moderator    → { "name": "Moderator", "email": "mod@test.com",       "password": "hello123", "role": "moderator" }
  Admin        → { "name": "Admin",     "email": "admin@test.com",     "password": "hello123", "role": "admin" }
*/
app.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed, role });
        res.status(201).json({ message: "Registered!", user: { id: user._id, name: user.name, role: user.role } });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/*
  POST /login
  ------------
  Login and copy the token. Login separately for each role
  to get different tokens, then test the routes below.
*/
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");

        if (!user) return res.status(404).json({ error: "User not found." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Incorrect password." });

        const token = generateToken(user);
        res.json({ message: "Login successful!", token, role: user.role });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*
  GET /dashboard — open to ALL logged-in users
  ---------------------------------------------
  Any role can access this route.
  verifyToken checks login. authorise allows all 3 roles.

  ✅ user token      → allowed
  ✅ moderator token → allowed
  ✅ admin token     → allowed
*/
app.get("/dashboard", verifyToken, authorise("user", "moderator", "admin"), (req, res) => {
    res.json({ message: `Welcome to the dashboard! Your role is: ${req.user.role}` });
});

/*
  GET /moderate — moderator and admin only
  -----------------------------------------
  Regular users are blocked. Only moderators and admins can access.

  ❌ user token      → 403 Forbidden
  ✅ moderator token → allowed
  ✅ admin token     → allowed
*/
app.get("/moderate", verifyToken, authorise("moderator", "admin"), (req, res) => {
    res.json({ message: "Moderator panel — you can manage posts here." });
});

/*
  GET /admin — admin only
  ------------------------
  Only the admin role can access this route.

  ❌ user token      → 403 Forbidden
  ❌ moderator token → 403 Forbidden
  ✅ admin token     → allowed
*/
app.get("/admin", verifyToken, authorise("admin"), (req, res) => {
    res.json({ message: "Admin panel — full access granted." });
});

/*
  DELETE /users/:id — admin only
  --------------------------------
  Only admins can delete user accounts.
  Moderators and regular users are blocked.
*/
app.delete("/users/:id", verifyToken, authorise("admin"), async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found." });
        res.json({ message: "User deleted by admin.", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});