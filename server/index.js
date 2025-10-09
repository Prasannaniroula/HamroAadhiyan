import express from "express";
import "dotenv/config";
import cors from "cors";    

import connectDB from "./config/mongodb.js";
import router from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";

// Initialize Express app

const app = express();
const PORT = process.env.PORT || 5000;
// Connect to MongoDB
connectDB();

// Middleware

app.use(cors(
  {
    origin: process.env.CLIENT_URL,
    credentials: true,
  }
));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", router);
app.use("/api/user", userRouter);
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
