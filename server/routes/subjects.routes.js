import express from "express";
import Course from "../models/Course.models.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { course, semester } = req.query;

    if (!course || !semester) {
      return res.status(400).json({ message: "Please provide course and semester" });
    }

    // Convert semester to number
    let semesterNumber = parseInt(semester); // "1st" -> 1
    if (isNaN(semesterNumber)) {
      return res.status(400).json({ message: "Invalid semester" });
    }

    // Find the course by alias (case-insensitive)
    const courseDoc = await Course.findOne({ alias: course.toLowerCase() });
    if (!courseDoc) return res.status(404).json({ message: "Course not found" });

    // Find the semester object
    const semesterObj = courseDoc.semesters.find(s => s.semester === semesterNumber);
    if (!semesterObj) return res.status(404).json({ message: "Semester not found" });

    // Return subjects
    return res.status(200).json(semesterObj.subjects || []);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
