const router = require('express').Router();
const authRoute = require('./authRoutes');
router.use('/auth', authRoute);





module.exports = router;