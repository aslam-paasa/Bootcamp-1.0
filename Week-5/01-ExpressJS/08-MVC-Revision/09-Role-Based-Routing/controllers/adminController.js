/**
 * Admin Controllers:
 * - These functions handle the logic for admin routes.
 * - Only admin users should be able to access these.
 */

const getOrders = (req, res) => {
    res.status(200).json({ message: 'Admin: Fetched all orders' });
};

const editItem = (req, res) => {
    res.status(200).json({ message: 'Admin: Item edited successfully' });
};

const editOrder = (req, res) => {
    res.status(200).json({ message: 'Admin: Order edited successfully' });
};


module.exports = { editItem, editOrder, getOrders };