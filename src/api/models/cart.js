const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, require: true },
    shoeId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    isChecked: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("cart", CartSchema);