import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/users.models.js";
import { generateOtp, sendOtpEmail } from "../utils/otp.js";
import { sendWelcomeEmail } from "../utils/welcomemail.js";

// Register a new user
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
       if(!name || !email || !password){
        return res.status(400).json({message: "Please fill all the fields"})
       }

    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        console.log("🔥 TOKEN GENERATED WITH ID! 🔥"); // <--- ADD THIS LINE

        // Create and assign a token
           res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            domain: 'localhost',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

     try {
              await sendWelcomeEmail(email,name);

     } catch (error) {
           console.log("Error sending welcome email:", error.message);
        
     }
        res.status(201).json({success:true, message: "User registered successfully",userId: newUser._id, token: token,  });
    } catch (error) {
        console.log("❌ Registration Error : ",error.message);
        res.status(500).json({ message: "Server error" });
    }
};

export const loginUser = async (req, res) => { 
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({message: "Please fill all the fields"})
       }
    try {
        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Create and assign a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        console.log("🔥 TOKEN GENERATED WITH ID! 🔥"); // <--- ADD THIS LINE
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            domain: 'localhost',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.status(200).json({success:true, message: "Logged in successfully",userId: user._id, token: token });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
    } 
}

export const logoutUser = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });
    res.status(200).json({ message: "Logged out successfully" });
}

export const sendOtp = async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await userModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      if (user.isAccountVerified) {
        return res.status(400).json({ success: false, message: "Account already verified" });
      }
  
      const otp = generateOtp();
      const otpExpireAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
  
      user.verifyOtp = otp;
      user.verifyOtpExpireAt = otpExpireAt;
      await user.save();
  
      // Try sending the email
      await sendOtpEmail(user.email, "Account Verification OTP", otp);
  
      // ✅ Only reach here if everything succeeded
      return res.status(200).json({
        success: true,
        message: "OTP sent to your email successfully.",
      });
  
    } catch (error) {
      console.error("Error sending OTP email:", error.message);
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP. Please try again later.",
      });
    }
  };
  
export const verifyEmail = async (req, res) => {
    const { otp } = req.body;
    const userId = req.user.id;
    if(!otp){
        return res.status(400).json({success:false,message: "Please provide email and otp"})
       }
    try {
        const user = await userModel.findById(userId);
            if (!user) {
                return res.status(404).json({success:false, message: "User not found" });
            }
            if (user.isAccountVerified) {
                return res.status(400).json({success:false, message: "Account already verified" });
            }
            if (user.verifyOtp !== otp || Date.now() > user.verifyOtpExpireAt) {
                return res.status(400).json({success:false, message: "Invalid or expired OTP" });
            }

            user.isAccountVerified = true;
            user.verifyOtp = null;
            user.verifyOtpExpireAt = null;
            await user.save();
            res.status(200).json({success:true, message: "Account verified successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false, message: "Server error" });
    }
}
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if(!email){
        return res.status(400).json({message: "Please provide email"})
       }
    try {
        const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const otp = generateOtp();
            const otpExpireAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
            user.resetOtp = otp;
            user.resetOtpExpireAt = otpExpireAt;
            await user.save();
            try {
                await sendOtpEmail(email, "Password Reset OTP", otp);
                res.status(200).json({ message: "Password reset OTP sent to email" });
            } catch (error) {
                console.log("Error sending password reset OTP email:", error.message);
                res.status(500).json({ message: "Error sending OTP email" });
            }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
    }
}
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    if(!email || !otp || !newPassword){
        return res.status(400).json({message: "Please provide email, otp and new password"})
       }
    try {
        const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            if (user.resetOtp !== otp || Date.now() > user.resetOtpExpireAt) {
                return res.status(400).json({ message: "Invalid or expired OTP" });
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            user.resetOtp = '';
            user.resetOtpExpireAt = 0;
            await user.save();
            res.status(200).json({ message: "Password reset successfully" });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
    }
}

export const isAuthenticated = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userModel.findById(userId).select('-password -resetOtp -resetOtpExpireAt -verifyOtp -verifyOtpExpireAt');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User is authenticated", user });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
    }
}

export const contactUs = async (req, res) => {
    const { name, email } = req.user;
    const { message } = req.body;
    if(!name || !email || !message){
        return res.status(400).json({message: "Please fill all the fields"})
       }
    try {
        // Here you can implement logic to store the contact message in the database or send an email notification
        console.log(`Contact Us Message from ${name} (${email}): ${message}`);
        res.status(200).json({ success: true, message: "Your message has been received. We'll get back to you shortly." });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
    }
}

