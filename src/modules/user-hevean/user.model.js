const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    // password: {
    //     type: String,
    //     required: true
    // },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String
    },
    otp: {
        type: String
    },
    otpExpiresAt: {
        type: Date
    },
    userId: {
        type: String,
        unique: true,
        sparse: true, // allows null values
        trim: true
    },
    // referralCode: {
    //     type: String,
    //     unique: true,
    //     sparse: true
    // },
    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true // automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('user', userSchema);
