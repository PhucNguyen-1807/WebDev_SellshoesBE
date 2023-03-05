const express = require("express");
const router = express.Router();
const fileUploader = require('../configs/cloudinary.config');
const shoeController = require("../controllers/ShoeController");

router.post('/create',fileUploader.single('image'),shoeController.create)
router.get('/all-shoes',shoeController.read)
router.get('/:id',shoeController.show)
router.put('/:id',fileUploader.single('image'),shoeController.update)
router.delete('/:id',shoeController.delete)



module.exports = router;
