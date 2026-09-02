# docs/sections.md — the section contract

Source of truth for `route × section × class`. `diff.mjs` parses the **machine-readable
table** at the bottom; the human table above it is for reading. **The two must be edited
together** — a change to one and not the other is a silent lie, and `diff.mjs` cannot
detect it.

Reference: `crosbyroofing.com`, profiled from the saved copy in `reference/raw/` served on
`127.0.0.1:3209` (see `docs/profile.md`). Ref ids are the probe's **section IDs at the
canonical breakpoint (1440)**, never ordinals — an ordinal join mislabels everything the
moment a band splits at a narrower width. The id lists here were verified byte-identical
at 390 / 768 / 1440 on all four reference pages.

## Class counts

| class | rows | measured by |
|---|---|---|
| FIDELITY | 0 | pixel diff — none; see note below |
| ADAPTED | 21 | structural metrics, colour excluded (A-8), `< 5%` |
| NOVEL | 9 | token conformance, `= 0` violations |
| DELETED | 5 | not built |
| **total** | **35** | |

**Zero FIDELITY, and none was forced.** Every band that survives carries our business name,
our phone, our eight garage-door services, our copy and our palette. A roofing hero and a
garage-door hero are the same *layout* and never the same *pixels*; classifying one as
FIDELITY and grinding on it is the failure mode `CLAUDE.md` names as the most expensive one
available. The ten sites before this one landed at 0–3.

## Deletions — D-02, locations

The reference is a four-city roofing company and its locations tree is load-bearing in its
markup: a nav dropdown of `menu-item-object-locations` entries, a city grid on the home page
and another on `/about` (both sit under an `<h2>Meet Our Teams</h2>` but contain
`Augusta / Columbia / Macon / Columbus` cards linking to `/locations/*`), and 5–11
`/locations/` links per page. All of it is DELETED: the bands, the nav item, the footer
column, the sitemap entries, the internal anchors, and any `areaServed` array in schema.
The single surviving trace is the `SERVICE_AREA` sentence in the footer.

## The empty breadcrumb rail

`/about`, `/services` and `/contact` each carry a `div.container-fluid.px-0 > .container-xl`
band 21px tall with no content — a breadcrumb rail the theme renders empty on these pages.
It is DELETED rather than reproduced. This costs 21px of page height per subpage against the
reference and is recorded in `docs/known-divergence.md` rather than iterated against.

## `/privacy`

The reference has **no privacy page** — confirmed, not a fetch failure — so `/privacy` is
NOVEL end to end and is measured by token conformance only. `harness.config.mjs` declares
`ourRoutes` explicitly for this reason. Note that `capture.mjs --side ref` will, for a route
with no reference path, capture the reference ORIGIN and label it `/privacy`; those captures
are bogus (they are the home page wearing a privacy label) and are deleted after every ref
capture pass.

---

## Human table

### `/` — 8 reference bands

| ref band | h @1440 | our section | class | note |
|---|---|---|---|---|
| `s00` (header) | 117 | `site-header` | ADAPTED | our logo, nav, call CTA; locations dropdown removed |
| `s01-heroSlides-…` | 540 | `home-hero` | ADAPTED | Bootstrap carousel with a single slide; we render a static hero |
| `s02-top-quality-roofing-services-georg` | 2677 | `home-services` | ADAPTED | intro + service card grid; the reference's inline Gravity Form column becomes a call-now panel (D-03) |
| `s03-why-choose-crosby-roofing-for-your` | 1099 | `home-why` | ADAPTED | proposition band — transparency, not speed |
| `s04-client-reviews` | 675 | `home-reviews` | ADAPTED | Splide slider; `[TESTIMONIAL PLACEHOLDER]` blocks, no invented quotes (D-13) |
| `s05-meet-our-teams` | 2064 | — | DELETED | city grid, D-02 |
| `s06-more-than-just-roofing` | 366 | `home-cta` | ADAPTED | closing call band |
| `s07` (footer) | 250 | `site-footer` | ADAPTED | NAP, hours, SERVICE_AREA sentence |
| — | — | `home-map` | NOVEL | D-08 requires a home map, zoom ~13; the reference has no map band |
| — | — | `mobile-call-bar` | NOVEL | D-04 sticky `tel:` bar; no counterpart |

### `/about` — 6 reference bands

| ref band | h @1440 | our section | class | note |
|---|---|---|---|---|
| `s00` | 117 | `site-header` | ADAPTED | shared shell |
| `s01-page-banner-about-crosby-roofing-seamless-gu` | 485 | `about-banner` | ADAPTED | page banner |
| `s02` | 21 | — | DELETED | empty breadcrumb rail |
| `s03-content-about-crosby-roofing-seamless-gu` | 1763 | `about-story` | ADAPTED | two `.panel` blocks; our copy at matched length (D-10) |
| `s04-meet-our-teams` | 1566 | — | DELETED | city grid, D-02 |
| `s05` | 250 | `site-footer` | ADAPTED | shared shell |
| — | — | `about-approach` | NOVEL | replaces the removed city grid |

### `/services` — 7 reference bands

| ref band | h @1440 | our section | class | note |
|---|---|---|---|---|
| `s00` | 117 | `site-header` | ADAPTED | shared shell |
| `s01-page-banner-residential-roofing` | 250 | `services-banner` | ADAPTED | page banner |
| `s02` | 21 | — | DELETED | empty breadcrumb rail |
| `s03-residential-roofing` | 710 | `services-intro` | ADAPTED | intro column + Gravity Form column → call-now panel (D-03) |
| `s04-residential-roofing-services-we-of` | 1050 | `services-grid` | ADAPTED | the eight services from CONSTANTS |
| `s05-residential-roofing-company-you-ca` | 392 | `services-cta` | ADAPTED | background-image CTA band |
| `s06` | 250 | `site-footer` | ADAPTED | shared shell |
| — | — | `services-faq` | NOVEL | in-page FAQ, `/services` only; the reference has no FAQ |

