// Site-local, run ONCE (Prompt 1). Mirrors every asset the saved reference pages
// reference into reference/assets/, then rewrites reference/raw/*.html to load them
// from the local asset server (scripts/serve-ref-assets.mjs).
//
// WHY. The saved HTML alone renders in Times New Roman: Chromium answers every
// cross-origin request to the reference's CDN with ERR_BLOCKED_BY_ORB (curl gets 200),
// and the protocol-relative //cdn.jsdelivr.net links resolve to http:// from our local
// server and fail too. Structural measurement against an unstyled Bootstrap-less page is
// measurement that lies, which is the one failure mode CLAUDE.md names explicitly.
//
// A-15 says never RE-fetch the live site. This fetches once, now, and freezes the result
// on disk; after this the reference is fully offline-reproducible.
// Pristine originals are preserved at reference/pristine/ and are never touched.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const RAW = path.join(ROOT, 'reference/raw');
const PRIS = path.join(ROOT, 'reference/pristine');
const OUT = path.join(ROOT, 'reference/assets');
const ASSET_ORIGIN = 'http://127.0.0.1:3309'; // devPort+200; 3210 is held by a sibling site's server
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

// Hosts we mirror. Everything else (analytics, recaptcha) is left pointing outward and
// simply fails -- none of it affects layout.
const MIRROR = /^(www\.crosbyroofing\.com|cdn\.jsdelivr\.net|use\.fontawesome\.com|fonts\.googleapis\.com|fonts\.gstatic\.com|kit\.fontawesome\.com)$/;

const abs = (u) => {
  if (!u) return null;
  if (u.startsWith('//')) return 'https:' + u;
  if (/^https?:\/\//.test(u)) return u;
  if (u.startsWith('/')) return 'https://www.crosbyroofing.com' + u;
  return null;
};
const localPath = (u) => { const x = new URL(u); return `/${x.host}${x.pathname}${x.search ? '__q' + Buffer.from(x.search).toString('hex').slice(0, 24) : ''}`; };

const seen = new Map(); // absUrl -> localPath
const queue = [];
const enqueue = (u) => {
  const a = abs(u); if (!a) return null;
  let x; try { x = new URL(a); } catch { return null; }
  if (!MIRROR.test(x.host)) return null;
  // A bare host (dns-prefetch "//cdn.jsdelivr.net") has pathname "/" and would be written
  // as a FILE named cdn.jsdelivr.net, after which every real asset under that host fails
  // to mkdir with ENOTDIR. Skip it.
  if (x.pathname === '/' || x.pathname === '') return null;
  const lp = localPath(a);
  if (!seen.has(a)) { seen.set(a, lp); queue.push(a); }
  return lp;
};

const URL_RE = /(?:href|src|content)\s*=\s*["']([^"']+)["']|url\(\s*['"]?([^'")]+)['"]?\s*\)|srcset\s*=\s*["']([^"']+)["']/gi;

function collect(text) {
  const found = [];
  for (const m of text.matchAll(URL_RE)) {
    if (m[3]) for (const part of m[3].split(',')) found.push(part.trim().split(/\s+/)[0]);
    else found.push(m[1] || m[2]);
  }
  return found.filter(Boolean);
}

// seed from the pristine HTML
for (const f of fs.readdirSync(PRIS)) if (f.endsWith('.html')) collect(fs.readFileSync(path.join(PRIS, f), 'utf8')).forEach(enqueue);

let ok = 0, fail = 0;
while (queue.length) {
  const batch = queue.splice(0, 8);
  await Promise.all(batch.map(async (u) => {
    const dest = path.join(OUT, seen.get(u));
    if (fs.existsSync(dest)) { ok++; return; }
    try {
      const r = await fetch(u, { headers: { 'user-agent': UA, accept: '*/*' }, signal: AbortSignal.timeout(45000) });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const buf = Buffer.from(await r.arrayBuffer());
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, buf);
      ok++;
      const ct = r.headers.get('content-type') || '';
      // one level deeper: CSS pulls in fonts and background images
      if (/css/.test(ct)) {
        let css = buf.toString('utf8');
        for (const raw of collect(css)) {
          const a = abs(new URL(raw, u).href.startsWith('http') ? new URL(raw, u).href : raw);
          const lp = enqueue(a);
          if (lp) css = css.split(raw).join(ASSET_ORIGIN + lp);
        }
        fs.writeFileSync(dest, css);
      }
    } catch (e) { fail++; console.error('MISS', u.slice(0, 100), String(e.message).slice(0, 40)); }
  }));
}

// rewrite HTML: pristine -> raw, with mirrored URLs made local.
// ONE pass over an alternation, longest-first. A naive loop of split/join corrupts the
// file: once a long URL has been replaced, a later, shorter needle (e.g. the bare "/"
// from href="/") matches INSIDE the text just inserted and nests replacements forever.
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
for (const f of fs.readdirSync(PRIS)) {
  if (!f.endsWith('.html')) continue;
  const html = fs.readFileSync(path.join(PRIS, f), 'utf8');
  const needles = new Map(); // literal as written in the HTML -> local path
  for (const raw of new Set(collect(html))) {
    if (raw.length < 12) continue;                 // never rewrite bare "/" or "#"
    const a = abs(raw);
    if (a && seen.has(a)) needles.set(raw, seen.get(a));
  }
  const keys = [...needles.keys()].sort((a, b) => b.length - a.length);
  const out = keys.length
    ? html.replace(new RegExp(keys.map(esc).join('|'), 'g'), (m) => ASSET_ORIGIN + needles.get(m))
    : html;
  // Subresource Integrity must go: the CSS post-processing rewrites url() inside the
  // mirrored stylesheets, so their bytes no longer match the sha384 in the saved HTML and
  // Chromium drops the sheet silently -- the page then renders in Times New Roman and
  // every structural number measured against it is fiction.
  fs.writeFileSync(path.join(RAW, f), out.replace(/\s(?:integrity|crossorigin)=(['"])[^'"]*\1/g, ''));
}
console.log(`mirrored ${ok} assets, ${fail} missed; rewrote ${fs.readdirSync(PRIS).filter(f=>f.endsWith('.html')).length} pages`);
