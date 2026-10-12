import { chromium } from "playwright";

const BASE = "http://127.0.0.1:8090";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

await page.goto(BASE + "/brain-bee-anatomy.html", { waitUntil: "domcontentloaded" });
await page.locator("#bb-anatomy-start").click();
await page.waitForFunction(() => window.__bbAnatomy.ready(), null, { timeout: 90000 });
await page.waitForTimeout(1200);

const stage = page.locator("#bb-anatomy-stage");

async function shot(name) {
  const id = await page.evaluate(() => window.__bbAnatomy.currentId());
  await stage.screenshot({ path: "_shot-" + name + ".png" });
  console.log(name + ": " + id);
}

await shot("night-1");
await page.locator("#bb-anatomy-giveup").click();
await page.waitForTimeout(300);
await page.locator("#bb-anatomy-next").click();
await page.waitForTimeout(900);
await shot("night-2");
await page.locator("#bb-anatomy-giveup").click();
await page.waitForTimeout(300);
await page.locator("#bb-anatomy-next").click();
await page.waitForTimeout(900);
await shot("night-3");

await page.locator("#theme-toggle").click();
await page.waitForTimeout(1000);
await shot("day-1");

await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(200);
await page.screenshot({ path: "_shot-anatomy-page-day.png" });

await page.locator("#theme-toggle").click();
await page.locator("#lang-az").click();
await page.waitForTimeout(500);
await page.locator("#bb-anatomy-giveup").click();
await page.waitForTimeout(600);
await page.evaluate(() => window.scrollTo(0, 260));
await page.waitForTimeout(200);
await page.screenshot({ path: "_shot-anatomy-reveal-az.png" });

await browser.close();
