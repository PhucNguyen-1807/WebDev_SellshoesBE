const router = require('express').Router();
const authRoute = require('./authRoutes');
const cartRoute = require("./cartRoute");
const orderRoute = require("./orderRoute");
const siteRouter = require('./siteRoute');
const shoesRouter = require('./shoeRoute');

router.use('/auth', authRoute);
router.use("/cart", cartRoute);
router.use("/order", orderRoute);
router.use('/shoes', shoesRouter);
router.use('/', siteRouter);
//router.use('/uploads', uploadRouter);

module.exports = router;
