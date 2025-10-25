import jwt from "jsonwebtoken";
import "dotenv/config";
import userModel from "../models/users.models.js";

const userAuth =    async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }
  
    try {

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.id).select("name email"); // ✅ fetch name & email
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      req.user = user; // ✅ attach user object
      next();
    } catch (error) {
      console.error("JWT Verification Error:", error.name, error.message); 
      res.status(401).json({ message: "Invalid or expired token" });
    }
}

export default userAuth;             