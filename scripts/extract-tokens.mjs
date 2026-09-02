// Prompt 5 — mine the LOCAL reference server for the token set.
// Run with the site root as cwd. Reference pages must be served on 3209 (assets 3309).
import { chromium } from 'playwright';

const PAGES = ['/', '/about/', '/residential-roofing/', '/contact-us/'];
const ORIGIN = 'http://127.0.0.1:3209';

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } });
const agg = { color: {}, bg: {}, border: {}, size: {}, weight: {}, ls: {}, lh: {}, radius: {}, shadow: {}, container: {}, pad: {}, gap: {}, fam: {} };
const bump = (o, k, n = 1) => { if (k) o[k] = (o[k] || 0) + n; };

for (const p of PAGES) {
  const page = await ctx.newPage();
  const res = await page.goto(ORIGIN + p, { waitUntil: 'networkidle', timeout: 60000 });
  const styled = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
  if (/Times/i.test(styled)) throw new Error('UNSTYLED PAGE — mirror not serving: ' + p);
  const out = await page.evaluate(() => {
    const A = { color: {}, bg: {}, border: {}, size: {}, weight: {}, ls: {}, lh: {}, radius: {}, shadow: {}, container: {}, pad: {}, gap: {}, fam: {} };
    const bump = (o, k, n = 1) => { if (k) o[k] = (o[k] || 0) + n; };
    const hasText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    for (const el of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      const area = Math.round(r.width * r.height);
      if (hasText(el)) {
        bump(A.color, cs.color);
        bump(A.size, cs.fontSize);
        bump(A.weight, cs.fontWeight);
        bump(A.ls, cs.letterSpacing);
        bump(A.lh, cs.lineHeight);
        bump(A.fam, cs.fontFamily.split(',')[0].replace(/"/g, ''));
      }
      if (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)') bump(A.bg, cs.backgroundColor, Math.max(1, Math.round(area / 100)));
      for (const s of ['Top', 'Right', 'Bottom', 'Left']) {
        if (parseFloat(cs['border' + s + 'Width']) > 0) bump(A.border, cs['border' + s + 'Color']);
      }
      if (cs.borderRadius && cs.borderRadius !== '0px') bump(A.radius, cs.borderRadius);
      if (cs.boxShadow && cs.boxShadow !== 'none') bump(A.shadow, cs.boxShadow);
      if (/container|wrapper|row|col/.test(el.className || '') && r.width > 300) bump(A.container, Math.round(r.width) + 'px');
      for (const s of ['Top', 'Bottom']) {
        const v = cs['padding' + s ];
        if (v && v !== '0px') bump(A.pad, v);
      }
      if (cs.gap && cs.gap !== 'normal' && cs.gap !== '0px') bump(A.gap, cs.gap);
    }
    return A;
  });
  for (const k of Object.keys(agg)) for (const [kk, v] of Object.entries(out[k])) bump(agg[k], kk, v);
  await page.close();
}
await b.close();
const top = (o, n = 14) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n);
for (const k of Object.keys(agg)) {
  console.log('\n== ' + k);
  for (const [v, c] of top(agg[k])) console.log('  ' + String(c).padStart(8) + '  ' + v);
}
