const express = require("express");
const router = express.Router();
const shoeController = require("../controllers/shoeController");
const {verifyToken} = require("../middlewares/verifyToken");
const {verifyAdmin} = require("../middlewares/verifyAmin");


router.post('/store', shoeController.store); 
router.get('/:id/edit',shoeController.edit);

//Read
router.get('/:slug',shoeController.show);

//Admin role
//Create
router.post('/create', verifyToken, verifyAdmin, shoeController.create);

//Delete
router.delete('/:id', verifyToken, verifyAdmin,shoeController.delete);

//Update
router.put('/:id',verifyToken, verifyAdmin, shoeController.update);

module.exports = router;
