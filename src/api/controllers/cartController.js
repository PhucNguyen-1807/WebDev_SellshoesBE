const cartService = require('../services/cartService');


module.exports = {
    addToCart: async (req, res, next) => {
        const { userId } = req.user;
        const shoeId = req.body.shoeId;
        const count = req.body.count;
        const response = await cartService.addToCart(userId, shoeId,);;
        res.status(response.statusCode).json(response);
    },
    removeFromCart: async (req, res, next) => {
        const { userId } = req.user;
        const shoeId = req.body.shoeId;
        const response = await cartService.removeFromCart(userI1d, shoeId);;
        res.status(response.statusCode).json(response);
    },
    updateCart: async (req, res, next) => {
        const { userId } = req.user;
        const shoeId = req.body.shoeId;
        const count = req.body.count;
        const isChecked = req.body.isChecked;
        const response = await cartService.updateCart(userId, shoeId, count, isChecked);
        res.status(response.statusCode).json(response);
    }
}