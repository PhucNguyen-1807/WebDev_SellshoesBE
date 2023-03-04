const express = require("express");
const router = express.Router();
const shoeController = require("../controllers/shoeController");

router.get('/create',shoeController.create);
router.post('/store', shoeController.store);
router.get('/:id/edit', shoeController.edit);
router.get('/:slug', shoeController.show);
router.put('/:id', shoeController.update);
router.delete('/:id', shoeController.delete);

module.exports = router;
