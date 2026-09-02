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

| our order | ref band | h @1440 | our section | class | note |
|---|---|---|---|---|---|
| 1 | `s00` (header) | 117 | `site-header` | ADAPTED | our logo, nav, call CTA; locations dropdown removed |
| 2 | `s01-heroSlides-…` | 540 | `home-hero` | ADAPTED | Bootstrap carousel with a single slide; we render a static hero |
| 3 | `s03-why-choose-crosby-roofing-for-your` | 1099 | `home-why` | ADAPTED | **MOVED UP** (ref 4th → our 3rd). Proposition band — transparency. It leads the page because the proposition is what the page is for |
| 4 | `s02-top-quality-roofing-services-georg` | 2677 | `home-services` | ADAPTED | **MOVED DOWN** (ref 3rd → our 4th). Symptom-grouped card grid; the reference's inline Gravity Form column becomes a call-now panel (D-03) |
| 5 | `s04-client-reviews` | 675 | `home-reviews` | ADAPTED | Splide slider; `[TESTIMONIAL PLACEHOLDER]` blocks, no invented quotes (D-13) |
| 6 | — | — | `home-map` | NOVEL | **ADDED.** D-08 home map, zoom ~13; the reference has no map band anywhere |
| 7 | `s06-more-than-just-roofing` | 366 | `home-cta` | ADAPTED | closing call band |
| 8 | `s07` (footer) | 250 | `site-footer` | ADAPTED | NAP, hours, SERVICE_AREA sentence |
| 9 | — | — | `mobile-call-bar` | NOVEL | **ADDED.** D-04 sticky `tel:` bar; no counterpart |
| — | `s05-meet-our-teams` | 2064 | — | DELETED | **DROPPED.** City grid, D-02 |

### `/about` — 6 reference bands

| our order | ref band | h @1440 | our section | class | note |
|---|---|---|---|---|---|
| 1 | `s00` | 117 | `site-header` | ADAPTED | shared shell |
| 2 | `s01-page-banner-about-crosby-roofing-seamless-gu` | 485 | `about-banner` | ADAPTED | page banner |
| 3 | — | — | `about-approach` | NOVEL | **ADDED**, and inserted *before* the story band. Replaces the removed city grid |
| 4 | `s03-content-about-crosby-roofing-seamless-gu` | 1763 | `about-story` | ADAPTED | **MOVED DOWN** (ref 2nd content band → our 3rd). Three `.panel` blocks; our copy at matched length (D-10) |
| 5 | `s05` | 250 | `site-footer` | ADAPTED | shared shell |
| — | `s02` | 21 | — | DELETED | **DROPPED.** Empty breadcrumb rail |
| — | `s04-meet-our-teams` | 1566 | — | DELETED | **DROPPED.** City grid, D-02 |

### `/services` — 7 reference bands

| our order | ref band | h @1440 | our section | class | note |
|---|---|---|---|---|---|
| 1 | `s00` | 117 | `site-header` | ADAPTED | shared shell |
| 2 | `s01-page-banner-residential-roofing` | 250 | `services-banner` | ADAPTED | page banner |
| 3 | `s03-residential-roofing` | 710 | `services-intro` | ADAPTED | intro column + Gravity Form column → call-now panel (D-03) |
| 4 | `s04-residential-roofing-services-we-of` | 1050 | `services-grid` | ADAPTED | **REGROUPED BY SYMPTOM.** Six symptom headings, the eight CONSTANTS services distributed across them, each appearing exactly once |
| 5 | — | — | `services-faq` | NOVEL | **ADDED.** In-page FAQ, `/services` only; the reference has no FAQ anywhere |
| 6 | `s05-residential-roofing-company-you-ca` | 392 | `services-cta` | ADAPTED | background-image CTA band |
| 7 | `s06` | 250 | `site-footer` | ADAPTED | shared shell |
| — | `s02` | 21 | — | DELETED | **DROPPED.** Empty breadcrumb rail |

### `/contact` — 5 reference bands

| our order | ref band | h @1440 | our section | class | note |
|---|---|---|---|---|---|
| 1 | `s00` | 117 | `site-header` | ADAPTED | shared shell |
| 2 | `s01-page-banner-contact-crosby-roofing` | 250 | `contact-banner` | ADAPTED | page banner |
| 3 | `s03-contact-crosby-roofing-seamless` | 632 | `contact-main` | ADAPTED | callback form (D-05, no backend, no email field) + NAP |
| 4 | — | — | `contact-map` | NOVEL | **ADDED.** D-08 map beside the form, zoom ~15 |
| 5 | `s04` | 250 | `site-footer` | ADAPTED | shared shell |
| — | `s02` | 21 | — | DELETED | **DROPPED.** Empty breadcrumb rail |

