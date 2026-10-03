const { chromium } = require('playwright');
const path = require('path');

const outputDir = path.resolve(__dirname, '../screenshots');

async function main() {
  const browser = await chromium.launch({
    executablePath: '/opt/google/chrome/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1200 },
    locale: 'ml-IN',
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:5173/font-test.html...');
  await page.goto('http://localhost:5173/font-test.html', { waitUntil: 'networkidle' });
  
  // Wait for fonts to be ready
  await page.evaluate(async () => {
    await document.fonts.ready;
  });

  const screenshotPath = path.join(outputDir, 'font_comparison_verified.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log('Saved screenshot to:', screenshotPath);

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
