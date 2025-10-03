// utils/otp.js
import transporter from "../config/nodemailer.js";

export const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendOtpEmail = async (email, subject, otp, validityMinutes = 10) => {
    const otpHtml = otp
    .split("")
    .map(
      (digit) => `
     <span style="
       display:inline-block;
       margin:5px;
       padding:15px 20px;
       font-size:20px;
       font-weight:bold;
       background-color:#f3f3f3;
       border-radius:8px;
       border:1px solid #ddd;
     ">${digit}</span>`
    )
    .join("");

    const mailOptions = {
        from:`"Hamro Aadhiyan" <${process.env.SENDER_EMAIL}>`,
        to: email,
        subject,
        html: `
        <div style="font-family:sans-serif; text-align:center;">
              <h2>🔐 Your OTP Code</h2>
              <p>Please use the following OTP to verify:</p>
              <div style="margin-top:20px;">
                ${otpHtml}
              </div>
              <p style="margin-top:20px; color:gray; font-size:12px;">
                This OTP will expire in 10 minutes.
              </p>
            </div>`,
    };
    return await transporter.sendMail(mailOptions);
};
