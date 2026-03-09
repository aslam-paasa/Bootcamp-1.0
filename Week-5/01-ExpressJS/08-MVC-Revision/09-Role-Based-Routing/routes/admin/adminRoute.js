const express = require('express');
const router = express.Router();
const { editItem, editOrder, getOrders } = require('../../controllers/adminController');

/**
 * Admin Routes:
 * - All routes here are prefixed with '/admin' (defined in index.js).
 * - So the full paths become:
 *   POST /admin/editItem
 *   POST /admin/editOrder
 *   GET  /admin/getOrders
 *
 * - router.post() / router.get() works exactly like app.post() / app.get()
 *   but belongs to this specific router group.
 */

router.post('/editItem', editItem);
router.post('/editOrder', editOrder);
router.get('/getOrders', getOrders);

module.exports = router;