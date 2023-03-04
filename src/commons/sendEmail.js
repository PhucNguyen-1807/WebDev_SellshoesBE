const nodemailer = require('nodemailer');
const createError = require('http-errors');
const resetToken = require('../api/models/resetToken');
const User = require('../api/models/uses');

async function sendResetLink(recipient, token) {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAUTH2',
                user: 'huycuong121c@gmail.com',
                clientId: process.env.NODEMAILER_CLIENT_ID,
                clientSecret: process.env.NODEMAILER_CLIENT_SECRET,
                accessToken: process.env.NODEMAILER_ACCESS_TOKEN,
                refreshToken: process.env.NODEMAILER_REFRESH_TOKEN,
            },
        });

        const mailOptions = {
            from: '"Webdev_Sellshoes" <huycuong121c@gmail.com>',
            to: recipient,
            subject: 'Reset password link',
            html: `<p>Your reset link: <b>http://localhost:3000/${token}</b></p>`,
        };

        let info = await transporter.sendMail(mailOptions);
        const user = await User.findOne({ email: recipient });

        if (!user) {
            throw new createError(400, 'NOT FOUND USER');
        }

        const newResetToken = new resetToken({ userId: user._id, resetToken: token });
        await newResetToken.save();
        return info;
    } catch (error) {
        throw new createError(error);
    }
}

module.exports = sendResetLink;
