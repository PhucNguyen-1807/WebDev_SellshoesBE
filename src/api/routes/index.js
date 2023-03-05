const router = require('express').Router();
const authRoute = require('./authRoutes');
const cartRoute = require("./cartRoute");
const orderRoute = require("./orderRoute");
const shoesRouter = require('./shoeRoute');

router.use('/auth', authRoute);
router.use("/cart", cartRoute);
router.use("/order", orderRoute);
router.use('/shoes', shoesRouter);

module.exports = router;
