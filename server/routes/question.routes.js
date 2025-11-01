import express from "express";
import Question from "../models/Question.models.js";
import userAuth from "../middleware/user.middleware.js"; // your middleware

const router = express.Router();

// POST a new question (protected, optional)
router.post("/", userAuth, async (req, res) => {
  try {
    const { title, details, course, semester, subject } = req.body;

    // userAuth middleware populates req.user
    const user = req.user || null;
    const userId = user?._id || null;        // ObjectId or null
    const userName = user?.name || "Anonymous";

    if (!title || !details || !course) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newQuestion = new Question({
      title,
      details,
      course,
      semester,
      subject,
      createdBy: user ? user._id : null,  // ObjectId or null
      createdByName: user ? user.name : "Anonymous", 
    });

    await newQuestion.save();
    res.status(201).json({ success: true, question: newQuestion });

  } catch (err) {
    console.error("Error submitting question:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET all questions (optional filtering)
router.get("/", async (req, res) => {
  try {
    const { course, semester, subject } = req.query;

    const filter = {};
    if (course) filter.course = course;
    if (semester) filter.semester = semester;
    if (subject) filter.subject = subject;

    const questions = await Question.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, questions });
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
