const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

/**
 * Auth Routes (Public - no token required):
 * POST /auth/register → create new account with role
 * POST /auth/login    → login and receive JWT token
 */
router.post('/register', register);
router.post('/login', login);

module.exports = router;