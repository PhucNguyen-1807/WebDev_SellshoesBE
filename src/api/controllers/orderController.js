const orderService = require("../services/orderService");

module.exports = {
    addToOrder: async (req, res, next) => {
        const { userId } = req.user;
        const shoeId = req.body.shoeId;
        const response = await orderService.addToOrder(userId, shoeId);;
        res.status(response.statusCode).json(response);
    },
    readOrder: async (req, res, next) => {
        const { userId } = req.user;
        const response = await orderService.readOrder(userId);
        res.status(response.statusCode).json(response);
    }
};
