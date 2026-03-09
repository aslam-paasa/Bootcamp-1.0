/**
 * authorizeRole Middleware:
 * - Runs AFTER verifyToken middleware.
 * - Checks if the logged in user has the correct role.
 * - Uses rest parameter (...allowedRoles) so you can pass
 *   one or multiple roles.
 *
 * How it works:
 * - verifyToken sets req.user = { userId, role }
 * - authorizeRole checks if req.user.role is in allowedRoles array
 *
 * Usage Examples:
 * - authorizeRole('admin')              → only admin allowed
 * - authorizeRole('customer')           → only customer allowed
 * - authorizeRole('admin', 'customer')  → both allowed
 *
 * Status Codes:
 * - 401 Unauthorized → no token (handled by verifyToken)
 * - 403 Forbidden    → token valid but role not allowed
 */
const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {

        // Check if user's role is in the allowed roles list
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Access denied. Required role: ${allowedRoles.join(' or ')}`
            });
        }

        next(); // role is allowed, move to controller
    };
};

module.exports = authorizeRole;