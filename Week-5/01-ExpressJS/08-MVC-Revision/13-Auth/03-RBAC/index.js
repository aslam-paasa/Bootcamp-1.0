/**
 * Role Based Access Control (RBAC) for Admin and Customer:
 * > RBAC means giving different users different levels of access based
 *   on their role.
 * > Admin can do everything, Customer can only do limited things.
 * > Install: npm i jsonwebtoken bcrypt
*/

/**
 * How RBAC Works with JWT:
 * 
 * Step 1: User registers with a role (admin or user)
 *                     ↓
 * Step 2: User logs in → server generates token with role inside
 *                     ↓
 * Step 3: Token payload contains: { userId, role }
 *                     ↓
 * Step 4: User sends token with every request
 *                     ↓
 * Step 5: verifyToken middleware → decodes token → req.user = { userId, role }
 *                     ↓
 * Step 6: authorizeRole middleware → checks if role is allowed
 *                     ↓
 * Step 7: If role matches → allow access
 *         If role does not match → 403 Forbidden
*/

require('dotenv').config();
require('./config/db');

const express = require('express');
const authRoute = require('./routes/authRoute');
const adminRoute = require('./routes/admin/adminRoute');
const customerRoute = require('./routes/customer/customerRoute');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

/**
 * Routes:
 * /auth     → public (register, login)
 * /admin    → protected (admin only)
 * /customer → mixed (products public, orders protected)
 */
app.use('/auth', authRoute);
app.use('/admin', adminRoute);
app.use('/customer', customerRoute);

app.use((err, req, res, next) => {
    console.error('Global Error:', err.message);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});

/**
 * Old approach (unsafe):
 * - Customer sends their ID in request body.
 * - Body: { customerId: "64abc...", product: "...", quantity: 2 }
 * - Problem: Customer can change the ID to someone else's ID
 *   and place orders as that person.
 *
 * New approach with JWT (safe):
 * - Customer ID comes from the decoded JWT token.
 * - const customerId = req.user.userId
 * - Token is signed by server with JWT_SECRET.
 * - Customer cannot modify their token without invalidating it.
 * - Server always knows exactly who is making the request.
 */