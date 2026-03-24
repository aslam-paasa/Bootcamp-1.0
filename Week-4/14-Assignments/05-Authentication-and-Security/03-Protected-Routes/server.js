/*
  ASSIGNMENT 20 — Protected Routes: Middleware That Checks Tokens
  ================================================================

  WHAT IS A PROTECTED ROUTE?
  A protected route is a route that requires the user to be
  logged in before they can access it.

  If the user is NOT logged in → they get a 401 Unauthorized error.
  If the user IS logged in (has a valid token) → they get the data.

  Examples of protected routes in real apps:
  - GET /profile       → only YOU can see your profile
  - GET /dashboard     → only logged-in users see the dashboard
  - DELETE /posts/:id  → only the AUTHOR can delete their own post
  - GET /admin         → only users with role "admin" can access

  HOW PROTECTION WORKS:
  ----------------------
  We write a middleware function that:
  1. Reads the token from the request header
  2. Verifies the token is valid and not expired
  3. If valid   → attaches the user info to req and calls next()
  4. If invalid → stops the request and sends 401

  This middleware is placed BEFORE the route handler:
  app.get("/profile", verifyToken, (req, res) => { ... })
                           ↑
               runs first — if it fails, route never runs

  TYPES OF PROTECTION COVERED IN THIS ASSIGNMENT:
  -------------------------------------------------
  1. verifyToken    → checks if user is logged in at all
  2. requireAdmin   → checks if logged-in user has "admin" role
  3. requireOwner   → checks if the logged-in user owns the resource

  SETUP (run in terminal before starting):
  -----------------------------------------
  npm init -y
  npm install express mongoose dotenv bcrypt jsonwebtoken
  node assignment-20.js

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
  We add a "role" field so we can demonstrate role-based
  protection (admin vs regular user).
---------------------------------------------------------------- */
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
});

const User = mongoose.model("User", userSchema);

/* ---------------------------------------------------------------
  SCHEMA — Post
  --------------
  Each post stores the author's _id.
  We use this to check ownership in the requireOwner middleware.
---------------------------------------------------------------- */
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Post = mongoose.model("Post", postSchema);

/* ---------------------------------------------------------------
  HELPER — generateToken
---------------------------------------------------------------- */
const generateToken = (user) => {
    return jwt.sign(
        { userId: user._id, role: user.role }, // include role in token payload
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

/* ---------------------------------------------------------------
  MIDDLEWARE 1 — verifyToken
  ---------------------------
  The base protection middleware.
  Checks if the request has a valid JWT in the Authorization header.

  If valid   → attaches decoded payload to req.user and calls next()
  If missing → 401 No token provided
  If invalid → 401 Invalid or expired token

  Used on ANY route that requires the user to be logged in.
---------------------------------------------------------------- */
const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // extract token after "Bearer "

    if (!token) {
        return res.status(401).json({ error: "Access denied. Token missing." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { userId, role } now available in all routes after this
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid or expired token." });
    }
};

/* ---------------------------------------------------------------
  MIDDLEWARE 2 — requireAdmin
  ----------------------------
  Role-based protection — only allows users with role "admin".
  This middleware MUST run AFTER verifyToken because it relies
  on req.user which verifyToken sets.

  Usage: app.get("/admin", verifyToken, requireAdmin, handler)

  If role is "admin" → next() → route runs
  If role is "user"  → 403 Forbidden (logged in but no permission)
---------------------------------------------------------------- */
const requireAdmin = (req, res, next) => {
    /*
      403 Forbidden means: we know who you are, but you are
      not allowed to access this resource.
      (401 = not logged in, 403 = logged in but no permission)
    */
    if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Access denied. Admins only." });
    }

    next(); // user is admin, allow access
};

/* ---------------------------------------------------------------
  MIDDLEWARE 3 — requireOwner
  ----------------------------
  Ownership protection — only allows the author of a post
  to perform an action on it (like delete or edit).

  This middleware fetches the post from DB, checks if the
  logged-in user's id matches the post's author field.

  If match    → req.post is attached and next() is called
  If no match → 403 Forbidden
---------------------------------------------------------------- */
const requireOwner = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: "Post not found." });
        }

        /*
          post.author is a MongoDB ObjectId.
          req.user.userId is a plain string from the JWT payload.
          We use .toString() on both to compare them as strings.
        */
        if (post.author.toString() !== req.user.userId.toString()) {
            return res.status(403).json({ error: "Access denied. You are not the author." });
        }

        req.post = post; // attach the post to req so the route can use it
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* ---------------------------------------------------------------
  ROUTES
---------------------------------------------------------------- */

/*
  POST /register
  ---------------
  To create an admin user, pass "role": "admin" in the body.
  Normal users do not need to pass role — it defaults to "user".

  Test in Postman:
  Regular user → { "name": "Alice", "email": "alice@test.com", "password": "hello123" }
  Admin user   → { "name": "Admin", "email": "admin@test.com", "password": "hello123", "role": "admin" }
*/
app.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });
        res.status(201).json({ message: "Registered!", user: { id: user._id, name: user.name, role: user.role } });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/*
  POST /login
  ------------
  Returns a JWT with userId and role inside the payload.
*/
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");

        if (!user) return res.status(404).json({ error: "User not found." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Incorrect password." });

        const token = generateToken(user);
        res.json({ message: "Login successful!", token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*
  GET /profile — Protected (login required)
  ------------------------------------------
  Only accessible with a valid JWT.
  verifyToken middleware checks the token before this runs.

  Test in Postman:
  - Method: GET
  - URL: http://localhost:3000/profile
  - Headers → Authorization: Bearer <your_token>
*/
app.get("/profile", verifyToken, async (req, res) => {
    const user = await User.findById(req.user.userId);
    res.json({ message: "Your profile", user });
});

/*
  GET /admin — Protected (admin role required)
  ---------------------------------------------
  Both verifyToken AND requireAdmin must pass.
  A regular "user" role will be blocked at requireAdmin.

  Test in Postman with admin token → success
  Test in Postman with regular user token → 403 Forbidden
*/
app.get("/admin", verifyToken, requireAdmin, (req, res) => {
    res.json({ message: "Welcome Admin! You have access to the admin panel." });
});

/*
  POST /posts — Protected (login required)
  -----------------------------------------
  Any logged-in user can create a post.
  The author is set from req.user.userId — not from req.body.
  This prevents users from creating posts on behalf of others.
*/
app.post("/posts", verifyToken, async (req, res) => {
    try {
        const post = await Post.create({
            title: req.body.title,
            content: req.body.content,
            author: req.user.userId, // always taken from the token, not req.body
        });
        res.status(201).json({ message: "Post created!", post });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/*
  DELETE /posts/:id — Protected (owner only)
  -------------------------------------------
  verifyToken checks the user is logged in.
  requireOwner checks the user is the author of this post.
  Only if BOTH pass does the deletion happen.

  Test in Postman:
  - Login as the post author → get token → delete their own post → success
  - Login as a different user → get token → try to delete → 403 Forbidden
*/
app.delete("/posts/:id", verifyToken, requireOwner, async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: "Post deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});