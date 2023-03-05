const Shoe = require("../models/shoe");
const { mongooseToObj } = require("../services/mongoose");
const { multipleMongooseToObj } = require("../services/mongoose");
class ShoeController {
  //[CREATE] shoes/create
  create(req, res, next) {
    if (!req.file) {
      next(new Error("No file uploaded!"));
      res.status(404);
      return;
    }
    const formData = req.body;
    formData.image = req.file.path;
    const shoe = new Shoe(formData);
    shoe.save()
      .then(() => {
        res.status(200).json("success");
      })
      .catch((err) => res.status(404));
  }
  // [GET] /shoes/all-shoes
  read(req, res, next) {
    Shoe.find({})
      .then((shoes) => {
        shoes = multipleMongooseToObj(shoes);
        res.status(200).json(shoes);
      })
      .catch((err) => res.status(404).json("Not Found"));
  }
  // [PUT] shoes/:id
  update(req, res, next) {
    if (!req.file) {
      next(new Error("No file uploaded!"));
      res.status(404);
      return;
    }
    const formData = req.body;
    formData.image = req.file.path;
    Shoe.updateOne({ _id: req.params.id }, formData)
      .then(() => res.status(200).redirect("/"))
      .catch(next);
  }
  // [DELETE] shoes/:id
  delete(req, res, next) {
    Shoe.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json("deleted").redirect("back");
      })
      .catch(next);
  }

  // [GET] /shoes/:id
  show(req, res, next) {
    Shoe.findOne({ _id: req.params.id })
      .then((shoe) => {
        res.status(200).json(mongooseToObj(shoe));
      })
      .catch((err) => res.status(404).json("Not Found"));
  }
}
module.exports = new ShoeController();
