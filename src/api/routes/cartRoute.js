const router = require("express").Router();
const cartController = require("../controllers/cartController");
const { verifyToken } = require("../middlewares/verifyToken");

router.post('/addToCart', verifyToken, cartController.addToCart);
router.post('/removeFromCart', verifyToken, cartController.removeFromCart);
router.put("/update", verifyToken, cartController.updateCart);
router.get("/", verifyToken, cartController.readCart)

module.exports = router;
