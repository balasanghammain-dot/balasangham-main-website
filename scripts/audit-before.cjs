const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const outputDir = path.resolve(__dirname, '../screenshots/audit_before');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const pagesToAudit = [
  { name: '01_home', url: 'http://localhost:5173/' },
  { name: '02_about', url: 'http://localhost:5173/about' },
  { name: '03_history', url: 'http://localhost:5173/about/history' },
  { name: '04_objectives', url: 'http://localhost:5173/about/objectives' },
  { name: '05_structure', url: 'http://localhost:5173/about/structure' },
  { name: '06_leadership', url: 'http://localhost:5173/about/leadership' },
  { name: '07_events', url: 'http://localhost:5173/events' },
  { name: '08_event_detail', url: 'http://localhost:5173/events/kannur-district-conference-2026' },
  { name: '09_media', url: 'http://localhost:5173/media' },
  { name: '10_contact', url: 'http://localhost:5173/contact' },
  { name: '11_join', url: 'http://localhost:5173/join' },
];

async function main() {
  const browser = await chromium.launch({
    executablePath: '/opt/google/chrome/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const runAudits = async (isMobile) => {
    const context = await browser.newContext({
      viewport: isMobile ? { width: 390, height: 844 } : { width: 1280, height: 900 },
      locale: 'ml-IN',
    });

    await context.addInitScript(() => {
      try {
        localStorage.setItem('balasangham_lang', 'ml');
      } catch (e) {}
    });

    for (const item of pagesToAudit) {
      const page = await context.newPage();
      try {
        await page.goto(item.url, { waitUntil: 'domcontentloaded', timeout: 10000 });
        
        // Ensure ml language state in page
        await page.evaluate(() => {
          try {
            localStorage.setItem('balasangham_lang', 'ml');
          } catch(e) {}
          // Click any visible ML toggle if active is not ML
          const buttons = Array.from(document.querySelectorAll('button'));
          const mlBtn = buttons.find(b => b.textContent && b.textContent.includes('മലയാളം') && b.offsetParent !== null);
          if (mlBtn && mlBtn.getAttribute('aria-pressed') !== 'true') {
            mlBtn.click();
          }
        });

        await page.waitForTimeout(600);
        await page.evaluate(async () => {
          await document.fonts.ready;
        });

        const suffix = isMobile ? 'mobile_390' : 'desktop_1280';
        const filePath = path.join(outputDir, `${item.name}_${suffix}.png`);
        await page.screenshot({ path: filePath, fullPage: false });
        console.log(`Saved: ${item.name}_${suffix}.png`);
      } catch (err) {
        console.error(`Failed ${item.name} (${isMobile ? 'mobile' : 'desktop'}):`, err.message);
      } finally {
        await page.close();
      }
    }
    await context.close();
  };

  console.log('Capturing Desktop pages in Malayalam...');
  await runAudits(false);

  console.log('Capturing Mobile pages in Malayalam...');
  await runAudits(true);

  await browser.close();
  console.log('All audit captures complete!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
