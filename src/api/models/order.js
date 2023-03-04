const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            require: true
        },
        shoeId: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
        },
        count: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);