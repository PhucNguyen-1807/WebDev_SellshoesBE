const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            statusCode: 401,
            message: 'UNAUTHORIZED',
        });
    }
    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodeToken;
        next();
    } catch (error) {
        next(new createError(403, error.message));
    }
};

module.exports = {verifyToken};