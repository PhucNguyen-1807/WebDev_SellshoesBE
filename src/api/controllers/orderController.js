const orderService = require("../services/orderService");

module.exports = {
    addToOrder: async (req, res, next) => {
        const { userId } = req.user;
        const shoeId = req.body.shoeId;
        const Count = req.body.count;
        const response = await orderService.addToOrder(userId, shoeId, Count);
        res.status(response.statusCode).json(response);
    },
    readOrder: async (req, res, next) => {
        const { userId } = req.user;
        const response = await orderService.readOrder(userId);
        res.status(response.statusCode).json(response);
    },
    removeFromCart: async (req, res, next) => {
        const { userId } = req.user;
        const shoeId = req.body.shoeId;
        const Count = req.body.count;
        const response = await orderService.removeFromCart(userId, shoeId, Count);;
        res.status(response.statusCode).json(response);
    }
};
