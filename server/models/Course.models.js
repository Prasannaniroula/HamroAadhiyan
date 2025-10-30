// models/Course.models.js
import mongoose from "mongoose";


const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    alias: { type: String, required: true, unique: true }, // "csit", "bit", "bba"
    semesters: [
      {
        semester: { type: Number, required: true },
        subjects: [
          {
            name: String,
            syllabus: String,
            notesUrl: String
          }
        ]
      }
    ]
  });
  
  export default mongoose.model("Course", courseSchema);
  