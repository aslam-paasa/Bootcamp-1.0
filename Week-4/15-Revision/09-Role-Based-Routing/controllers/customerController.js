/**
 * Customer Controllers:
 * - These functions handle the logic for customer routes.
 * - Only customer users should be able to access these.
 */

const viewProducts = (req, res) => {
    res.status(200).json({ message: 'Customer: Viewing all products' });
};

const placeOrder = (req, res) => {
    res.status(200).json({ message: 'Customer: Order placed successfully' });
};

module.exports = { viewProducts, placeOrder };