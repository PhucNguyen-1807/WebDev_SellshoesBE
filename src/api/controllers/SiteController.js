const Shoe = require("../Models/shoe");
const { multipleMongooseToObj } = require("../../util/mongoose");
// require('../../dotenv').config();
class SiteController {
  // [Get =&gt; news]
  index(req, res, next) {
    // res.render('home');
    Shoe.find({})
      .then((shoes) => {
        shoes = multipleMongooseToObj(shoes);
        res.render("home", {
          shoes,
        });
        console.log(process.env.PASSWORD);
      })
      .catch(next);
  }
  search(req, res) {
    res.render("search");
  }
}
module.exports = new SiteController();
