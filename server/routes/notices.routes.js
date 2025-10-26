import express from "express";
import { getAllTUNotices } from "../Scraper/iostIoeNoticesScraping.js";
import { Notice } from "../models/notice.models.js";

const router = express.Router();

/**
 * GET /api/notices?page=1&limit=8&scrape=true
 */
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    // Optional scraping: only run if query param scrape=true
    if (req.query.scrape === "true") {
      const scrapedNotices = await getAllTUNotices();
      for (const n of scrapedNotices) {
        try {
          const linkToSave = n.pdfLink || n.noticePage || n.link;
          if (!linkToSave) continue;

          const exists = await Notice.findOne({ link: linkToSave });
          if (!exists) {
            await Notice.create({
              title: n.title,
              link: linkToSave,
              adDate: n.adDate,
              source: n.source || "Unknown",
            });
          }
        } catch (err) {
          console.error("DB error for notice:", n.title, err.message);
        }
      }
    }

    // Fetch notices with pagination
    const totalNotices = await Notice.countDocuments();
    const totalPages = Math.ceil(totalNotices / limit);

    const notices = await Notice.find()
      .sort({ adDate: -1 })
      .skip(skip)
      .limit(limit);

    res.json({ notices, currentPage: page, totalPages });

  } catch (err) {
    console.error("Error fetching notices:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
