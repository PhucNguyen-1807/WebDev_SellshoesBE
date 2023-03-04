const router = require("express").Router();
const cartRoute = require("../controllers/cart.controller");
const orderRoute = require("../controllers/order.controller");
const siteRouter = require('./site')
const shoesRouter = require('./shoes')
const meRouter = require('./me')




router.use("/cart", cartRoute);
router.use("/order", orderRoute);

router.use('/shoes', shoesRouter)
router.use('/', siteRouter)
router.use('/uploads', uploadRouter);
module.exports = router;