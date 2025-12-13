#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
(**removed**)
const url = process.argv[2] || 'http://localhost:3001/';
// Wait configuration (ms): CLI `--wait=5000`, env `HEADLESS_WAIT_MS` or
// `HEADLESS_WAIT_SECONDS` (seconds). Default: 5000 ms.
function parseWaitMs() {
  const waitArg = process.argv.find(a => a && a.startsWith('--wait='));
  if (waitArg) {
    const v = parseInt(waitArg.split('=')[1], 10);
    if (!isNaN(v) && v >= 0) return v;
  }
  if (process.env.HEADLESS_WAIT_MS) {
    const v = parseInt(process.env.HEADLESS_WAIT_MS, 10);
    if (!isNaN(v) && v >= 0) return v;
  }
  if (process.env.HEADLESS_WAIT_SECONDS) {
    const v = parseFloat(process.env.HEADLESS_WAIT_SECONDS);
    if (!isNaN(v) && v >= 0) return Math.round(v * 1000);
  }
  return 5000;
}
const WAIT_MS = parseWaitMs();
(async () => {
  const puppeteer = require('puppeteer');
  const outDir = path.resolve(__dirname, '..', 'logs');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, 'headless-console.log');
  const lines = [];
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.on('console', msg => {
    try { lines.push(`[console] ${msg.type()}: ${msg.text()}`); } catch(e) { lines.push('[console] (error reading message)'); }
  });
  page.on('pageerror', err => lines.push(`[pageerror] ${err.toString()}`));
  page.on('requestfailed', req => lines.push(`[requestfailed] ${req.url()} - ${req.failure().errorText}`));
  page.on('response', res => {
    const status = res.status();
    if (status >= 400) lines.push(`[response] ${res.url()} -> ${status}`);
  });
  try {
    lines.push(`Starting capture for ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    // wait a bit for runtime console logs
    await new Promise(resolve => setTimeout(resolve, WAIT_MS));
    lines.push('Capture complete.');
  } catch (err) {
    lines.push(`[error] Navigation failed: ${err.toString()}`);
  }
  await browser.close();
  fs.writeFileSync(outFile, lines.join('\n'));
  console.log(`Wrote headless logs to ${outFile}`);
})();
