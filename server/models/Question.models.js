import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    details: {
      type: String,
      required: true,
      trim: true,
    },
    course: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
    },

    // 🔐 ENFORCE LOGGED-IN USER
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdByName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // replaces createdAt
  }
);

export default mongoose.model("Question", questionSchema);
