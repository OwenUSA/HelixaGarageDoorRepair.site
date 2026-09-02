// scripts/palette.mjs — thin CLI wrapper. All palette logic (generate/gate/selectPalette/
// emitTheme) lives in the shared, site-agnostic harness (_shared/harness/src/palette.mjs);
// this file only re-exposes it as `node scripts/palette.mjs --seed <n>` from the site root,
// per process.md's naming. Never duplicate the color-science logic here -- see that file,
// and harness.config.mjs for this site's referenceRamp/semantic/pairsInUse/masterSeed.
import { parseArgs } from '../../_shared/harness/src/lib.mjs';
import { loadConfig } from '../../_shared/harness/src/config.mjs';
import { generate, gate, selectPalette, emitTheme } from '../../_shared/harness/src/palette.mjs';

const cfg = await loadConfig();
const argv = parseArgs();
const seedArg = argv.seed && argv.seed !== 'true' ? Number(argv.seed) : null;

if (seedArg != null) {
  const cand = generate(seedArg, cfg);
  const g = gate(cand, cfg);
  if (argv.emit) { console.log(emitTheme(cand)); process.exit(0); }
  console.log(JSON.stringify({ ...cand, gate: { pass: g.pass, failures: g.failures, ctaRatio: g.ctaRatio } }, null, 2));
  process.exit(g.pass ? 0 : 1);
}

const sel = selectPalette(cfg);
if (argv.emit) { console.log(emitTheme(sel.winner)); process.exit(0); }
console.log(JSON.stringify({
  masterSeed: sel.masterSeed, tries: sel.tries,
  candidateSeeds: sel.candidates.map((c) => c.seed),
  winningSeed: sel.winner.seed,
  rejectedCount: sel.rejected.length,
}, null, 2));
