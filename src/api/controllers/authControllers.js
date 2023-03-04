const authService = require('../services/authServices');
const jwt = require('jsonwebtoken');

module.exports = {
    //ĐĂNG KÝ
    register: async (req, res, next) => {
        try {
            const DTO = await authService.register(req.body);
            res.status(201).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    //ĐĂNG NHẬP
    logIn: async (req, res, next) => {
        try {
            let DTO = await authService.logIn(req.body);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    //QUÊN MẬT KHẨU
    forgetPassword: async (req, res, next) => {
        try {
            const { email } = req.body;
            const DTO = await authService.forgetPassword(email);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    resetPassword: async (req, res, next) => {
        try {
            const { userId } = req.user;
            const { newPassword, token } = req.body;
            const DTO = await authService.resetPassword(userId, token, newPassword);

            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    token: async (req, res, next) => {
        try {
            const DTO = await authService.token(req.body);

            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    //ĐĂNG XUẤT
    logout: async (req, res, next) => {
        try {
            const userId = req.user.userId;
            const DTO = await authService.logout(userId);
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
};
