import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const logoPath = path.join(rootDir, 'public', 'images', 'balasangham-logo.png');
const logoBase64 = fs.readFileSync(logoPath).toString('base64');
const logoDataUri = `data:image/png;base64,${logoBase64}`;

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Welcome to Balasangham</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Malayalam:wght@700;800;900&family=Plus+Jakarta+Sans:wght@600;700;800;900&display=swap" rel="stylesheet">
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    width: 1200px;
    height: 630px;
    overflow: hidden;
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    background: #0f0a0a;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .canvas {
    position: relative;
    width: 1200px;
    height: 630px;
    background: linear-gradient(135deg, #FFFDF8 0%, #FFF5EC 40%, #FFE9D6 100%);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 60px 75px;
    border: 12px solid #D32020;
  }

  /* Decorative Background Glows & Elements */
  .bg-glow-red {
    position: absolute;
    top: -120px;
    right: -80px;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(211, 32, 32, 0.18) 0%, rgba(211, 32, 32, 0) 70%);
    pointer-events: none;
    border-radius: 50%;
  }

  .bg-glow-gold {
    position: absolute;
    bottom: -150px;
    left: -100px;
    width: 550px;
    height: 550px;
    background: radial-gradient(circle, rgba(255, 179, 0, 0.22) 0%, rgba(255, 179, 0, 0) 70%);
    pointer-events: none;
    border-radius: 50%;
  }

  .accent-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: linear-gradient(90deg, #D32020 0%, #FFB300 50%, #D32020 100%);
  }

  /* Header Badge */
  .header-badge-row {
    display: flex;
    align-items: center;
    gap: 16px;
    z-index: 10;
  }

  .estd-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #D32020;
    color: #FFFFFF;
    font-size: 15px;
    font-weight: 800;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 8px 18px;
    border-radius: 9999px;
    box-shadow: 0 4px 14px rgba(211, 32, 32, 0.35);
  }

  .estd-pill span.star {
    color: #FFD54F;
    font-size: 18px;
  }

  .sub-tag {
    font-size: 16px;
    font-weight: 700;
    color: #6B4E3D;
    letter-spacing: 0.5px;
  }

  /* Main Body Split */
  .main-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .text-column {
    flex: 1;
    max-width: 680px;
  }

  .main-title {
    font-size: 64px;
    font-weight: 900;
    line-height: 1.08;
    color: #1A120E;
    letter-spacing: -1.5px;
    margin-bottom: 12px;
  }

  .main-title .highlight {
    color: #D32020;
    position: relative;
    display: inline-block;
  }

  .malayalam-welcome {
    font-family: 'Noto Sans Malayalam', sans-serif;
    font-size: 38px;
    font-weight: 800;
    color: #A31212;
    line-height: 1.25;
    margin-bottom: 16px;
    letter-spacing: -0.5px;
  }

  .tagline-en {
    font-size: 20px;
    font-weight: 600;
    color: #4A382C;
    line-height: 1.45;
    margin-bottom: 6px;
  }

  .tagline-ml {
    font-family: 'Noto Sans Malayalam', sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: #7A5C43;
    line-height: 1.4;
  }

  /* Right Visual: Logo Flag Container */
  .visual-column {
    position: relative;
    width: 320px;
    height: 320px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .visual-bg-circle {
    position: absolute;
    width: 310px;
    height: 310px;
    border-radius: 50%;
    background: radial-gradient(circle, #FFFFFF 60%, #FFF1D6 100%);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1), inset 0 0 0 3px rgba(211, 32, 32, 0.15);
  }

  .flag-image {
    position: relative;
    z-index: 5;
    width: 280px;
    height: 280px;
    object-fit: contain;
    filter: drop-shadow(0 14px 24px rgba(183, 28, 28, 0.22));
    transform: rotate(-2deg);
  }

  /* Footer bar */
  .footer-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 18px;
    border-top: 2px solid rgba(211, 32, 32, 0.15);
    z-index: 10;
  }

  .footer-left {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #7A5C43;
    font-size: 15px;
    font-weight: 700;
  }

  .red-dot {
    width: 8px;
    height: 8px;
    background: #D32020;
    border-radius: 50%;
  }

  .footer-url-pill {
    background: #1A120E;
    color: #FFFFFF;
    font-size: 15px;
    font-weight: 800;
    letter-spacing: 0.8px;
    padding: 7px 18px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
</style>
</head>
<body>
  <div class="canvas">
    <div class="accent-bar"></div>
    <div class="bg-glow-red"></div>
    <div class="bg-glow-gold"></div>

    <!-- Header / Category Badge -->
    <div class="header-badge-row">
      <div class="estd-pill">
        <span class="star">★</span>
        <span>Balasangham Kannur</span>
      </div>
      <div class="sub-tag">Estd. 1938 • Kalliasseri, Kerala</div>
    </div>

    <!-- Main Message -->
    <div class="main-content">
      <div class="text-column">
        <h1 class="main-title">
          Welcome to <span class="highlight">Balasangham</span>
        </h1>
        <div class="malayalam-welcome">
          സ്വാഗതം ബാലസംഘത്തിലേക്ക്
        </div>
        <p class="tagline-en">
          The Children’s Movement for Culture, Creative Joy & Equality
        </p>
        <p class="tagline-ml">
          കുട്ടികളുടെ സാംസ്കാരിക-വിദ്യാഭ്യാസ പ്രസ്ഥാനം • ഔദ്യോഗിക വെബ്‌സൈറ്റ്
        </p>
      </div>

      <div class="visual-column">
        <div class="visual-bg-circle"></div>
        <img class="flag-image" src="${logoDataUri}" alt="Balasangham Official Flag" />
      </div>
    </div>

    <!-- Footer Bar -->
    <div class="footer-row">
      <div class="footer-left">
        <span>Kannur District Committee</span>
        <span class="red-dot"></span>
        <span style="font-family: 'Noto Sans Malayalam', sans-serif;">കണ്ണൂർ ജില്ലാ കമ്മിറ്റി</span>
        <span class="red-dot"></span>
        <span>20,000+ Units</span>
      </div>
      <div class="footer-url-pill">
        <span>balasanghamkannur.org</span>
      </div>
    </div>
  </div>
</body>
</html>`;

const tempHtmlPath = path.join(rootDir, 'scripts', 'temp-og.html');
fs.writeFileSync(tempHtmlPath, htmlContent);

const outputPngPath = path.join(rootDir, 'public', 'images', 'og-preview.png');
const rootOgPath = path.join(rootDir, 'public', 'og-image.png');
const altPath = path.join(rootDir, 'public', 'images', 'welcome-to-balasangham.png');

console.log('Rendering 1200x630 Open Graph preview image with Google Chrome...');
execSync(
  `google-chrome --headless --no-sandbox --disable-gpu --screenshot="${outputPngPath}" --window-size=1200,630 "file://${tempHtmlPath}"`,
  { stdio: 'inherit' }
);

// Copy to alternate standard locations
fs.copyFileSync(outputPngPath, rootOgPath);
fs.copyFileSync(outputPngPath, altPath);

console.log(`Generated:
  - ${outputPngPath}
  - ${rootOgPath}
  - ${altPath}`);

