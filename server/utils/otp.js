// utils/otp.js
import transporter from "../config/nodemailer.js";

export const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendOtpEmail = async (email, subject, otp, validityMinutes = 10) => {
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject,
        text: `Your OTP is ${otp}. It is valid for ${validityMinutes} minutes.`,
    };
    return await transporter.sendMail(mailOptions);
};
