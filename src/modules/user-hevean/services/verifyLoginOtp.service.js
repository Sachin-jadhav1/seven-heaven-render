const jwt = require('jsonwebtoken');
const UserModel = require('../user.model');


const verifyLoginOtp = async (email, otp) => {
  try {
    const user = await UserModel.findOne({ email, active: true });
    if (!user) return { status: false, msg: 'User not found.' };

    if (!user.isVerified) return { status: false, msg: 'Email not verified yet.' };

    if (!user.otp || !user.otpExpiresAt || user.otpExpiresAt < new Date()) {
      return { status: false, msg: 'OTP expired. Please request a new OTP.' };
    }

    if (user.otp !== otp) return { status: false, msg: 'Invalid OTP. Please try again.' };

    // Clear OTP
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    // Generate JWT token (optional)
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return { status: true, data: { email: user.email, userId: user.userId, token, message: 'Login successful.' } };
  } catch (error) {
    console.error('Verify Login OTP Error:', error);
    return { status: false, msg: 'Internal server error.' };
  }
};

module.exports = verifyLoginOtp ;
