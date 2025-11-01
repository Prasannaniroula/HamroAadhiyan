import mongoose from "mongoose";
import Course from "./models/Course.models.js";
import "dotenv/config";

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to DB");
  } catch (error) {
    console.error("DB Connection Error:", error);
    process.exit(1);
  }
};

// Seed data with alias field
const courses = [
  {
    name: "Bachelor of Science in CSIT",
    alias: "csit",
    semesters: [
      {
        semester: "1st semester",
        subjects: [
          {
            name: "Introduction to Information Technology",
            notesUrl: "",
            syllabus: "TBD",
          },
          {
            name: "Mathematics I",
            notesUrl: "",
            syllabus: "TBD",
          },
          {
            name: "Physics",
            notesUrl: "",
            syllabus: "TBD",
          },
        ],
      },
      {
        semester: "2nd semester",
        subjects: [
          {
            name: "Programming Fundamentals",
            notesUrl: "",
            syllabus: "TBD",
          },
          {
            name: "Mathematics II",
            notesUrl: "",
            syllabus: "TBD",
          },
        ],
      },
    ],
  },
  {
    name: "Bachelor of Computer Applications",
    alias: "bca",
    semesters: [
      {
        semester: "1st semester",
        subjects: [
          { name: "Computer Fundamentals", notesUrl: "", syllabus: "TBD" },
          { name: "Mathematics I", notesUrl: "", syllabus: "TBD" },
        ],
      },
    ],
  },
];

const seedCourses = async () => {
  await connectDB();
  try {
    await Course.deleteMany({});
    console.log("Old courses deleted");

    await Course.insertMany(courses);
    console.log("Courses seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding courses:", error);
    process.exit(1);
  }
};

seedCourses();
