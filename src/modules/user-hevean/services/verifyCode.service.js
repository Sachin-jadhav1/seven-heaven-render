const UserModel = require('../user.model');
const mongoose = require('mongoose');

/**
 * Verify OTP / Code
 * - Checks if code matches the stored verificationCode
 * - Marks user as verified
 */

const verifyCode = async (email, otp) => {
  try {
    // 1️⃣ Find active user by email
    const user = await UserModel.findOne({ email, active: true });
    if (!user) {
      return { status: false, code: 400, msg: 'User not found.' };
    }
      console.log("User found in verifyCode service", user)
    // 2️⃣ Check if already verified
    if (user.isVerified) {
      return { status: false, code: 409, msg: 'User already verified.' };
    }

    // 3️⃣ Check if OTP exists
    if (!user.otp) {
      return { status: false, code: 400, msg: 'No OTP found. Please request a new code.' };
    }

    // 4️⃣ Check OTP expiry
    if (user.otpExpiresAt && user.otpExpiresAt < new Date()) {
      return { status: false, code: 400, msg: 'OTP expired. Please request a new code.' };
    }

    // 5️⃣ Check OTP match
    if (user.otp !== otp) {
      return { status: false, code: 400, msg: 'Invalid OTP. Please check and try again.' };
    }

    // 6️⃣ Mark user as verified
    user.isVerified = true;
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    return {
      status: true,
      opt: 200,
      data: { email: user.email, message: 'Email verified successfully.' },
    };
  } catch (error) {
    console.error('VerifyCode Service Error:', error);
    return { status: false, code: 500, msg: 'Internal server error.' };
  }
};

module.exports = verifyCode;

// const verifyCode = async (email, code) => {
//   try {
//     // 1. Find user by email
//     const user = await UserModel.findOne({ email, active: true });
//     if (!user) {
//       return { status: false, code: 400, msg: 'User not found.' };
//     }

//     // 2. Check if already verified
//     if (user.isVerified) {
//       return { status: false, code: 409, msg: 'User already verified.' };
//     }

//     // 3. Check verification code
//     if (user.verificationCode !== code) {
//       return { status: false, code: 400, msg: 'Invalid verification code.' };
//     }

//     // 4. Update user as verified
//     user.isVerified = true;
//     user.verificationCode = null; // optional: remove code after verification
//     await user.save();

//     return {
//       status: true,
//       code: 200,
//       data: { email: user.email, message: 'Email verified successfully.' },
//     };
//   } catch (error) {
//     return { status: false, code: 500, msg: error.message || 'Internal Server Error' };
//   }
// };

// module.exports = verifyCode;
