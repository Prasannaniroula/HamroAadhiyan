// routes/course.routes.js
import express from "express";
import Course from "../models/Course.models.js";

const router = express.Router();

// GET all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET single course by alias
router.get("/:courseAlias", async (req, res) => {
  try {
    const course = await Course.findOne({ alias: req.params.courseAlias });
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (err) {
    console.error("Error fetching course:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
