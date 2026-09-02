# RESUME — Helixa Prompt 6+7, STOPPED DELIBERATELY, still at research/setup

**Cause:** the operator paused the fleet ahead of the account rate limit. Not a crash, not
an error. Nothing was rolled back.

## Where it stopped

This lead agent had done **read-only research only** — no section component was created,
no route file was touched, no shared file was edited. It was mid-way through building a
one-off script to dump full per-section `padTop`/`padBottom`/`box.h` from the reference
(needed because the stale `.harness/diff/*.json` files only retain the **worst 6 fields**
per row, not the full appearance set, so real padding values were not yet in hand for most
bands). That script (`scripts/_tmp-dump-padding.mjs`) was created and then **deleted again**
before stopping — it was scratch, not a deliverable, and is gone. `git status` is clean.

## Typecheck / build state

`npx tsc --noEmit` — **CLEAN, exit 0** (only an unrelated npm config warning about
`pm-on-fail`, not a TypeScript error).

Build was **not run** this turn. The five route files are still Prompt-5 stubs
(`<main id="main" data-route="..." />`, no sections). `pnpm build` would currently succeed
but every route would render with no content.

## Sections — by route, against `docs/sections.md`'s machine table

**BUILT AND MEASURED:** none.

**BUILT BUT NOT MEASURED:** none. (This is the important line to check first on resume —
it is empty. No edit is sitting unmeasured anywhere.)

**NOT STARTED — everything.** All 35 rows in `docs/sections.md`'s machine table, all five
routes:

- `/`: `site-header`✅(shell, frozen, done at Prompt5+9) `home-hero` `home-why`
  `home-services` `home-reviews` `home-map` `home-cta` `site-footer`✅(shell)
  `mobile-call-bar`✅(shell)
- `/about`: `site-header`✅ `about-banner` `about-approach` `about-story` `site-footer`✅
- `/services`: `site-header`✅ `services-banner` `services-intro` `services-grid`
  `services-faq` `services-cta` `site-footer`✅
- `/contact`: `site-header`✅ `contact-banner` `contact-main` `contact-map` `site-footer`✅
- `/privacy`: `site-header`✅ `privacy-banner` `privacy-body` `site-footer`✅

(✅ = shared shell component, already built and frozen at Prompt 5+9 — `SiteHeader.tsx`,
`SiteFooter.tsx`, `MobileCallBar.tsx`. Everything else in the list above is an unbuilt
section component: 19 section components total across the five routes, per A-6 with the
lead personally owning `home-hero` and the two map sections (`home-map`, `contact-map`).)

## Frozen shell — untouched

`git status --porcelain=v1` returned **empty** at stop time. No frozen shell file
(`globals.css`, `layout.tsx`, tokens, `SiteHeader`, `SiteFooter`, `BusinessMap`,
`MobileCallBar`, robots, sitemap, not-found) was touched this turn, because nothing at all
was touched this turn.

## Servers — all stopped as part of this shutdown

Both reference servers were started this turn to verify the mirror and were **stopped**
as step 5 of the shutdown procedure:

```
node ../_shared/harness/src/serve-reference.mjs   # pages,  127.0.0.1:3209
node scripts/serve-ref-assets.mjs                 # assets, 127.0.0.1:3309
```

Verified while up: `serve-reference.mjs` printed the reference's title correctly (roofing
SEO title; `og:site_name` is the real identity check per `docs/profile.md` and was not
re-verified this pass, only the earlier Prompt-1 record was read) and the asset server
answered on 3309 (its `/` returns 404, which is expected for a static file server with no
index — the real check is a real asset path or the `ff-tisa-sans-web-pro` font resolving in
a captured page, neither of which was re-checked this turn).

The Next dev server (port 3109) was **never started** this turn.

## Restart procedure, in order

