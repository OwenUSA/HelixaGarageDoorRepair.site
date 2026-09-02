# RESUME — Helixa Prompt 5+9, STOPPED DELIBERATELY very early

**Cause:** the operator stopped this agent ahead of the account rate limit. Not a crash.
`npx tsc --noEmit` is **CLEAN**. Nothing was rolled back.

## Where it stopped
Its last words: *"Now writing the shell. Starting with the business-facts module and routes
constant."* It got exactly that far and no further.

## Landed
```
lib/business.ts      the single source of truth for business facts — FACTS ONLY
lib/routes.ts        the routes constant (sitemap must generate from this, so an entry
                     cannot drift from a real route)
harness.config.mjs   +87 lines — referenceRamp / pairsInUse / semantic, extracted
scripts/extract-tokens.mjs
```

## Not started — essentially all of Prompt 5+9
No token file, no `@theme` block, **no palette generated and no seed chosen**, no shell
components, no layout, no robots/sitemap/not-found, no gates run. Treat this as Prompt 5+9
barely begun rather than partly done.

## THE SERVERS ARE DOWN, AND ONE OF THEM FAILS SILENTLY
Both reference servers were killed. Start **both**, each as its own command — never chained
with a gate run, because the chain drops back to the previous cwd and the gate then reports
another site's numbers:

```bash
node ../_shared/harness/src/serve-reference.mjs   # pages,  3209
node scripts/serve-ref-assets.mjs                 # assets, 3309
```

**The assets server is not optional and its absence is the most dangerous failure on this
site.** Without it the saved pages render in Times New Roman with no Bootstrap grid — and
every request still returns `200` with no console error. Headless Chromium answers the
reference CDN with `ERR_BLOCKED_BY_ORB` while curl gets a clean 200, which is why the whole
local mirror exists.

Verify before trusting any capture:
- `serve-reference.mjs` prints `Crosby Roofing and Seamless Gutters`
- body font resolves to `ff-tisa-sans-web-pro`, **not** `Times New Roman`

## Carry forward
- **Target primary hue window: 292-315 (magenta/purple).** Taken across the fleet: 46, 81,
  129, 150, 184, 217, 252, 270, 332. Yours is a narrow corridor between 270 and 332 —
  check the distance to BOTH. The auto-selector is structurally biased toward this arc
  (at fixed OKLCH L/C the lowest luminance sits near 300-360), so a candidate should come
  quickly. Steer the masterSeed only; never the selection rule.
- **You hold the fleet's ONLY genuine font-substitution floor**: `ff-tisa-sans-web-pro` →
  Source Sans 3, established by canvas measurement after `document.fonts.check()` returned
  true for a family that does not exist. Raleway is OFL and converges — no floor. The type
  scale must account for the permanent metric delta on ff-tisa text; never iterate against it.
- `/privacy` has NO reference page — NOVEL, token conformance only, `refSection: null` (F-07).
- You reached **zero length exemptions** at Prompt 3 and declined the one genuinely
  available. Do not introduce one.
- **Measure the sRGB chroma ordering of primary vs accent and write it down.** One sibling
  found its primary MORE saturated than its accent, which fails `cta-primacy` for any
  primary-filled button on every route; another found the ordering inverts between OKLCH
  and HSV, so "looks more colourful" is not the test.
- **A green shell does not mean green sections.** A sibling's shell passed both gates, then
  its wave found five latent defects — two utility classes that were not tokens at all, so
  every dark band painted 1.46:1 on all five routes; and a `Reveal` shipping an `opacity: 0`
  observer against its own spec, measuring 165 text boxes as no-visible-text. Put real text
  on a dark band and a gradient band before gating.
- `@theme` holds LITERALS and is `@theme static`. A `var()` alias normalises to the string
  `"var(--x)"` and matches nothing, producing phantom token violations.

## Before believing any gate
```bash
netstat -ano | grep -E ":3109\s+.*LISTENING"   # EXACTLY ONE pid
```
Stop dev before `pnpm build` (shared `.next/`). Re-capture ours after every rebuild. Run the
full `diff.mjs` last with no `--route`/`--bp`.
