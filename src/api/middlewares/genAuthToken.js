const jwt = require("jsonwebtoken");

module.exports = {
    genAuthToken: function (payload) {
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        return token;
    },
};