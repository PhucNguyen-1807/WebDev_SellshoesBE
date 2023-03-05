const verifyAdmin = (req, res, next) => {
    if (req.user.role) {
        return next();
    }
    return res.status(401).json({
        statusCode: 401,
        message: 'UNAUTHORIZED',
    });
};

module.exports = {
    verifyAdmin,
};
