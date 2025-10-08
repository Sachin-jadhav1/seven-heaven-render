const nodemailer = require('nodemailer');
const UserModel = require('../user.model');
const sendVerificationEmail = require('../../../utilities/verificationMail');

const sendLoginOtp = async (email) => {
  try {
    const user = await UserModel.findOne({ email, active: true });
    if (!user) {
      return { status: false, msg: 'User not found.' };
    }

    if (!user.isVerified) {
      return { status: false, msg: 'Email not verified yet.' };
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry
    await user.save();

    // Send OTP via email
    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.gmail.com',
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // });

    // await transporter.sendMail({
    //   from: `"Heaven App" <${process.env.EMAIL_USER}>`,
    //   to: email,
    //   subject: 'Your Login OTP',
    //   text: `Your login OTP is ${otp}`,
    // });

        await sendVerificationEmail(email, otp);
    

    return { status: true, data: { email, message: 'OTP sent successfully.' } };
  } catch (error) {
    console.error('Send Login OTP Error:', error);
    return { status: false, msg: 'Internal server error.' };
  }
};

module.exports =  sendLoginOtp ;
