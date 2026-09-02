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


---

## Appended at Prompt 2+3+4

### F-08 — every photographic slot is a placeholder (the concrete list)

F-05 stated the rule; this is the inventory. **17 REPLACE slots**, none downloaded, each
shipping a generated SVG at its exact rendered geometry in `public/placeholders/`
(22 files: 17 slots plus 5 second crops where the aspect changes across breakpoints).

`logo-header` `logo-footer` `hero-image` `home-cta-image` `badge-cert-inline`
`badge-cert-panel` `about-banner-image` `services-banner-image` `contact-banner-image`
`services-thumb-1` … `services-thumb-5` `services-card-image` `services-cta-bg`
`contact-photo`

Six of them sample **near-white** and their placeholder FILES are repainted down to a
mountable mid-neutral (`logo-header`, `badge-cert-inline`, `badge-cert-panel`,
`home-cta-image`, `services-card-image`, `services-cta-bg`). The inventory table keeps the
honestly sampled hex. This is deliberate: a near-white placeholder under body copy makes
`rendertruth.mjs` report `UNMEASURABLE` for that band, and an absence that reads as a pass
is worse than a fail.

**Five slots change aspect across breakpoints** and carry a second crop:
`contact-banner-image`, `home-cta-image`, `services-banner-image`, `services-card-image`,
`services-cta-bg`. `services-cta-bg` is the extreme one — 1440x392 at 1440, 390x654 at 390 —
so its two prompts at Prompt 11 are genuinely different images, not one image cropped.

Sections blocked by a placeholder are reported separately with the placeholder area excluded
from the measurement, never as a fixable divergence.

### F-09 — six reference icon rasters have no counterpart asset

The reference's six service-card icons (`icon-repair`, `icon-residential`, `icon-commercial`,
`icon-gutters`, `icon-siding`, `icon-storm`) are bespoke raster illustrations at ~180x180.
We ship `lucide-react` line icons instead, so there is no image asset and no placeholder
file for that slot. The rendered geometry of the icon box still has to match; the artwork
inside it never will. Recorded as a permanent appearance difference, not a divergence to
close.

### F-10 — `framer-motion` is NOT justified, and this is now load-bearing

Prompt 1's profile said so; `docs/behavior/08-scroll-reveal.md` now states it as a spec with
acceptance criteria. Zero elements with `will-change`, zero running animations, zero
`[data-aos]`, six CSS transitions in the whole reference theme, and a Bootstrap carousel
containing exactly one slide. **We ship no scroll-reveal component at all.** That is a
decision recorded in spec 08 so a later builder does not read the empty slot as unfinished
work.

The reference theme ships **no `prefers-reduced-motion` block of its own** — only Bootstrap
does — so honouring D-19 across the site is entirely on us and cannot be inherited.

### F-11 — the copy gates are closed with ZERO exemptions

`similarity.mjs`: 35/35 sections at 0 shared 5-grams, 35/35 at trigram 0.000, 21/21 measured
sections inside ±10%, **0 length exemptions taken**. Five blocks missed on the first draft
and all five were rewritten longer rather than excused — including `home-services`, where an
exemption was genuinely available (its reference band contains a Gravity Form we are
forbidden to reproduce) and was declined.

`/privacy` has **no length target of any kind** because the reference has no privacy page.
That is stated rather than substituted for.
