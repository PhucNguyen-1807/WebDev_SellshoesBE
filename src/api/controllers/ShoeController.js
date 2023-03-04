const Shoe = require("../Models/shoe");
const { mongooseToObj } = require("../../util/mongoose");
// var {filePath}=require("../../routes/upload")
class ShoeController {
  // [Get] /shoes/:slug
  show(req, res, next) {
    Shoe.findOne({ slug: req.params.slug })
      .then((shoe) => {
        res.render("shoes/show", { shoe: mongooseToObj(shoe) });
      })
      .catch(next);
  }
  // [GET] /shoes/create
  // create(req, res, next) {
  //   res.render("shoes/create");
  // }
  // [POST] /shoes/store
  // store(req, res, next) {
    
  //   const formData = req.body;
  //   console.log(formData)
  //   const shoe = new Shoe(formData);
  //   shoe.save()
  //     .then(() => {
  //       console.log("save successfully");
  //       res.redirect("/");
  //     })
  //     .catch(next);
  // }
  edit(req, res, next) {
    Shoe.findById(req.params.id)
      .then((shoe) =>
        res.render("shoes/edit", {
          shoe: mongooseToObj(shoe),
        })
      )
      .catch(next);
  }
  // [PUT] shoes/:id
  update(req, res, next) {
    Shoe.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/shoes"))
      .catch(next);
  }
// [DELETE] shoes/:id
  delete(req, res, next) {
    Shoe.deleteOne({ _id: req.params.id })
      .then(() => {
        console.log('deleted')
        res.redirect("back");
    })
      .catch(next);
  }
}
module.exports = new ShoeController();
