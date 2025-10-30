import mongoose from "mongoose";

const SocialUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // optional if you use normal login
  googleId: String,
  facebookId: String,
  avatar: String,
  provider: String,
  isAccountVerified: { type: Boolean, default: true },
});

export const socialUser = mongoose.model("SocialUser", SocialUserSchema);