### `/contact` — 5 reference bands

| ref band | h @1440 | our section | class | note |
|---|---|---|---|---|
| `s00` | 117 | `site-header` | ADAPTED | shared shell |
| `s01-page-banner-contact-crosby-roofing` | 250 | `contact-banner` | ADAPTED | page banner |
| `s02` | 21 | — | DELETED | empty breadcrumb rail |
| `s03-contact-crosby-roofing-seamless` | 632 | `contact-main` | ADAPTED | callback form (D-05, no backend, no email field) + NAP |
| `s04` | 250 | `site-footer` | ADAPTED | shared shell |
| — | — | `contact-map` | NOVEL | D-08 map beside the form, zoom ~15 |

### `/privacy` — no reference page

| ref band | our section | class | note |
|---|---|---|---|
| — | `site-header` | NOVEL | no reference page to pair against |
| — | `privacy-banner` | NOVEL | |
| — | `privacy-body` | NOVEL | D-16 template, unreviewed-template comment at the top |
| — | `site-footer` | NOVEL | |

---

## MACHINE-READABLE TABLE — `diff.mjs` parses this

Column order is fixed and must not change:
`| /route | ref-section-id | our-section-id | CLASS | reason |`

A `~` in the ref column means "no reference band", and is only legitimate on NOVEL rows.
Every component our build ships must declare `data-section="<our-section-id>"` spelled
exactly as it appears here — that attribute is what identity pairing (PASS 1) joins on.

| /route | ref-section-id | our-section-id | CLASS | reason |
|---|---|---|---|---|
| / | s00 | site-header | ADAPTED | shell retained, our brand and nav; locations dropdown removed per D-02 |
| / | s01-heroSlides-expert-roofing-services-in-georgia | home-hero | ADAPTED | same hero band, our tagline and call CTA |
| / | s02-top-quality-roofing-services-georg | home-services | ADAPTED | service card grid retained, eight garage-door services, form column becomes a call panel |
| / | s03-why-choose-crosby-roofing-for-your | home-why | ADAPTED | proposition band, our transparency proposition |
| / | s04-client-reviews | home-reviews | ADAPTED | slider retained, testimonial placeholders per D-13 |
| / | s05-meet-our-teams | home-locations-grid | DELETED | city grid linking to /locations/*, removed per D-02 |
| / | s06-more-than-just-roofing | home-cta | ADAPTED | closing call band, our copy |
| / | s07 | site-footer | ADAPTED | NAP, hours, single SERVICE_AREA sentence |
| / | ~ | home-map | NOVEL | D-08 home map section; the reference has no map band |
| / | ~ | mobile-call-bar | NOVEL | D-04 sticky tel bar; the reference has no counterpart |
| /about | s00 | site-header | ADAPTED | shared shell |
| /about | s01-page-banner-about-crosby-roofing-seamless-gu | about-banner | ADAPTED | page banner retained, our heading |
| /about | s02 | about-breadcrumb-rail | DELETED | empty 21px breadcrumb rail, no content; we ship no breadcrumbs |
| /about | s03-content-about-crosby-roofing-seamless-gu | about-story | ADAPTED | two content panels, our copy at matched length per D-10 |
| /about | s04-meet-our-teams | about-locations-grid | DELETED | city grid linking to /locations/*, removed per D-02 |
| /about | s05 | site-footer | ADAPTED | shared shell |
| /about | ~ | about-approach | NOVEL | replaces the removed city grid; no reference counterpart |
| /services | s00 | site-header | ADAPTED | shared shell |
| /services | s01-page-banner-residential-roofing | services-banner | ADAPTED | page banner retained, our heading |
| /services | s02 | services-breadcrumb-rail | DELETED | empty 21px breadcrumb rail, no content |
| /services | s03-residential-roofing | services-intro | ADAPTED | intro column retained, Gravity Form column becomes a call panel per D-03 |
| /services | s04-residential-roofing-services-we-of | services-grid | ADAPTED | service grid retained, the eight services from CONSTANTS |
| /services | s05-residential-roofing-company-you-ca | services-cta | ADAPTED | background-image CTA band, our copy |
| /services | s06 | site-footer | ADAPTED | shared shell |
| /services | ~ | services-faq | NOVEL | in-page FAQ, /services only; the reference has no FAQ anywhere |
| /contact | s00 | site-header | ADAPTED | shared shell |
| /contact | s01-page-banner-contact-crosby-roofing | contact-banner | ADAPTED | page banner retained, our heading |
| /contact | s02 | contact-breadcrumb-rail | DELETED | empty 21px breadcrumb rail, no content |
| /contact | s03-contact-crosby-roofing-seamless | contact-main | ADAPTED | form plus NAP band; callback form per D-05, no email field per D-03 |
| /contact | s04 | site-footer | ADAPTED | shared shell |
| /contact | ~ | contact-map | NOVEL | D-08 map beside the form; the reference embeds no map |
| /privacy | ~ | site-header | NOVEL | the reference has no privacy page, so nothing on this route pairs |
| /privacy | ~ | privacy-banner | NOVEL | no reference counterpart |
| /privacy | ~ | privacy-body | NOVEL | D-16 policy template, token-conformance only |
| /privacy | ~ | site-footer | NOVEL | no reference counterpart |
