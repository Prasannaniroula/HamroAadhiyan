// server/routes/user.routes.js
import express from "express";
import userAuth from "../middleware/user.middleware.js";

const userRouter = express.Router();

// GET /api/user/data — fetch current logged-in user info
userRouter.get("/data", userAuth, async (req, res) => {
  try {
    // req.user is already populated by middleware
    const user = req.user;

    res.json({
      success: true,
      userData: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar || null,
        isAccountVerified: user.isAccountVerified || false,
        provider: user.provider || "normal",
      },
    });
  } catch (err) {
    console.log("User data route error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default userRouter;
