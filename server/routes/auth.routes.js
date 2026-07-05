import express, { json } from "express";
import { forgotPassword, loginUser, logoutUser, registerUser, resetPassword, sendOtp, verifyEmail, isAuthenticated} from "../controllers/Auth.controllers.js";
import passport from 'passport';
import jwt from "jsonwebtoken";

import userAuth from "../middleware/user.middleware.js";

const router = express.Router();

// Register route

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/send-otp",userAuth, sendOtp);
router.post("/verify-otp",userAuth,verifyEmail);
router.get("/is-auth",userAuth, isAuthenticated);
router.post("/forgot-password",userAuth,forgotPassword);
router.post("/reset-password",userAuth,resetPassword);

const issueSocialJwtAndCookie = (req, res) => {
  // 1. User object is attached to req.user by Passport
  const user = req.user; 
  const CLIENT_URL = process.env.CLIENT_URL; // e.g., http://localhost:5173

  if (!user) {
      return res.redirect(`${CLIENT_URL}/login?error=auth_failed`);
  }
  
  // 2. Generate the JWT with user ID
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  // 3. Set the Cookie with 'SameSite: lax'
  res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none", 
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
  
  // 4. Redirect to the frontend homepage/dashboard
  res.redirect(`${CLIENT_URL}/`); 
};


// ---------------- 1. Google Routes ----------------
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: `${process.env.CLIENT_URL}/login` }),
  issueSocialJwtAndCookie
);


// ---------------- 2. Facebook Routes ----------------
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false, failureRedirect: `${process.env.CLIENT_URL}/login` }),
  issueSocialJwtAndCookie
);
export default router;