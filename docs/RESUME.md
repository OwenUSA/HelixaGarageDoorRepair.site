# RESUME — Helixa, visual build-and-fine-tune pass COMPLETE

All five routes are built section-by-section against the reference and gated. This
supersedes the prior "Prompt 6+7, STOPPED DELIBERATELY" entry — that was read-only research
only; this pass built every section listed as NOT STARTED there.

## What shipped

19 section components under `components/sections/`, one shared `PageBanner.tsx` pattern
reused by `about-banner` / `services-banner` / `contact-banner`, plus a `/privacy` banner
inlined in its route file (no reference image slot to justify a component of its own).
Every route file (`app/*/page.tsx`) now renders its full section list per
`docs/sections.md`'s machine table, each with `data-section="<id>"` set exactly as declared.

`home-map` and `contact-map` (lead-owned per A-6) use the frozen `<BusinessMap>` at zoom 13
and 15 respectively. The frozen shell (`globals.css`, `layout.tsx`, tokens, `SiteHeader`,
`SiteFooter`, `BusinessMap`, `MobileCallBar`, robots, sitemap, not-found) was **not**
touched.

## Two real defects found and fixed during the visual pass

1. **`max-w-{2xl,3xl,xl}` silently resolved to this site's `--spacing-*` tokens instead of
   Tailwind's built-in prose-width scale**, because `@theme static` redefines
   `--spacing-2xl` etc. under the SAME suffix names Tailwind's own max-width scale reads
   (`--spacing-2xl: 64px` vs. Tailwind's default `2xl = 42rem`). This produced one-word-per-
   line heading wrapping on `home-hero`, `home-cta` and the `home-services` grid intro.
   **Fix, and the rule to carry forward: never use Tailwind's named `max-w-{size}` scale on
   this site (or any site with the same token pattern) — use literal pixel arbitrary values
   (`max-w-[672px]`) instead.** `max-w-(--container-max)` and `max-w-prose` (65ch, not
   token-derived) are unaffected and fine to keep using.
2. **`contrast.mjs` FAILED at 1.06:1** on every banner/CTA heading (`home-hero`, `home-cta`,
   `services-cta`, and all four `PageBanner` instances) after the max-w fix. Root cause: the
   dark tint was a `position:absolute` **sibling** `<div>` layered over the placeholder
   image, not a background on an ANCESTOR of the heading text. `contrast.mjs` resolves
   backgrounds by walking the CSS ancestor chain — it cannot see a sibling's paint — so it
   fell through to the page's own near-white background behind white heading text. **Fix:**
   each of those four components now also sets `backgroundColor: 'var(--color-neutral-900)'`
   (or `--color-primary`) directly on the `<section>` itself, which IS an ancestor of the
   heading; the placeholder image's opacity was lowered and the sibling overlay kept for
   visual richness. Both BLOCKING gates are 0 FAIL / 0 findings after this fix — see the
   full gate log below.

## Gate results, this pass (final)

```
pnpm build            CLEAN (10/10 static routes)
npx tsc --noEmit       CLEAN
email sweep            EMAIL SWEEP CLEAN
contrast.mjs            842 scored, 0 FAIL, 0 UNMEASURABLE
rendertruth.mjs         0 findings
```

One rendertruth run mid-pass reported 127 findings (108 tap-target, 19 text-legibility) —
diagnosed as a dev-server cold-start artifact (the very first Playwright hit of each route
right after a fresh `pnpm dev` raced Tailwind's CSS compile, so `hidden lg:flex` nav momentarily
measured as visible text-sized boxes). Confirmed non-reproducible: an immediate re-run
against the same warmed server returned 0 findings, and a manual Playwright probe of the
same elements at the same breakpoint read correctly-hidden (0×0) and correctly-sized
(44px min-height) boxes throughout. Not logged as a floor because it is not a property of
the shipped code — re-run any gate against a freshly started dev server twice before
trusting a first-hit failure.

## Deliberate differences from the reference (not defects)

- Colour, per F-01/A-8 — permanent, intentional.
- Placeholder imagery everywhere a REPLACE asset slot exists (F-05/F-08) — text labels like
  "hero-image 1440x569" are the placeholder SVGs rendering their own filename/size, expected
  until the Prompt 11 asset hand-back.
- Section counts/order per `docs/sections.md`'s REORDERED/MOVED/ADDED/DROPPED annotations —
  `home-why` before `home-services`, `about-approach` inserted before `about-story`,
  `home-map`/`contact-map`/`mobile-call-bar`/`services-faq` added, the D-02 locations grids
  and D-13 review furniture and the empty breadcrumb rails dropped.
- Page height deltas are expected: our copy runs a different length than the reference's
  (D-10, matched within ±10% by `similarity.mjs`, not verified again this pass since no copy
  changed), and `home-map`/`contact-map` add height the reference never had at all.
- `services-grid` renders as a photo + heading, then a stacked two-column list of headed
  symptom groups with pill-badge service names — not a card grid — because the reference's
  own `s04-residential-roofing-services-we-of` band is itself a stacked sub-heading list, not
  cards (the 6-card grid pattern belongs to `home-services`/`s02`, a different band).
- `services-faq` accordion uses native `<details>/<summary>` with a `lucide-react` chevron
  per `docs/behavior/05-faq-accordion.md`; not pixel-diffed against anything (NOVEL, no ref).
- `contact-main` form follows `docs/behavior/06-form-field-states.md`: uncontrolled inputs,
  blur-gated errors, `STUB: no submission target` first line, `console.warn` on submit, no
  `type="email"` anywhere. Not independently re-verified against every acceptance-criteria
  line item in that spec this pass (e.g. deep keyboard-focus-management edge cases) — a
  reasonable-faith implementation, not a line-by-line certified one.

## Not done this pass, and why that's fine

- No per-section structural-diff sweep (`diff.mjs`) was run — the operator's instruction for
  this turn explicitly suspended the structural-residual chase in favour of visual
  side-by-side comparison at 1440/390 (768 spot-checked only for `/services`, `/contact`,
  `/about`). If a future turn wants the numeric structural table, run `diff.mjs` fresh; none
  of this turn's visual judgment calls were informed by it.
- `docs/facts-needed.md`, `assets/INVENTORY.md`, `docs/known-divergence.md` were read but not
  re-generated/re-appended this pass — no new placeholder slots, no new business facts, and
  no new permanent floors were introduced by this build.
- Prompt 10/11 (asset prompts, trimmed acceptance sweep) is a separate future turn per
  OVERRIDE 2/3 and A-10 — this turn only covers the visual section build.

## Restart procedure (unchanged from before)

```bash
node ../_shared/harness/src/serve-reference.mjs   # pages,  3209
node scripts/serve-ref-assets.mjs                 # assets, 3309
pnpm dev                                          # ours,   3109
```

Verify all three (title/body-font on 3209, a real asset 200 on 3309, title+stylesheet on
3109) before trusting any capture — see `docs/profile.md` for the exact checks.
