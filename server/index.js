// server/index.js
import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";
import noticesRouter from "./routes/notices.routes.js";
import "./config/passport.js"; // Google & Facebook strategies
import courseRouter from "./routes/course.routes.js";
import subjectRouter from "./routes/subjects.routes.js";
import questionRouter from "./routes/question.routes.js";







const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// ---------------- Middleware ----------------
app.use(cors({
  origin: process.env.CLIENT_URL, // frontend origin
  credentials: true,              // allow cookies
}));
app.use(express.json());
app.use(cookieParser());

// Session middleware for passport

// Initialize passport
app.use(passport.initialize());

// ---------------- Routes ----------------
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/subjects", subjectRouter);
app.use("/api/questions", questionRouter);

app.use("/api/courses", courseRouter);

app.use("/api/message", messageRouter);
app.use("/api/notices", noticesRouter);
app.use("/uploads", express.static("uploads"));


app.get("/", (req, res) => {
  res.send("API is running...");
});

// ---------------- Start Server ----------------
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
