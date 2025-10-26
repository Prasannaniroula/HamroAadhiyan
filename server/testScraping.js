import { getAllTUNotices } from "./Scraper/iostIoeNoticesScraping.js";
import { Notice } from "./models/notice.models.js";
import connectDB from "./config/mongodb.js";
import "dotenv/config";

await connectDB();
const notices = await getAllTUNotices(); // fetches both IOST & IOE, with pdf links
let addedCount = 0;

for (const n of notices) {
  try {
    const linkToSave = n.pdfLink || n.noticePage || n.link; // fallback for older structure
    if (!linkToSave) continue;

    const exists = await Notice.findOne({ link: linkToSave });
    if (!exists) {
      await Notice.create({
        title: n.title,
        link: linkToSave,
        adDate: n.adDate,
        source: n.source || "Unknown",
      });
      addedCount++;
    }
  } catch (err) {
    console.error("DB error for notice:", n.title, err.message);
  }
}

console.log(`Scraped ${notices.length} notices. Added ${addedCount} new notices to DB.`);
process.exit(0);
