const Order = require("../models/order");
const Cart = require("../models/cart");
const Shoe = require("../models/shoe")

module.exports = {
    addToOrder: async (userId, shoeId, Count) => {
        const checkShoe = await Shoe.findById(shoeId);
        if (!checkShoe) {
            return {
                message: "shoe is not exist",
                data: null,
                statusCode: 400,
            }
        }
        else {
            const check = await Order.findOne({ userId: userId, shoeId: shoeId });
            if (check) {
                check.count += Count;
                await check.save();
                return {
                    message: "update order successfully",
                    data: null,
                    statusCode: 200,
                }
            }
            else {
                const newOrder = new Order({
                    userId,
                    shoeId,
                    count: Count
                });
                await newOrder.save();

                return {
                    message: "add to order successfully",
                    data: null,
                    statusCode: 200,
                }
            }
        }
    },
    readOrder: async (userId) => {
        const ORDER = await Order.find({ userId: userId });
        return {
            message: "",
            data: ORDER,
            statusCode: 200,
        }
    },
    removeFromCart: async (userId, shoeId, Count) => {
        const checkCart = await Cart.findOne({ userId: userId, shoeId: shoeId });
        if (checkCart) {
            const countInCart = checkCart.count;
            if (countInCart > Count) {
                await Cart.updateOne({ userId: userId, shoeId: shoeId }, { count: countInCart - Count });
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
        else {
            return {
                message: "shoe is not exist in cart",
                statusCode: 400,
                data: null,
            }
        }

    }
};