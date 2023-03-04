const Shoe = require("../Models/shoe");
const { mongooseToObj } = require("../../util/mongoose");
const { multipleMongooseToObj } = require("../../util/mongoose");
class MeController {
  // [Get] /me/stored/shoes
  storedShoes(req, res) {
    Shoe.find({}).then((shoes) => {
      res.render("me/stored-shoes", {
        shoes: multipleMongooseToObj(shoes),
      });
    });
  }
}
module.exports = new MeController();
