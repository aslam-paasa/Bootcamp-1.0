const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const { register, login, getProfile, logout } = require('../controllers/authController');

/**
 * Stateful Auth Routes:
 *
 * POST /auth/register → Create new account
 * POST /auth/login    → Login + create session + set cookie
 * GET  /auth/profile  → Get profile (session required)
 * POST /auth/logout   → Destroy session + clear cookie
 */
router.post('/register', register);
router.post('/login', login);
router.get('/profile', isAuthenticated, getProfile);
router.post('/logout', isAuthenticated, logout);

module.exports = router;