// mailer.js
import transporter from "../config/nodemailer.js";

/**
 * Sends a welcome email to a new user
 * @param {string} email - Recipient email
 * @param {string} userName - Recipient name (optional, for personalization)
 */
export const sendWelcomeEmail = async (email, userName = "") => {
  try {
    const mailOptions = {
      from:`"Hamro Aadhiyan" <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "Welcome to Hamro Aadhiyan!!!",
      html: `
      <div style="font-family:sans-serif; text-align:center; background-color:#f4f4f4; padding:20px;">
        <h2 style="color:#333;">Welcome to Hamro Aadhiyan${userName ? `, ${userName}` : ""}!</h2>
        <p style="color:#555;">We're excited to have you on board. Thank you for joining our community.</p>
        <p style="color:#555;">If you have any questions or need assistance, feel free to reach out to our support team.</p>
        <p style="color:#555;">Best regards,<br/>The Hamro Aadhiyan Team</p>
        <a href="https://www.hamroaadhiyan.com" style="display:inline-block; margin-top:20px; padding:10px 20px; background-color:#28a745; color:#fff; text-decoration:none; border-radius:5px;">Visit Our Website</a>
      </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent to:", email);
    return true;
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }
};
