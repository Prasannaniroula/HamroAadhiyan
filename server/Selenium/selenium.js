import { Builder, Browser } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import chromedriver from "chromedriver";

async function browserImport() {
  console.log("🚀 Starting Chrome in headless mode...");

  try {
    const service = new chrome.ServiceBuilder(chromedriver.path);

    // Chrome options - safe headless mode
    const options = new chrome.Options()
      .addArguments("--headless=new")   // safe for new Chrome versions
      .addArguments("--window-size=1280,800")
      .addArguments("--disable-gpu")
      .addArguments("--no-sandbox")
      .addArguments("--disable-dev-shm-usage");

    const driver = await new Builder()
      .forBrowser(Browser.CHROME)
      .setChromeOptions(options)
      .setChromeService(service)
      .build();

    console.log("✅ Chrome launched successfully");
    return driver;
  } catch (err) {
    console.error("❌ Failed to launch Chrome:", err);
  }
}

export default browserImport;
