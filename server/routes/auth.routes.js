import express from "express";
import { forgotPassword, loginUser, logoutUser, registerUser, resetPassword, sendOtp, verifyEmail} from "../controllers/Auth.controllers.js";

import userAuth from "../middleware/user.middleware.js";

const router = express.Router();

// Register route

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/send-otp",userAuth, sendOtp);
router.post("/verify-otp",userAuth,verifyEmail);
router.post("/forgot-password",userAuth,forgotPassword);
router.post("/reset-password",userAuth,resetPassword);

export default router;