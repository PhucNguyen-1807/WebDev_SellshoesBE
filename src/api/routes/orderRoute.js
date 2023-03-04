const router = require("express").Router();
const orderController = require("../controllers/orderController");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/addToOrder", verifyToken, orderController.addToOrder);
router.post("/removeFromCart", verifyToken, orderController.removeFromCart);
router.get("/", verifyToken, orderController.readOrder)

module.exports = router;
