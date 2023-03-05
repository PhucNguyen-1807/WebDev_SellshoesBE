const express = require("express");
const router = express.Router();
const shoeController = require("../controllers/ShoeController");
const fileUploader = require('../configs/cloudinary.config');
const {verifyToken} = require("../middlewares/verifyToken");
const {verifyAdmin} = require("../middlewares/verifyAmin");

//Read all
router.get('/all-shoes', shoeController.read);

//Read
router.get('/:id', shoeController.show);

//Admin role
//Create
router.post('/create', verifyToken, verifyAdmin, fileUploader.single('image'), shoeController.create);

//Delete
router.delete('/:id', verifyToken, verifyAdmin, shoeController.delete);

//Update
router.put('/:id',verifyToken, verifyAdmin, fileUploader.single('image'), shoeController.update);



module.exports = router;
