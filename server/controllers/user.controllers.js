import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/users.models.js";
import transporter from "../config/nodemailer.js";

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