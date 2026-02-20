const jwt = require('jsonwebtoken');
const { JWT_USER_PASSWORD } = require('../config');

function userMiddleware(req, res, next) {
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_USER_PASSWORD);

    if(decoded) {
        req.userId = decoded.id;
        next();
    } else {
        res.status(403).json({ message: "You are not authorized to access this resource" });
    }
}

module.exports = {
    userMiddleware: userMiddleware
}
