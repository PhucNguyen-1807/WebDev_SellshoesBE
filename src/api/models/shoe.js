const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const Shoe = new Schema(
    {
        name: { type: String, default: "", maxLength: 50 },
        price: { type: String, default: "", maxLength: 50 },
        image: { type: String, default: "", },
        slug: { type: String, slug: "name", unique: true },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Shoe", Shoe);
