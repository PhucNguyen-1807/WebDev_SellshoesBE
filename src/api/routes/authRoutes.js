const router = require('express').Router();
const authController = require('../controllers/authControllers');
const { verifyToken } = require('../middlewares/verifyToken');
const { authValidate, schema } = require('../../validations/authValidate');

router.post('/register', authValidate(schema.register), authController.register);

router.post('/login', authValidate(schema.login), authController.logIn);

router.post('/token', authController.token);

router.post('/forget-password', authController.forgetPassword);

router.post('/reset-password', verifyToken, authController.resetPassword);

router.get('/logout', verifyToken, authController.logout);

module.exports = router;

