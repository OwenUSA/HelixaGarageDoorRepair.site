# docs/known-divergence.md — permanent floors

**Check this file before starting any fix.** Everything here is a floor, not a defect. Never
burn an iteration closing one, and never report one as a failure.

## F-01 — colour, all sections, permanent (A-8)

Colour divergence from the reference is **intentional** and is permanently excluded from
every diff, every threshold and every future iteration. The palette is randomized at
token-write time (Prompt 5, merged with 9 per A-7), so the site is built in its final colours
from the first component onward and there is no recolor pass to regress.

Stripped from the structural comparator: resolved `color`, `background-color`,
`border-color`, gradient stops, shadow colour. **Kept:** every geometric and typographic
field, and the non-colour parts of borders and shadows — widths, offsets, blur, spread, radii.

Winning seed and all five candidate seeds are recorded here when Prompt 5 runs.

## F-02 — body font substitution, all text, permanent (D-11)

The reference paints its body copy in **`ff-tisa-sans-web-pro`** (FF Tisa Sans Pro,
FontFont/Monotype, delivered through Adobe Fonts by the Font Awesome kit script). It is
commercial and its file is not ours to lift. Substitute: **Source Sans 3** via
`next/font/google`.

The resulting text-metric delta — advance widths, x-height, line-box height, and every
`box.h` that depends on wrapped text — is a **permanent floor**. Never iterate against it.

**`raleway` is NOT a floor.** The reference's headings are Raleway, which is open (SIL OFL),
so it is loaded directly and heading metrics converge.

**`Nunito` and `gform-icons-theme` are NOT floors.** They have real `@font-face` rules and
look like legitimate substitutions, but Nunito paints only the 4 elements of the GDPR cookie
bar (we ship no cookie bar, D-15) and `gform-icons-theme` never loads at all and has zero
usages. Booking either would permanently excuse text that should converge — the exact
mistake a sibling site made with a hosting control panel's admin-bar font.

## F-03 — the empty breadcrumb rail, `/about` `/services` `/contact`

Each subpage carries a 21px `div.container-fluid.px-0` band with no content. It is DELETED
rather than reproduced, so each of our subpages is **21px shorter** than its reference at
every breakpoint. Not a defect.

## F-04 — everything deleted under D-02

The reference is a four-city roofing company. Two full bands (`/` `s05-meet-our-teams` at
2064px, `/about` `s04-meet-our-teams` at 1566px), a nav dropdown, and 5–11 `/locations/`
links per page are removed. Our pages are correspondingly shorter and the nav is one item
narrower. Not a defect.

## F-05 — placeholder assets, until the terminal drop-in (OVERRIDE 3)

Every photographic slot ships a placeholder until Prompt 11's asset hand-back. Sections
blocked by one are reported separately with the placeholder area excluded from the
measurement, never as a fixable divergence.

## F-06 — Typekit is a live dependency of the REFERENCE side only

`raleway` and `ff-tisa-sans-web-pro` are injected at runtime by
`use.fontawesome.com/080b110fc3.js` and their payloads come from `use.typekit.net`, whose
URLs are constructed in JS and cannot be pre-mirrored. If that host disappears, the
reference's **text metrics** shift and every `box.h` that depends on wrapped text moves with
them. Layout, grid, spacing and colour are unaffected. Our side does not depend on it at all.

## F-07 — `/privacy` has no reference and never will

Confirmed absent, not a fetch failure. Every `/privacy` row is NOVEL and is measured by token
conformance only (A-9: once, at the canonical breakpoint, not per breakpoint).

`capture.mjs --side ref` captures the reference ORIGIN for any route with no reference path
and labels it `/privacy` — those captures are the home page wearing a privacy label. **Delete
`.harness/cap/ref/privacy-*` after every ref capture pass** or the diff will pair our privacy
page against the reference's home page and report plausible nonsense.

---

## Not yet floors — open at Prompt 1

| # | item | status |
|---|---|---|
| — | palette seeds | pending Prompt 5 |
| — | per-section residuals | pending the build wave; each gets ONE attempt then lands here (A-2) |
