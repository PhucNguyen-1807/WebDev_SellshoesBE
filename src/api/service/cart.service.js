const Cart = require("../models/cart")
const Shoe = require("../models/shoe");

module.exports = {
    addToCart: async (userId, shoeId, count) => {
        const checkShoe = await Shoe.findById(shoeId);
        if (!checkShoe) {
            return {
                message: "shoe is not exist",
                data: null,
                statusCode: 400,
            }
        }
        else {
            const check = await Cart.findOne({ userId: userId, shoeId: shoeId });
            // plus quantity of shoe in cart of user by 1 
            if (check) {
                const updateCart = await Cart.findOneAndUpdate(
                    { userId: userId, shoeId: shoeId },
                    { $inc: { quantity: count } },
                    { new: true }
                );
                return {
                    message: "update cart successfully",
                    data: null,
                    statusCode: 200,
                }
            }
            else {
                const newCart = new Cart({
                    userId,
                    shoeId,
                    count
                });
                await newCart.save();

                return {
                    message: "add to cart successfully",
                    data: null,
                    statusCode: 200,
                }
            }
        }
    },
    removeFromCart: async (userId, shoeId) => {
        const check = await Cart.findOne({ userId: userId, shoeId: shoeId });
        // minus quantity of shoe in cart of user by 1 
        if (check) {
            await Cart.findOneAndDelete({ userId: userId, shoeId: shoeId });
        } else {
            return {
                message: "shoe is not in cart",
                data: null,
                statusCode: 400,
            }
        }
    },
    updateCart: async (userId, shoeId, count, isChecked) => {
        const check = await Cart.findOne({ userId: userId, shoeId: shoeId });
        // minus quantity of shoe in cart of user by 1 
        if (check) {
            const updateCart = await Cart.findOneAndUpdate(
                { userId: userId, shoeId: shoeId },
                { quantity: count, isChecked: isChecked },
                { new: true }
            );
            // if quantity of shoe in cart of user is 0, remove it from cart
            if (updateCart.quantity === 0) {
                await Cart.findOneAndDelete({ userId: userId, shoeId: shoeId });
            }
            return {
                message: "update cart successfully",
                data: null,
                statusCode: 200,
            }
        }
        else {
            return {
                message: "shoe is not in cart",
                data: null,
                statusCode: 400,
            }
        }
    }
}

