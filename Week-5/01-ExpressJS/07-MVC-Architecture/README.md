# MVC Express API — Production Ready

A complete REST API combining all 28 assignments into one clean MVC architecture.

## Folder Structure

```
mvc-project/
├── server.js               ← entry point — run this
├── app.js                  ← Express app setup + all middleware
├── package.json
├── .env.example            ← copy to .env and fill in your values
├── .gitignore
│
├── config/
│   ├── db.js               ← MongoDB connection
│   └── email.js            ← Nodemailer transporter
│
├── models/
│   ├── User.js             ← User schema + password hashing hook
│   └── Post.js             ← Post schema + User reference
│
├── controllers/
│   ├── authController.js   ← register, login, getMe
│   ├── userController.js   ← CRUD + pagination + search + filter
│   └── postController.js   ← CRUD + file upload + populate
│
├── middleware/
│   ├── auth.js             ← verifyToken + authorise (RBAC)
│   ├── ownership.js        ← requirePostOwner
│   ├── errorHandler.js     ← global error handler
│   ├── upload.js           ← multer config
│   └── rateLimiter.js      ← loginLimiter + otpLimiter
│
├── routes/v1/
│   ├── index.js            ← combines all v1 routes
│   ├── authRoutes.js       ← /api/v1/auth/*
│   ├── userRoutes.js       ← /api/v1/users/*
│   └── postRoutes.js       ← /api/v1/posts/*
│
├── utils/
│   └── sendEmail.js        ← reusable email sender
│
└── uploads/                ← uploaded files saved here
```

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Create your .env file
cp .env.example .env
# Fill in MONGO_URI, JWT_SECRET, and mail credentials

# 3. Run the server
npm run dev       # development (with nodemon)
npm start         # production
```


# API Testing List — MVC Express API

> Test in this exact order. Save tokens and IDs as Postman environment variables.

---

## 🔐 Auth

### 1. Register Admin
```js
POST /api/v1/auth/register

Body:
{
  "name"    : "Admin",
  "email"   : "admin@test.com",
  "password": "hello123",
  "role"    : "admin"
}
```

### 2. Register Alice
```js
POST /api/v1/auth/register

Body:
{
  "name"    : "Alice",
  "email"   : "alice@test.com",
  "password": "hello123"
}
```

### 3. Register Bob
```js
POST /api/v1/auth/register

Body:
{
  "name"    : "Bob",
  "email"   : "bob@test.com",
  "password": "hello123"
}
```

### 4. Login as Admin → copy adminToken
```js
POST /api/v1/auth/login

Body:
{
  "email"   : "admin@test.com",
  "password": "hello123"
}
```

### 5. Login as Alice → copy aliceToken
```js
POST /api/v1/auth/login

Body:
{
  "email"   : "alice@test.com",
  "password": "hello123"
}
```

### 6. Login as Bob → copy bobToken
```js
POST /api/v1/auth/login

Body:
{
  "email"   : "bob@test.com",
  "password": "hello123"
}
```

### 7. Get My Profile
```js
GET /api/v1/auth/me

Headers:
Authorization: Bearer <aliceToken>
```

---

## 👤 Users

### 8. Get All Users
```js
GET /api/v1/users

Headers:
Authorization: Bearer <adminToken>
```

### 9. Get All Users — with Pagination
```js
GET /api/v1/users?page=1&limit=2

Headers:
Authorization: Bearer <adminToken>
```

### 10. Get All Users — with Search
```js
GET /api/v1/users?search=alice

Headers:
Authorization: Bearer <adminToken>
```

### 11. Get All Users — Filter by Role
```js
GET /api/v1/users?role=admin

Headers:
Authorization: Bearer <adminToken>
```

### 12. Get All Users — Sort by Name A→Z
```js
GET /api/v1/users?sortBy=name&order=asc

Headers:
Authorization: Bearer <adminToken>
```

### 13. Get User by ID → copy aliceId
```js
GET /api/v1/users/:aliceId

Headers:
Authorization: Bearer <adminToken>
```

### 14. Update User — text field
```js
PATCH /api/v1/users/:aliceId

Headers:
Authorization: Bearer <aliceToken>

Body (form-data):
city = Delhi
```

### 15. Update User — with Avatar Upload
```js
PATCH /api/v1/users/:aliceId

Headers:
Authorization: Bearer <aliceToken>

Body (form-data):
city   = Mumbai
avatar = [select an image file]
```

### 16. Delete User
```js
DELETE /api/v1/users/:bobId

