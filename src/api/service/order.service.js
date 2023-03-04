const Order = require("../models/order");
const Cart = require("../models/cart");

module.exports = {
    addToOrder: async (userId, shoeId) => {
        const checkCart = await Cart.findOne({ userId: userId, shoeId: shoeId });
        if (checkCart) {
            const quantityInCart = checkCart.quantity;
            if (quantityInCart > 1) {
                await Cart.updateOne({ userId: userId, shoeId: shoeId }, { quantity: quantityInCart - 1 });
                return {
                    message: "update cart successfully",
                    statusCode: 200,
                    data: null,
                }
            }
            else {
                await Cart.deleteOne({ userId: userId, shoeId: shoeId });
                return {
                    message: "delete this shoe in cart successfully",
                    statusCode: 200,
                    data: null,
                }
            }
        }

        const newOrder = new Order({
            userId,
            shoeId
        });
        await newOrder.save();

        return {
            message: "add to order successfully",
            data: null,
            statusCode: 200,
        }
    },
    readOrder: async (userId) => {
        const CART = await Cart.find({ userId: userId });
        return {
            message: "",
            data: CART,
            statusCode: 200,
        }
    }

}