```bash
# 1. Both reference servers, EACH AS ITS OWN COMMAND — never chained with a gate run,
#    or the gate silently reports another site's numbers (harness.config.mjs is read
#    relative to cwd).
node ../_shared/harness/src/serve-reference.mjs   # pages,  3209
node scripts/serve-ref-assets.mjs                 # assets, 3309

# 2. Verify BOTH before trusting any capture:
curl -s localhost:3209/ | grep -o '<title>[^<]*</title>'   # roofing SEO title is fine here;
                                                             # the real identity check is
                                                             # og:site_name = "Crosby Roofing
                                                             # and Seamless Gutters" (see
                                                             # docs/profile.md) if in doubt
curl -s -o /dev/null -w '%{http_code}\n' localhost:3309/    # 404 at bare root is NORMAL for
                                                             # this static server; confirm the
                                                             # mirror is really live by loading
                                                             # a captured reference page in a
                                                             # real probe and checking the body
                                                             # font resolves to
                                                             # ff-tisa-sans-web-pro, NOT Times
                                                             # New Roman

# 3. Start the Next dev server FRESH (do not reuse a stale one — a sibling's stale server
#    answered 200 with correct markup and ZERO stylesheet rules):
pnpm dev   # port 3109 — verify title AND that a stylesheet is actually linked

# 4. Gates, SITE ROOT as cwd, only after sections are built:
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/diff.mjs
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/contrast.mjs
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/rendertruth.mjs

# 5. Stop dev before `pnpm build` (shared .next/).
```

## New finding worth carrying forward — the `h1..h6` colour rule

**Confirmed by reading `app/globals.css` directly, not yet verified against a painted dark
band because none exists yet.** The frozen shell carries:

```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  color: var(--color-neutral-900);
}
```

This is a bare-tag selector with real specificity (0,0,1). Any section component that puts
an `<h2>`/`<h3>` on a dark band (e.g. a primary-gradient CTA band, in the style of
`SiteFooter`'s own gradient) and tries to color it via a Tailwind utility class or an inline
`style` on an ANCESTOR will lose to this rule if the heading element itself doesn't carry
its own `style={{ color: ... }}` or an equally-specific override — inline `style` on the
heading tag itself wins (specificity/origin: inline beats a stylesheet tag selector
regardless of the tag selector's own specificity), so the safe pattern already used
elsewhere in this codebase (inline `style` per element, as in `SiteHeader`/`SiteFooter`) is
the one to keep using on every `home-cta`, `services-cta`, and any other dark/gradient band
— **never** rely on a wrapping `className="text-white"` or a parent-level `color` alone to
paint a heading inside it. `SiteFooter.tsx` avoided this already by using `<span>` instead
of a real heading tag for its wordmark; a section component that needs an actual `<h2>` on
a dark band does not have that option and must set the inline style directly on the heading.

**Not yet checked against the PAINTED result** — no dark band exists in the build yet to
screenshot. Whoever resumes should build `home-cta` or `services-cta` first among the ADAPTED
CTA bands and immediately verify with `rendertruth.mjs`, per A-14, before trusting the
inline-style pattern above closes it.

## Padding data — not yet extracted

`.harness/diff/*.json` from an earlier partial run only records the **worst 6 fields** per
row (see `diff.mjs` line ~295, `.slice(0, 6)`), so `padTop`/`padBottom` is only present in
that file for rows where it happened to be one of the worst divergences — which, since our
side was all-zero stubs, was almost never padding (box.h, buttons, fontFamily and
shadowGeom dominated the worst-6 instead). **Real per-section reference padding has not yet
been captured.** The next session should either re-run a small probe-based dump (both
reference servers up, `runProbe` from `../_shared/harness/src/probe.mjs` against each of the
four reference routes at all three breakpoints) or accept per-section padding on a
first-pass build and let `diff.mjs`'s real output (once our sections exist) drive the one
A-11-style padding attempt each row gets.

## Everything else needed to resume is already read and does not need re-reading

`docs/sections.md` (35-row machine table), `docs/known-divergence.md` (F-01 through F-11,
palette winner seed 301009), `docs/profile.md` (breakpoints, type scale, motion, fonts),
all eight `docs/behavior/*.md` specs, `content/copy.ts` (all copy for all five routes,
already written and gate-clean per F-11), `lib/business.ts`, `lib/routes.ts`,
`components/SiteHeader.tsx`, `components/SiteFooter.tsx`, `components/BusinessMap.tsx`,
`components/MobileCallBar.tsx`, and `app/globals.css` were all read this turn. Route stub
files (`app/*/page.tsx`) were also read — each is the standard
`<main id="main" data-route="...">` stub reading `copy.routes[...]` for metadata only.
