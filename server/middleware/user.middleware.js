import jwt from "jsonwebtoken";
import NormalUser from "../models/users.models.js";
import { socialUser } from "../models/SocialUser.models.js";

export default async function userAuth(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No authentication token. Please log in."
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user = await NormalUser.findById(decoded.id).select("-password");
    if (!user) {
      user = await socialUser.findById(decoded.id);
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User record not found. It may have been deleted."
      });
    }

    req.user = user;
    req.userId = user._id;
    next();

  } catch (err) {
    console.error("Auth middleware error:", err.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token"
    });
  }
}
