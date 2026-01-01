import express from "express";
import sanitizeHtml from "sanitize-html";
import Question from "../models/Question.models.js";
import userAuth from "../middleware/user.middleware.js";

const router = express.Router();

// helper function
const clean = (text) =>
  sanitizeHtml(text, {
    allowedTags: [],
    allowedAttributes: {},
  });

/**
 * POST a new question (LOGIN REQUIRED + SANITIZED)
 */
router.post("/", userAuth, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Login required",
      });
    }

    const { title, details, course, semester, subject } = req.body;

    if (!title || !details || !course) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const newQuestion = new Question({
      title: clean(title),
      details: clean(details),
      course,
      semester,
      subject,
      createdBy: req.user._id,
      createdByName: req.user.name,
    });

    await newQuestion.save();

    res.status(201).json({
      success: true,
      question: newQuestion,
    });
  } catch (err) {
    console.error("Error submitting question:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/**
 * GET all questions (PUBLIC)
 */
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      questions,
    });
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});


export default router;
