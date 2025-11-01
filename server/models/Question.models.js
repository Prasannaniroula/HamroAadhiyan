import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  details: { type: String, required: true },
  course: { type: String, required: true },
  semester: { type: String, required: true },
  subject: { type: String, required: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Question", questionSchema);
