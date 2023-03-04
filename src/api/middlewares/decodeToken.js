const jwt = require("jsonwebtoken");

const decodeToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            statusCode: 401,
            message: "UNAUTHORIZED",
            data: null,
        });
    }
    try {
        const userInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = userInfo;
        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    decodeToken,
};