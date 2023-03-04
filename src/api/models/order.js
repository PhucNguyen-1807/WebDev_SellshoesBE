const mongoose = require("mongoose");

const order = new mongoose.Schema(
    {
        userId: { type: String, require: true },
        shoeId: {
            type: String,
            require: true,
        },
        quantity: {
            type: Number,
            default: 1,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("order", order);