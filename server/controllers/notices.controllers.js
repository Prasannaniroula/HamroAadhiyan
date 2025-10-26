import { Notice } from "../models/notice.models.js";

// ✅ Get all notices
export const getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 });
    res.json({ success: true, notices });
  } catch (error) {
    console.error("Get notices error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Add a notice (admin)
export const addNotice = async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const notice = new Notice({ title, description, link });
    await notice.save();
    res.json({ success: true, notice });
  } catch (error) {
    console.error("Add notice error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
