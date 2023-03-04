const router = require("express").Router();
const cartController = require("../controllers/cart.controller");
const { decodeToken } = require("../middlewares/decodeToken");

// router.post('/addToCart', decodeToken, cartController.addToCart);
router.post('/addToCart', decodeToken, cartController.addToCart);
router.post('/removeFromCart', decodeToken, cartController.removeFromCart);
router.put("/update", decodeToken, cartController.updateCart);

module.exports = router;