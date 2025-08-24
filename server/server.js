import browserImport from "./Selenium/selenium.js";

(async () => {
  console.log("🟢 Launching browser...");
  const driver = await browserImport();

  if (!driver) {
    console.error("❌ No driver returned, exiting");
    return;
  }

  try {
    await driver.get("https://iost.tu.edu.np/notices");
    const title = await driver.getTitle();
    console.log("Page title:", title);
  } catch (err) {
    console.error("❌ Error during navigation:", err);
  } finally {
    await driver.quit();
    console.log("🛑 Browser closed");
  }
})();
