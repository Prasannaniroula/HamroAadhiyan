// models/notices.models.js
import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true, unique: true }, // PDF or noticePage
  noticePage: { type: String },
  pdfLink: { type: String },
  adDate: { type: String }, // or Date if normalized
  source: { type: String },
}, { timestamps: true });



export const Notice = mongoose.model("Notice", noticeSchema);
