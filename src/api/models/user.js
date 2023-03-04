const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            minlength: 5,
            require: true,
        },
        fullname: {
            type: String,
            minlength: 5,
            require: true,
        },
        phone: {
            type: Number,
        },
        address: {
            type: String,
        },
        role: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
            default: null,
        },
    },
    { timestamps: true },
    { collection: 'users' }
);

module.exports = mongoose.model('users', UserSchema);