### `/privacy` — no reference page

| ref band | our section | class | note |
|---|---|---|---|
| — | `site-header` | NOVEL | no reference page to pair against |
| — | `privacy-banner` | NOVEL | |
| — | `privacy-body` | NOVEL | D-16 template, unreviewed-template comment at the top |
| — | `site-footer` | NOVEL | |


---

## Prompt 3 — the four structural changes, and the reclassification audit

**The two tables below are a twin pair and were edited together.** Reordering a band,
dropping a band and regrouping its contents are **not** class changes. Turning an ADAPTED
row into a NOVEL one to escape structural measurement is the named failure mode, and it did
not happen here: the class counts are byte-identical to Prompt 1's contract.

### Reclassification list

**Empty. Zero rows changed class in this pass.**

| | Prompt 1 | after Prompt 3 |
|---|---|---|
| FIDELITY | 0 | 0 |
| ADAPTED | 21 | 21 |
| NOVEL | 9 | 9 |
| DELETED | 5 | 5 |
| **total** | **35** | **35** |

`content/copy.ts` declares exactly 35 rows and they join one-for-one against this table.

### Cross-route ref-id audit

Every ADAPTED row's ref id was re-derived from `.harness/refcopy.json` **per route**, not
by ordinal. A sibling site shipped an `/about` row carrying home's `s04`, measured a
completely different band, and reported a false −11.3%; ordinals are not identity across
routes. The proof here is the `ref chars` column of `similarity.mjs`, which reads the paired
band's own character count: `/about about-banner` pairs to 39 (the /about banner), not 675
(home's reviews band), and every other row lands on its own page's number.

The footer sits at a **different ordinal on every reference page** — `s07` on `/`, `s05` on
`/about`, `s06` on `/services`, `s04` on `/contact` — so `copy.ts` builds it with
`footerAt(refSection)` rather than sharing one id. The header is `s00` everywhere, which was
checked rather than assumed.

**No ADAPTED or FIDELITY row has an empty ref-section-id.** `diff.mjs` warns on those
because they are silently unmeasurable.

### 1. Reorder — three retained reference bands moved

| band | reference position | our position | why |
|---|---|---|---|
| `home-why` (`s03`) | 3rd content band | **2nd** | The proposition is transparency, so the page leads with what you are told before anything is touched |
| `home-services` (`s02`) | 2nd content band | **3rd** | The symptom grid only makes sense after the reader knows the diagnosis is shown to them |
| `about-story` (`s03`) | 1st content band | **2nd** | `about-approach` is inserted ahead of it — three rules, then the story that produced them |

### 2. Two reference sections dropped, two of our own added

**Dropped** (beyond the D-02 locations bands and the empty breadcrumb rails, which were
already gone at Prompt 1):

| dropped | where | why |
|---|---|---|
| the Gravity Forms estimate form column | `s03-residential-roofing`, and the inline form inside `s02` on `/` | it carries an `input[type=email]` on three of the four reference pages. D-03 bans email in any form, so the whole column becomes a call-now panel |
| the review-furniture row — five-star graphic, Google Reviews lockup, "4.8 Rating From Over 370 Reviews" | `s04-client-reviews` | D-13. No invented rating, no review count, no third-party review branding, and no `AggregateRating`/`Review` JSON-LD at all |

**Added** (no reference counterpart at all):

| added | route | why |
|---|---|---|
| `services-faq` | `/services` | six generic garage-door technical questions, in-page. The reference has no FAQ anywhere |
| `about-approach` | `/about` | three rules — the part comes to you, the sheet is yours, adjust before replace — standing where the deleted city grid was |

`home-map`, `contact-map` and `mobile-call-bar` are also additions, required by D-08 and
D-04.

### 3. Transparency held on all five routes

| route | where the proposition lands |
|---|---|
| `/` | `home-why` leads: the failed part in your hand, the written sheet, what can wait, adjust before replace, one number, watch the repair |
| `/about` | `about-approach` states the three rules; `about-story` explains that the company exists because of the gap between what a technician knows and what a customer can check |
| `/services` | the whole page is arranged by symptom rather than by part **because a symptom is what you can describe honestly**; every group ends in the same shown-and-written-down sequence |
| `/contact` | "Tell us what the door is doing" — the form asks what the door is doing, not what service you would like to buy |
| `/privacy` | the policy describes only what the site actually does, says the form has no submission target, and explicitly refuses to describe cookies we did not ship (D-15/D-16) |

Speed is never the lead. No response-time claim appears anywhere (FN-10 is marked
**do not add**).

### 4. Services regrouped by symptom

Six symptom headings — matching the reference grid's fixed six-card count on both `/` and
`/services`, so the regrouping is geometrically free — with the eight CONSTANTS services
distributed across them, **each appearing exactly once on the site**:

| symptom group | CONSTANTS services under it |
|---|---|
| It will not open, or it reverses halfway | opener repair and installation |
| It came off the track, or it hangs crooked | off-track and misaligned door correction |
| You heard a bang and now it is far too heavy | spring repair and replacement |
| It grinds, shudders, or slips as it travels | cable / roller / track repair |
| A section is dented, split, or letting weather in | panel replacement; new residential door installation |
| It runs all day, or nobody has looked at it in a year | commercial and roll-up doors; annual maintenance and tune-up |

The home grid names the six **symptoms only**; the eight service names appear once, on
`/services`, so nothing is double-counted.

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
| / | s03-why-choose-crosby-roofing-for-your | home-why | ADAPTED | proposition band, our transparency proposition. REORDERED: ref 3rd content band, our 2nd |
| / | s02-top-quality-roofing-services-georg | home-services | ADAPTED | card grid retained, regrouped by symptom, form column becomes a call panel. REORDERED: ref 2nd content band, our 3rd |
| / | s04-client-reviews | home-reviews | ADAPTED | slider retained, testimonial placeholders per D-13; review furniture dropped |
| / | ~ | home-map | NOVEL | D-08 home map section; the reference has no map band |
| / | s06-more-than-just-roofing | home-cta | ADAPTED | closing call band, our copy |
| / | s07 | site-footer | ADAPTED | NAP, hours, single SERVICE_AREA sentence |
| / | ~ | mobile-call-bar | NOVEL | D-04 sticky tel bar; the reference has no counterpart |
| / | s05-meet-our-teams | home-locations-grid | DELETED | city grid linking to /locations/*, removed per D-02 |
| /about | s00 | site-header | ADAPTED | shared shell |
| /about | s01-page-banner-about-crosby-roofing-seamless-gu | about-banner | ADAPTED | page banner retained, our heading |
| /about | ~ | about-approach | NOVEL | replaces the removed city grid; inserted ahead of the story band |
| /about | s03-content-about-crosby-roofing-seamless-gu | about-story | ADAPTED | content panels, our copy at matched length per D-10. REORDERED: ref 1st content band, our 2nd |
| /about | s05 | site-footer | ADAPTED | shared shell |
| /about | s02 | about-breadcrumb-rail | DELETED | empty 21px breadcrumb rail, no content; we ship no breadcrumbs |
| /about | s04-meet-our-teams | about-locations-grid | DELETED | city grid linking to /locations/*, removed per D-02 |
| /services | s00 | site-header | ADAPTED | shared shell |
| /services | s01-page-banner-residential-roofing | services-banner | ADAPTED | page banner retained, our heading |
| /services | s03-residential-roofing | services-intro | ADAPTED | intro column retained, Gravity Form column becomes a call panel per D-03 |
| /services | s04-residential-roofing-services-we-of | services-grid | ADAPTED | grid retained at six cards, REGROUPED BY SYMPTOM; the eight CONSTANTS services appear once each |
| /services | ~ | services-faq | NOVEL | in-page FAQ, /services only; the reference has no FAQ anywhere |
| /services | s05-residential-roofing-company-you-ca | services-cta | ADAPTED | background-image CTA band, our copy |
| /services | s06 | site-footer | ADAPTED | shared shell |
| /services | s02 | services-breadcrumb-rail | DELETED | empty 21px breadcrumb rail, no content |
| /contact | s00 | site-header | ADAPTED | shared shell |
| /contact | s01-page-banner-contact-crosby-roofing | contact-banner | ADAPTED | page banner retained, our heading |
| /contact | s03-contact-crosby-roofing-seamless | contact-main | ADAPTED | form plus NAP band; callback form per D-05, no email field per D-03 |
| /contact | ~ | contact-map | NOVEL | D-08 map beside the form; the reference embeds no map |
| /contact | s04 | site-footer | ADAPTED | shared shell |
| /contact | s02 | contact-breadcrumb-rail | DELETED | empty 21px breadcrumb rail, no content |
| /privacy | ~ | site-header | NOVEL | the reference has no privacy page, so nothing on this route pairs |
| /privacy | ~ | privacy-banner | NOVEL | no reference counterpart |
| /privacy | ~ | privacy-body | NOVEL | D-16 policy template, token-conformance only |
| /privacy | ~ | site-footer | NOVEL | no reference counterpart |
