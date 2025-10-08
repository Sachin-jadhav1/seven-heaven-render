const nodemailer = require('nodemailer');
const config = require('../config/config'); // Ensure your config file has the email configuration
const generateToken = require('./emailGenerateToken');

// Create a reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: config.SMTP.EMAIL_HOST, // e.g., 'smtp.gmail.com'
    port: config.SMTP.EMAIL_PORT, // e.g., 587
    secure: config.SMTP.EMAIL_SECURE, // true for 465, false for other ports
    auth: {
        user: config.SMTP.EMAIL_USER, // your email
        pass: config.SMTP.EMAIL_PASS  // your email password or application-specific password
    }
});

// Function to send a verification email
// const sendVerificationEmail = async (userEmail, verificationToken) => {
//     try {
//         const verificationToken = generateToken(userEmail); // Generate the JWT token
//         const verificationUrl = `${config.FRONTEND_URL}verify?token=${verificationToken}`;

//         // Set up email data with Unicode symbols
//         const mailOptions = {
//             from: config.EMAIL_USER,
//             to: userEmail,
//             subject: 'Email Verification',
//             text: `Please verify your email by clicking the following link: ${verificationUrl}`,
//             html: `<p>Please verify your email by clicking the following link: <a href="${verificationUrl}">Verify Email</a></p>`
//         };
//         // Send mail with defined transport object
//         let info = await transporter.sendMail(mailOptions);
//         console.log('Message sent: %s', info.messageId);
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//         return { msg: 'Verification email sent successfully.', status: true };
//     } catch (error) {
//         console.error('Error sending verification email:', error);
//         return { msg: 'Failed to send verification email.', status: false, error: error.message };
//     }
// };

// module.exports = sendVerificationEmail;



// Function to send OTP email
const sendVerificationEmail = async (userEmail, otp) => {
    try {
        if (!otp) throw new Error('OTP is required to send verification email');

        // Set up email data
        const mailOptions = {
            from: config.SMTP.EMAIL_USER,
            to: userEmail,
            subject: 'Your Email Verification OTP',
            text: `Your verification OTP is: ${otp}. It is valid for 10 minutes.`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height:1.5; color:#333;">
                    <h2>Email Verification</h2>
                    <p>Your one-time password (OTP) is:</p>
                    <h1 style="background:#f4f4f4; padding:10px 20px; display:inline-block; border-radius:5px; color:#000;">
                        ${otp}
                    </h1>
                    <p>This OTP is valid for 10 minutes. Do not share it with anyone.</p>
                    <p>Best regards,<br/>The Team</p>
                </div>
            `
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        return { msg: 'OTP sent successfully.', status: true };
    } catch (error) {
        console.error('Error sending OTP email:', error);
        return { msg: 'Failed to send OTP email.', status: false, error: error.message };
    }
};

module.exports = sendVerificationEmail;

// const sendVerificationEmail = async (userEmail, otp) => {
//   try {
//     // Setup transporter
//     const transporter = nodemailer.createTransport({
//       host: config.EMAIL_HOST,
//       port: config.EMAIL_PORT,
//       secure: config.EMAIL_SECURE, // true for 465, false for others
//       auth: {
//         user: config.EMAIL_USER,
//         pass: config.EMAIL_PASS
//       },
//     });

//     // ✅ Send OTP email (not verification link)
//     const mailOptions = {
//       from: `"Heaven Support" <${config.EMAIL_USER}>`,
//       to: userEmail,
//       subject: 'Your Email Verification OTP',
//       text: `Your one-time verification code is: ${otp}. It will expire in 10 minutes.`,
//       html: `
//         <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
//           <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; padding: 20px;">
//             <h2 style="text-align: center; color: #2b2b2b;">Email Verification</h2>
//             <p style="font-size: 16px; color: #333;">
//               Your one-time password (OTP) for verifying your email address is:
//             </p>
//             <div style="text-align: center; margin: 20px 0;">
//               <h1 style="letter-spacing: 5px; color: #007bff;">${otp}</h1>
//             </div>
//             <p style="font-size: 14px; color: #555;">
//               This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone.
//             </p>
//             <hr/>
//             <p style="text-align: center; color: #888; font-size: 12px;">
//               &copy; ${new Date().getFullYear()} Heaven. All rights reserved.
//             </p>
//           </div>
//         </div>
//       `
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log('✅ OTP email sent:', info.messageId);

//     return { msg: 'OTP sent successfully.', status: true };
//   } catch (error) {
//     console.error('❌ Error sending OTP email:', error);
//     return { msg: 'Failed to send OTP email.', status: false, error: error.message };
//   }
// };

// module.exports = sendVerificationEmail;
