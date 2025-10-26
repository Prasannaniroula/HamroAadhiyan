import jwt from "jsonwebtoken";
// NOTE: Ensure your paths here are correct, 
// especially the capitalization of SocialUser.models.js
import NormalUser from "../models/users.models.js";
import { socialUser } from "../models/SocialUser.models.js"; 

export default async function userAuth(req, res, next) {
  // 1. Get token
  const token = req.cookies.token;

  if (!token) {
    // If no token is present, send 401 and RETURN to exit the function
    return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
  }

  try {
    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Find user (Check both models)
    let user = await NormalUser.findById(decoded.id).select("-password");

    if (!user) {
      // If not a normal user, check social users
      user = await socialUser.findById(decoded.id);
    }

    if (!user) {
      // If user ID is valid but the user doesn't exist in either DB, send 404 and RETURN
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 4. Success: Attach user data and proceed
    req.user = user;
    req.userId = user._id;
    next(); // <--- CRITICAL STEP: Call next() to proceed to the route handler

  } catch (err) {
    // 5. JWT Error (Expired, tampered, bad signature)
    console.log("Auth middleware error:", err.message);
    // Send 401 for token issues and RETURN to exit
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}