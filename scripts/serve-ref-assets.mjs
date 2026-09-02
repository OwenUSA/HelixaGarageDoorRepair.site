// Static server for reference/assets/ on 3309, the companion to the shared
// serve-reference.mjs (which serves only the four saved HTML pages, on 3209).
// See scripts/mirror-reference.mjs for why the reference cannot be captured off the live CDN.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const ROOT = path.resolve(process.cwd(), 'reference/assets');
const PORT = 3309; // devPort+200. 3210 was already held by a SIBLING site's server, answering 200 with someone else's markup.
const TYPES = { '.css':'text/css', '.js':'application/javascript', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.gif':'image/gif', '.svg':'image/svg+xml', '.webp':'image/webp', '.woff':'font/woff', '.woff2':'font/woff2', '.ttf':'font/ttf', '.eot':'application/vnd.ms-fontobject', '.ico':'image/x-icon', '.json':'application/json' };
http.createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const full = path.join(ROOT, p);
  if (!full.startsWith(ROOT) || !fs.existsSync(full) || fs.statSync(full).isDirectory()) { res.writeHead(404); return res.end('nope'); }
  // Mirrored filenames carry the querystring as a "__q<hex>" suffix, so path.extname()
  // returns ".css__q3f76..." and the MIME lookup misses. Chromium then refuses to apply a
  // stylesheet served as application/octet-stream -- silently, with a 200 and no failed
  // request -- and the whole reference renders in Times New Roman.
  const ext = path.extname(full.replace(/__q[0-9a-f]+$/i, '')).toLowerCase();
  res.writeHead(200, { 'content-type': TYPES[ext] || 'application/octet-stream', 'access-control-allow-origin': '*', 'cache-control': 'no-cache' });
  res.end(fs.readFileSync(full));
}).on('error', (e) => { console.error(`asset server: ${e.code} on ${PORT}`); process.exit(1); })
  .listen(PORT, '127.0.0.1', () => console.log(`reference assets on http://127.0.0.1:${PORT} (root ${ROOT})`));
