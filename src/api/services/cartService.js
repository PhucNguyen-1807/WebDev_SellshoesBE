const Cart = require("../models/cart")
const Shoe = require("../models/shoe");

module.exports = {
    addToCart: async (userId, shoeId, Count) => {
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
            if (check) {
                // const updateCart = await Cart.findOneAndUpdate(
                //     { userId: userId, shoeId: shoeId },
                //     { quantity: check.count + Count },
                //     { new: true }
                // );
                check.count += Count;
                await check.save();
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
                    count: Count
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
            return {
                message: "remove from cart successfully",
                data: null,
                statusCode: 200,
            }
        } else {
            return {
                message: "shoe is not in cart",
                data: null,
                statusCode: 400,
            }
        }
    },
    updateCart: async (userId, shoeId, count, isChecked) => {
        const updateCart = await Cart.findOne({ userId: userId, shoeId: shoeId });
        // minus quantity of shoe in cart of user by 1 
        if (updateCart) {
            // const updateCart = await Cart.findOneAndUpdate(
            //     { userId: userId, shoeId: shoeId },
            //     { quantity: count, isChecked: isChecked },
            //     { new: true }
            // );
            // if quantity of shoe in cart of user is 0, remove it from cart
            updateCart.count = count;
            updateCart.isChecked = isChecked;
            await updateCart.save();
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
    },
    readCart: async (userId) => {
        const CART = await Cart.find({ userId: userId });
        return {
            message: "",
            data: CART,
            statusCode: 200,
        }
    }
}

