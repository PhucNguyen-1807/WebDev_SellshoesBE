const router = require("express").Router();
const orderController = require("../controllers/order.controller");
const { decodeToken } = require("../middlewares/decodeToken");

router.post("/addToOrder", decodeToken, orderController.addToOrder);
router.get("/", decodeToken, orderController.readOrder)

module.exports = router;