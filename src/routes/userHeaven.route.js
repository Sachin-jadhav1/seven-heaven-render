// const express = require('express');
// const { registerUser, login, verifyEmail, resendVerifycationEmail, getReffredUsers, updateUserStatus,
//     forgotPassword, sendResetLink, getAllUsers,updateUserById,getUserById, deleteUserById, getMyDetails, getLeaderboard, sendForgotOtp } = require('../modules/user/controllers');
// const validate = require("../middlewares/validate")
// const userValidation = require("../modules/user/user.validations");
// const auth = require('../middlewares/auth');
// const authenticate = require('../middlewares/authonticate');
const express = require('express');
const { registerUsers, verifyCode, createUserId, sendLoginOtp,verifyLoginOtp}= require('../modules/user-hevean/controllers');
const router = express.Router();

// login and register routes
router.route('/login/send-otp').post(sendLoginOtp)
router.route('/login/verify-otp').post(verifyLoginOtp)


//register route
router.route('/register-users').post(registerUsers)
router.route('/verify-code').post(verifyCode)
router.route('/create-userid').post(createUserId)


module.exports = router;