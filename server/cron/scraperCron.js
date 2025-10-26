import cron from "node-cron";
import { getAllTUNotices } from "./iostIoeNoticesScraping.js";
import { Notice } from "./models/notices.models.js";

export function startNoticesCron(schedule = "0 6 * * *") {
  cron.schedule(schedule, async () => {
    console.log("Cron: scraping notices...");
    try {
      const notices = await getAllTUNotices({ concurrency: 3 });
      let added = 0;
      for (const n of notices) {
        const linkToSave = n.pdfLink || n.noticePage;
        if (!linkToSave) continue;
        try {
          const up = { title: n.title, link: linkToSave, noticePage: n.noticePage, pdfLink: n.pdfLink, adDate: n.adDate, source: n.source };
          // upsert to avoid duplicates (atomic)
          const res = await Notice.updateOne({ link: linkToSave }, { $setOnInsert: up }, { upsert: true });
          if (res.upserted) added++;
        } catch(e) {
          console.error("DB save error", e.message);
        }
      }
      console.log(`Cron done: scraped ${notices.length}, added ${added}`);
    } catch (err) {
      console.error("Cron error:", err.message);
    }
  });
}
