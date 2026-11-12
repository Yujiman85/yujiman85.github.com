// Prints resume.html to the PDF the page links, using the page's print styles,
// so the web page and the PDF always match.
// Run from anywhere: NODE_PATH="$(npm root -g)" node _tools/build-resume-pdf.cjs
// (Jekyll skips folders that start with "_", so this file isn't published.)
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const root = path.resolve(__dirname, '..');
  const out = path.join(root, 'files', 'Ty-Jenkins-Resume.pdf');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + path.join(root, 'resume.html'), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: out,
    format: 'Letter',
    tagged: true,   // accessible PDF; Playwright defaults this to false
    outline: true,
  });
  await browser.close();

  const pages = (require('fs').readFileSync(out, 'latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
  console.log('Wrote ' + out + ' (' + pages + (pages === 1 ? ' page)' : ' pages)'));
  if (pages > 1) console.warn('Warning: the résumé runs past one page; trim it or tighten the print styles.');
})();
