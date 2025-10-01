import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/users.models.js";
import transporter from "../config/nodemailer.js";
import { generateOtp, sendOtpEmail } from "../utils/otp.js";

// Register a new user
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
       if(!name || !email || !password){
        return res.status(400).json({message: "Please fill all the fields"})
       }
       console.log("this file is running");

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

        // Create and assign a token
           res.cookie("token", jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" }), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        // Send welcome email
        console.log(newUser.email)

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome!! to Hamro Aadhiyan.",
            text: `Welcome to Hamro Aadhiyan website. Your account has been created with email id:${email}`,
          };
          
          console.log(process.env.SENDER_EMAIL);

          const sendemail = await transporter.sendMail(mailOptions);
          if (!sendemail) {
            return res
              .status(500)
              .json({ success: false, msg: "couldn't send email" });
          }
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log(error.message);
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
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.status(200).json({ message: "Logged in successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
    } 
}

export const logoutUser = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    res.status(200).json({ message: "Logged out successfully" });
}

export const sendOtp = async (req, res) => {
    const { email } = req.body;
    if(!email){
        return res.status(400).json({message: "Please provide an email"})
       }
    try {
        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User with this email does not exist" });
        }
        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        // Set OTP and its expiration time (10 minutes)
        user.otp = otp;
        user.otpExpiration = Date.now() + 10 * 60 * 1000; // 10 minutes from now
        await user.save();

        // Send OTP via email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Verify OTP!!!",
            text: `Your OTP for verification is ${otp}. It is valid for 10 minutes.`,
        };

        const sendemail = await transporter.sendMail(mailOptions);
        if (!sendemail) {
            return res.status(500).json({ success: false, msg: "couldn't send email" });
        }

        res.status(200).json({ message: "OTP sent to your email" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
    }
}
export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    if(!email || !otp){
        return res.status(400).json({message: "Please provide all the details"})
       }
    try {
        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User with this email does not exist" });
        }
        // Check if OTP is valid and not expired
        if (user.otp !== otp || Date.now() > user.otpExpiration) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }
        res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
    }
}

export const verifyEmail = async (req, res) => {
    const {otp} = req.body;
    const userId = req.user.id;
    if(!userId || !otp){
        return res.status(400).json({message: "missing details"})
       }
    try {
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        if(user.isAccountVerified){
            return res.status(400).json({message: "Account already verified"})
        }
        if(user.verifyOtp !== otp || Date.now() > user.verifyOtpExpireAt){
            return res.status(400).json({message: "Invalid or expired OTP"})
        }
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        await user.save();
        res.status(200).json({message: "Account verified successfully"})
}
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
    }
}
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if(!email){
        return res.status(400).json({message: "Please provide an email"})
       }
    try {
        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User with this email does not exist" });
        }
        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        // Set OTP and its expiration time (10 minutes)
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000; // 10 minutes from now
        await user.save();

        // Send OTP via email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Reset Password OTP",
            text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`,
        };

        const sendemail = await transporter.sendMail(mailOptions);
        if (!sendemail) {
            return res.status(500).json({ success: false, msg: "couldn't send email" });
        }

        res.status(200).json({ message: "OTP sent to your email" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
    }
}
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    if(!email || !otp || !newPassword){
        return res.status(400).json({message: "Please provide all the details"})
       }
    try {
        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User with this email does not exist" });
        }
        // Check if OTP is valid and not expired
        if (user.resetOtp !== otp || Date.now() > user.resetOtpExpireAt) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = null;
        user.resetOtpExpireAt = null;
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
    }
}