const UserModel = require('../user.model');
const DescopeClient = require('@descope/node-sdk').default;
const config = require('../../../config/config');
const sendVerificationEmail = require('../../../utilities/verificationMail');
const Wallet = require('../../wallet/wallet.model');
const generateReferralCode = require('../../../utilities/generateReferralCode');
const Settings = require('../../settings/settings.model');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // for password hashing
const crypto = require('crypto'); // to generate OTP

// const registerUser = async ({ email, password, referralCode }) => {
//   try {
//     // 1. Check if user already exists
//     const existingUser = await UserModel.findOne({ email, active: true });
//     if (existingUser) {
//       return { status: false, code: 409, msg: 'User with this email already exists.' };
//     }

//     // 2. Handle referral code
//     let referredBy = null;
//     if (referralCode) {
//       const referDetails = await UserModel.findOne({ referralCode });
//       if (!referDetails) {
//         return { status: false, code: 400, msg: 'Invalid referral code.' };
//       }
//       referredBy = new mongoose.Types.ObjectId(referDetails._id);
//     }

//     // 3. Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // 4. Generate OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

//     // 5. Create user in DB
//     const newUser = await UserModel.create({
//       email,
//       password: hashedPassword,
//       referralCode: referralCode || null,
//       referredBy,
//       otp,           // store OTP in DB
//       otpExpiresAt: Date.now() + 10 * 60 * 1000, // OTP valid for 10 minutes
//       active: true
//     });

//     // 6. Send OTP email
//     await sendVerificationEmail(email, otp);

//     return {
//       status: true,
//       code: 201,
//       data: {
//         id: newUser._id,
//         email: newUser.email,
//         referralCode: newUser.referralCode,
//         message: 'Registration successful. OTP sent to email.',
//       },
//     };
//   } catch (error) {
//     return { status: false, code: 500, msg: error.message || 'Internal Server Error' };
//   }
// };

// module.exports = registerUser;



// Final version of registerUser with OTP and password hashing
const registerUser = async ({ email }) => {
  try {
    // 1️⃣ Check if user already exists
    const existingUser = await UserModel.findOne({ email, active: true });
    if (existingUser) {
      return { status: false, code: 409, msg: 'User with this email already exists.' };
    }

    // 2️⃣ Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

    // 3️⃣ Create user in DB
    const newUser = await UserModel.create({
      email,
      otp,
      otpExpiresAt: Date.now() + 10 * 60 * 1000, // OTP valid for 10 minutes
      active: true,
    });

    // 4️⃣ Send OTP email
    await sendVerificationEmail(email, otp);

    return {
      status: true,
      code: 201,
      data: {
        id: newUser._id,
        email: newUser.email,
        message: 'OTP sent to email.',
      },
    };
  } catch (error) {
    console.error('Register User Error:', error);
    return { status: false, code: 500, msg: error.message || 'Internal Server Error' };
  }
};

module.exports = registerUser;