import express from "express";
import userAuth from "../middleware/user.middleware.js";
import { updateUser } from "../controllers/user.controllers.js";
import multer from "multer";

const userRouter = express.Router();
const upload = multer({ dest: "uploads/" }); // temporary folder

userRouter.get("/data", userAuth, async (req, res) => {
  const user = req.user;
  res.json({
    success: true,
    userData: {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar || user.photo || null,
      isAccountVerified: user.isAccountVerified || false,
      provider: user.provider || "normal",
    },
  });
});

// Use multer to handle photo upload
userRouter.put("/update", userAuth, upload.single("photo"), updateUser);

export default userRouter;