Headers:
Authorization: Bearer <adminToken>
```

---

## 📝 Posts

### 17. Create Post
```js
POST /api/v1/posts

Headers:
Authorization: Bearer <aliceToken>

Body:
{
  "title"  : "Alice Post 1",
  "content": "Hello world",
  "tags"   : "news, tech"
}
```

### 18. Create Second Post
```js
POST /api/v1/posts

Headers:
Authorization: Bearer <aliceToken>

Body:
{
  "title"  : "Alice Post 2",
  "content": "This is my second post"
}
```

### 19. Create Post — with Image Upload
```js
POST /api/v1/posts

Headers:
Authorization: Bearer <aliceToken>

Body (form-data):
title   = Alice Post with Image
content = This post has an image
image   = [select an image file]
```

### 20. Get All Posts — Public
```js
GET /api/v1/posts
```

### 21. Get All Posts — with Pagination
```js
GET /api/v1/posts?page=1&limit=1
```

### 22. Get All Posts — with Search
```js
GET /api/v1/posts?search=alice
```

### 23. Get All Posts — Sort Oldest First
```js
GET /api/v1/posts?sortBy=createdAt&order=asc
```

### 24. Get Post by ID — author is populated
```js
GET /api/v1/posts/:postId

// Notice: author field returns full { name, email, avatar }
// instead of just an ObjectId — this is populate() in action
```

### 25. Update Post — Owner
```js
PATCH /api/v1/posts/:postId

Headers:
Authorization: Bearer <aliceToken>

Body:
{
  "title": "Alice Post 1 Updated"
}
```

### 26. Update Post — Admin can edit any post
```js
PATCH /api/v1/posts/:postId

Headers:
Authorization: Bearer <adminToken>

Body:
{
  "title": "Admin Edited This Post"
}
```

### 27. Update Post — Bob blocked (not owner)
```js
PATCH /api/v1/posts/:postId

Headers:
Authorization: Bearer <bobToken>

Body:
{
  "title": "Bob Cannot Edit This"
}

// Expected: 403 Forbidden
```

### 28. Delete Post — Owner
```js
DELETE /api/v1/posts/:postId

Headers:
Authorization: Bearer <aliceToken>

// Expected: 200 success
```

### 29. Delete Post — Bob blocked (not owner)
```js
DELETE /api/v1/posts/:postId

Headers:
Authorization: Bearer <bobToken>

// Expected: 403 Forbidden
```

### 30. Delete Post — Admin can delete any post
```js
DELETE /api/v1/posts/:postId

Headers:
Authorization: Bearer <adminToken>

// Expected: 200 success
```

---

## 🚫 Error & Edge Cases

### 31. Wrong Password
```js
POST /api/v1/auth/login

Body:
{
  "email"   : "alice@test.com",
  "password": "wrongpassword"
}

// Expected: 401 Unauthorized
```

### 32. Rate Limit — Login (send 6 times)
```js
POST /api/v1/auth/login

Body:
{
  "email"   : "alice@test.com",
  "password": "wrongpassword"
}

// Send 6 times → 6th attempt returns 429 Too Many Requests
```

### 33. No Token on Protected Route
```js
GET /api/v1/users

// No Authorization header

// Expected: 401 Access denied
```

### 34. Wrong Role — Alice accessing admin route
```js
GET /api/v1/users

Headers:
Authorization: Bearer <aliceToken>

// Expected: 403 Forbidden
```

### 35. Invalid MongoDB ObjectId
```js
GET /api/v1/users/this-is-not-a-valid-id

Headers:
Authorization: Bearer <adminToken>

// Expected: 400 Invalid ID format
```

### 36. Unknown Route
```js
GET /api/v1/anything

// Expected: 404 Route not found
```

### 37. Duplicate Email
```js
POST /api/v1/auth/register

Body:
{
  "name"    : "Alice Again",
  "email"   : "alice@test.com",
  "password": "hello123"
}

// Expected: 400 email already exists
```

### 38. Validation Error — Missing Required Field
```js
POST /api/v1/auth/register

Body:
{
  "email"   : "noname@test.com",
  "password": "hello123"
}

// Expected: 400 Name is required
```

## Query String Support (GET /users and GET /posts)

```
?page=2          → page number (default: 1)
?limit=10        → results per page (default: 10)
?search=alice    → search by name/email or title/content
?city=delhi      → filter users by city
?role=admin      → filter users by role
?sortBy=name     → sort by any field
?order=asc       → asc or desc (default: desc)
```

## Auth Header Format

```
Authorization: Bearer <your_jwt_token>
```
