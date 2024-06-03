const User = require('../models/uses');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require('../../commons/sendEmail');
const { v4: uuidv4 } = require('uuid');
const resetToken = require('../models/resetToken');

const updateRefreshToken = async (userId, refreshToken) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $set: { refreshToken: refreshToken } },
            {
                new: true,
            }
        );
    } catch (error) {
        throw new createError(error);
    }
};

module.exports = {
    //ĐĂNG KÝ
    register: async (body) => {
        const { email, password, fullname, address, phone, role } = body;
        try {
            const user = await User.findOne({ email });
            if (user) {
                throw new createError(400, 'User already exist');
            }
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            const resMongoDB = await User.create({
                email,
                password: hashPassword,
                fullname,
                address,
                phone,
                role,
            });
            const accessToken = jwt.sign(
                { userId: resMongoDB._id, email, role: resMongoDB.role },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d',
                }
            );
            const refreshToken = jwt.sign(
                { userId: resMongoDB._id, email, role: resMongoDB.role },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d',
                }
            );
            await updateRefreshToken(resMongoDB._id, refreshToken);
            return {
                statusCode: 201,
                message: 'Create user success!',
                token: {
                    accessToken,
                    refreshToken,
                },
            };
        } catch (error) {
            if (error) {
                throw error;
            }
            throw new createError(500, 'Cannot create User');
        }
    },
    //ĐĂNG NHẬP
    logIn: async ({ email, password: plainPassword }) => {
        try {

            let filterUser = await User.find({ email: email });
            if (filterUser.length === 1) {
                if (await bcrypt.compare(plainPassword, filterUser[0].password)) {
                    const accessToken = jwt.sign(
                        {
                            userId: filterUser[0]._id,
                            email: filterUser[0].email,
                            role: filterUser[0].role,
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: '1d',
                        }
                    );
                    const refreshToken = jwt.sign(
                        {
                            userId: filterUser[0]._id,
                            email: filterUser[0].email,
                            role: filterUser[0].role,
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: '1d',
                        }
                    );
                    await updateRefreshToken(filterUser[0]._id, refreshToken);
                    return {
                        error: false,
                        msg: 'Login success!',
                        data: filterUser[0].role,
                        token: {
                            accessToken,
                            refreshToken,
                        },
                    };
                } else {
                    throw new createError(401, 'Wrong Password');
                }
            } else {
                throw new createError(404, 'User not found');
            }
        } catch (error) {
            if (error) throw error;
            throw new createError(500, 'Cannot get all users');
        }
    },
    //QUÊN MẬT KHẨU
    forgetPassword: async (email) => {
        try {
            let info = await sendMail(email, uuidv4());
            return {
                messageId: info.messageId,
                statusCode: 200,
                message: 'Send success!',
            };
        } catch (error) {
            throw new createError(error);
        }
    },
    resetPassword: async (userId, token, newPassword) => {
        try {
            const isValidToken = await resetToken.findOne({
                userId,
                resetToken: token,
            });
            if (!isValidToken) {
                throw new createError(400, 'Token is not valid');
            }
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(newPassword, salt);
            const user = await User.findOneAndUpdate(
                { _id: userId },
                { password: hashPassword },
                { new: true }
            );
            return {
                statusCode: 200,
                message: 'Reset password success!',
            };
        } catch (error) {
            throw new createError(error);
        }
    },
    token: async (body) => {
        let { refreshToken } = body;
        try {
            if (!refreshToken) {
                throw new createError(401, 'refreshToken is required');
            }
            const user = await User.findOne({ refreshToken: refreshToken });
            if (!user) {
                throw new createError(403, 'refreshToken invalid');
            }

            const accessToken = jwt.sign(
                {
                    userId: user._id,
                    email: user.email,
                    role: user.role,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '3h',
                }
            );
            refreshToken = jwt.sign(
                {
                    userId: user._id,
                    email: user.email,
                    role: user.role,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '5h',
                }
            );

            await updateRefreshToken(user._id, refreshToken);
            return {
                statusCode: 200,
                message: 'Excellent process!',
                tokens: {
                    accessToken,
                    refreshToken,
                },
            };
        } catch (error) {
            throw new createError(error);
        }
    },
    //ĐĂNG XUẤT
    logout: async (userId) => {
        try {
            const user = await User.findOne({ _id: userId });
            updateRefreshToken(user._id, null);
            return {
                statusCode: 200,
                message: 'Logout success!',
            };
        } catch (error) {
            throw new createError(error);
        }
    },
};