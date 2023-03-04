const express = require('express');
const uploadRouter = express.Router();
const fileUploader = require('../config/cloudinary/cloudinary.config');
const Shoe = require("../app/Models/shoe");


uploadRouter.post('/cloudinary-upload-save-mongodb', fileUploader.single('image'), (req, res, next) => {
  
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
    const formData = req.body;
    formData.image=req.file.path
    const shoe = new Shoe(formData);
    shoe.save()
      .then(() => {
        res.status('200')
        res.redirect("/");
      })
      .catch(err=>res.status('401'));

});


module.exports = {uploadRouter}
