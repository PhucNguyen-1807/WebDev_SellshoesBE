const router = require("express").Router();
// const authRoute = require("./api/auth/");
// const shoesRoute = require("./api/shoes/");
const cartRoute = require("../controllers/cart.controller");
const orderRoute = require("../controllers/order.controller");

// router.use("/auth", authRoute);
// router.use("/shoes", shoesRoute);
router.use("/cart", cartRoute);
router.use("/order", orderRoute);

module.exports = router;