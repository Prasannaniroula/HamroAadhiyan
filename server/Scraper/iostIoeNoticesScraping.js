import axios from "axios";
import * as cheerio from "cheerio";
import https from "https";
import { Notice } from "../models/notice.models.js";

// Axios instance that ignores invalid SSL certificates
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});

// ================= SCRAPE IOST NOTICES =================
export async function scrapeIOSTNotices() {
  const baseUrl = "https://iost.tu.edu.np";
  const listUrl = `${baseUrl}/notices`;
  const notices = [];

  try {
    const { data } = await axiosInstance.get(listUrl);
    const $ = cheerio.load(data);

    $(".recent-post-wrapper.shdow").each((i, el) => {
      const title = $(el).find(".detail a h5").text().trim();
      const noticePage = $(el).find(".detail a").attr("href");
      const adDate =
        $(el).find(".date h4").text().trim() +
        " " +
        $(el).find(".date span").text().trim();

      if (title && noticePage) {
        notices.push({
          title,
          noticePage,
          adDate,
          source: "IOST",
        });
      }
    });

    // Fetch PDF links
    for (let notice of notices) {
      try {
        const { data: detailPage } = await axiosInstance.get(notice.noticePage);
        const $$ = cheerio.load(detailPage);

        const pdfLink =
          $$("a[href$='.pdf']").attr("href") ||
          $$("iframe[src$='.pdf']").attr("src");

        if (pdfLink) {
          notice.pdfLink = pdfLink.startsWith("http")
            ? pdfLink
            : `${baseUrl}${pdfLink}`;
        }
      } catch (err) {
        console.log("IOST PDF fetch error:", err.message);
      }
    }
  } catch (err) {
    console.error("IOST scrape error:", err.message);
  }

  return notices;
}

// ================= SCRAPE IOE NOTICES =================
export async function scrapeIOENotices() {
  const baseUrl = "https://ioe.tu.edu.np";
  const listUrl = `${baseUrl}/notices`;
  const notices = [];

  try {
    const { data } = await axiosInstance.get(listUrl);
    const $ = cheerio.load(data);

    $(".recent-post-wrapper.shdow").each((i, el) => {
      const title = $(el).find(".detail a h5").text().trim();
      const noticePage = $(el).find(".detail a").attr("href");
      const adDate =
        $(el).find(".date h4").text().trim() +
        " " +
        $(el).find(".date span").text().trim();

      if (title && noticePage) {
        notices.push({
          title,
          noticePage,
          adDate,
          source: "IOE",
        });
      }
    });

    // Fetch PDF links
    for (let notice of notices) {
      try {
        const { data: detailPage } = await axiosInstance.get(notice.noticePage);
        const $$ = cheerio.load(detailPage);

        const pdfLink =
          $$("a[href$='.pdf']").attr("href") ||
          $$("iframe[src$='.pdf']").attr("src");

        if (pdfLink) {
          notice.pdfLink = pdfLink.startsWith("http")
            ? pdfLink
            : `${baseUrl}${pdfLink}`;
        }
      } catch (err) {
        console.log("IOE PDF fetch error:", err.message);
      }
    }
  } catch (err) {
    console.error("IOE scrape error:", err.message);
  }

  return notices;
}

// ================= COMBINE BOTH =================
export async function getAllTUNotices() {
  try {
    const [iost, ioe] = await Promise.all([
      scrapeIOSTNotices(),
      scrapeIOENotices(),
    ]);
    return [...iost, ...ioe];
  } catch (err) {
    console.error("Error combining TU notices:", err.message);
    return [];
  }
}

// ================= SAVE TO DB =================
export async function scrapeAndSaveNotices() {
  try {
    const notices = await getAllTUNotices();
    let addedCount = 0;

    for (const notice of notices) {
      const exists = await Notice.findOne({ title: notice.title });
      if (!exists) {
        await Notice.create(notice);
        addedCount++;
      }
    }

    console.log(
      `✅ Scraped ${notices.length} notices. Added ${addedCount} new notices.`
    );
  } catch (err) {
    console.error("❌ Error scraping and saving notices:", err.message);
  }
}
