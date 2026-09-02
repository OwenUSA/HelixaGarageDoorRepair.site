# docs/content-divergence.md — Prompt 3

Gate: `MSYS_NO_PATHCONV=1 node ../_shared/harness/src/similarity.mjs`
Source of the numbers: `content/copy.ts` (ours) against `.harness/refcopy.json` (theirs).

**Regenerate `.harness/refcopy.json` before believing any number in this file.** The
extractor now strips `script,style,noscript,template,iframe,svg` **and** every
`display:none` / `visibility:hidden` / `aria-hidden` subtree before reading `textContent`.
A stale dump inflates the length target, and an inflated target manufactures an exemption
that looks justified. This site's targets were taken from a freshly regenerated dump on the
locally-served reference (`127.0.0.1:3209` for pages, `127.0.0.1:3309` for the asset
mirror).

---

## Result

| gate | threshold | result |
|---|---|---|
| shared 5-grams vs the **entire** reference corpus | 0 | **35/35 sections at 0** |
| trigram Jaccard vs the paired band | ≤ 0.15 | **35/35 at 0.000** |
| block length vs the paired band | ±10% | **21/21 measured sections inside tolerance** |
| length exemptions taken | — | **0** |

Fourteen sections have no length target and correctly report `-`: the nine NOVEL sections
(five of which are the whole `/privacy` route) and the five per-route `(metadata)` rows,
which the gate pairs against the whole page rather than one band.

**`/privacy` has no reference counterpart and therefore no length target at all.** That is
stated rather than worked around: the reference has no privacy page, confirmed absent rather
than failed to fetch (floor F-07). Nothing on that route was written to a fabricated
character count.

---

## Per-section overlap table

`Δ%` is our character count against the paired reference band's.

| route | section | ref band | our chars | ref chars | Δ% | 5-grams | trigram | status |
|---|---|---|---|---|---|---|---|---|
| / | site-header | s00 | 71 | 68 | +4.4 | 0 | 0.000 | PASS |
| / | home-hero | s01-heroSlides-… | 104 | 111 | −6.3 | 0 | 0.000 | PASS |
| / | home-why | s03-why-choose-… | 2146 | 2244 | −4.4 | 0 | 0.000 | PASS |
| / | home-services | s02-top-quality-… | 5773 | 5935 | −2.7 | 0 | 0.000 | PASS |
| / | home-reviews | s04-client-reviews | 377 | 406 | −7.1 | 0 | 0.000 | PASS |
| / | home-map | ~ | 191 | — | — | 0 | 0.000 | PASS |
| / | home-cta | s06-more-than-just-… | 739 | 783 | −5.6 | 0 | 0.000 | PASS |
| / | site-footer | s07 | 429 | 445 | −3.6 | 0 | 0.000 | PASS |
| / | mobile-call-bar | ~ | 51 | — | — | 0 | 0.000 | PASS |
| / | (metadata) | metadata | 195 | — | — | 0 | 0.000 | PASS |
| /about | site-header | s00 | 71 | 68 | +4.4 | 0 | 0.000 | PASS |
| /about | about-banner | s01-page-banner-about-… | 42 | 39 | +7.7 | 0 | 0.000 | PASS |
| /about | about-approach | ~ | 481 | — | — | 0 | 0.000 | PASS |
| /about | about-story | s03-content-about-… | 3875 | 4073 | −4.9 | 0 | 0.000 | PASS |
| /about | site-footer | s05 | 429 | 445 | −3.6 | 0 | 0.000 | PASS |
| /about | (metadata) | metadata | 206 | — | — | 0 | 0.000 | PASS |
| /services | site-header | s00 | 71 | 68 | +4.4 | 0 | 0.000 | PASS |
| /services | services-banner | s01-page-banner-resid… | 54 | 52 | +3.8 | 0 | 0.000 | PASS |
| /services | services-intro | s03-residential-roofing | 1190 | 1221 | −2.5 | 0 | 0.000 | PASS |
| /services | services-grid | s04-residential-…-we-of | 2845 | 2702 | +5.3 | 0 | 0.000 | PASS |
| /services | services-faq | ~ | 1858 | — | — | 0 | 0.000 | PASS |
| /services | services-cta | s05-residential-…-you-ca | 745 | 801 | −7.0 | 0 | 0.000 | PASS |
| /services | site-footer | s06 | 429 | 445 | −3.6 | 0 | 0.000 | PASS |
| /services | (metadata) | metadata | 207 | — | — | 0 | 0.000 | PASS |
| /contact | site-header | s00 | 71 | 68 | +4.4 | 0 | 0.000 | PASS |
| /contact | contact-banner | s01-page-banner-contact-… | 56 | 59 | −5.1 | 0 | 0.000 | PASS |
| /contact | contact-main | s03-contact-crosby-… | 543 | 503 | +8.0 | 0 | 0.000 | PASS |
| /contact | contact-map | ~ | 131 | — | — | 0 | 0.000 | PASS |
| /contact | site-footer | s04 | 429 | 445 | −3.6 | 0 | 0.000 | PASS |
| /contact | (metadata) | metadata | 203 | — | — | 0 | 0.000 | PASS |
| /privacy | site-header | ~ | 71 | — | — | 0 | 0.000 | PASS |
| /privacy | privacy-banner | ~ | 60 | — | — | 0 | 0.000 | PASS |
| /privacy | privacy-body | ~ | 2529 | — | — | 0 | 0.000 | PASS |
| /privacy | site-footer | ~ | 429 | — | — | 0 | 0.000 | PASS |
| /privacy | (metadata) | metadata | 196 | — | — | 0 | 0.000 | PASS |

### The five blocks that missed on the first draft, and what was done about them

No exemption was taken for any of them. Each was **rewritten longer**, not excused.

| section | first draft | after rewrite | target | what changed |
|---|---|---|---|---|
| `home-services` | −48.6% | **−2.7%** | 5935 | the six symptom cards were bare labels; each was given the body paragraph the reference's six service cards carry |
| `contact-main` | −18.9% | **+8.0%** | 503 | added the callback-window line, which the form needed anyway |
| `services-cta` | −16.2% | **−7.0%** | 801 | closing paragraph extended to say what finding out for certain involves |
| `services-intro` | −15.6% | **−2.5%** | 1221 | the call-panel block was a single short sentence; expanded to match the reference's form column |
| `about-story` | −14.1% | **−4.9%** | 4073 | one paragraph added tying the three rules to the services page |

The one place an exemption was genuinely available — `home-services`, whose reference band
contains an inline Gravity Form we are forbidden to reproduce — was not taken. The form
column becomes a call-now panel with real copy in it, and the band lands inside tolerance
on its own words.

---

## Lexical result, in detail

**Zero shared 5-grams across all 35 sections**, measured against the **entire** four-page
reference corpus rather than only the paired band, so an accidental lift from any other page
is still caught. Trigram Jaccard is **0.000** everywhere, not merely under 0.15 — after
stopwords and the industry allowlist are removed, our copy and theirs share no
three-content-word sequence at all.

The privacy body was the specific thing to watch: two sibling sites' 5-gram gate caught
genuine lifts there ("we are not responsible for", "we do not knowingly collect"), which are
boilerplate phrases that arrive by muscle memory. Ours reads 0 shared 5-grams — and note it
is measured against a roofing corpus with no privacy page in it, so the gate is weaker here
than on a site whose reference has one. The mitigation is that the policy is written from
what this site actually does (no email field, no analytics, no submission target) rather
than from a template.

---

## The four structural changes

Named in full in `docs/sections.md` under *Prompt 3 — the four structural changes*.
Summarised:

1. **Reorder — three retained reference bands moved.** `home-why` up (ref 3rd content band
   → our 2nd), `home-services` down (ref 2nd → our 3rd), `about-story` down (ref 1st → our
   2nd, behind the inserted `about-approach`).
2. **Two reference sections dropped, two of our own added.** Dropped: the Gravity Forms
   estimate column (it carries `input[type=email]` on three of four reference pages, D-03)
   and the review-furniture row (five-star graphic, Google Reviews lockup, "4.8 Rating From
   Over 370 Reviews", D-13). Added: `services-faq` and `about-approach`. `home-map`,
   `contact-map` and `mobile-call-bar` are further additions required by D-08 and D-04.
3. **Transparency held on all five routes**, including `/privacy`, where the policy
   describes only what the site actually does and explicitly refuses to describe cookies we
   did not ship. Speed is never the lead; no response-time claim appears anywhere.
4. **Services regrouped by symptom.** Six symptom headings — matching the reference grid's
   fixed six-card count on both `/` and `/services`, so the regrouping costs no geometry —
   with the eight CONSTANTS services distributed across them, **each appearing exactly once
   on the site**. The home grid names symptoms only; the eight service names appear once, on
   `/services`.

---

## SEO metadata

Titles and descriptions live in `content/copy.ts` as `routes[r].meta` and are read by the
route files. **Nothing is hardcoded in a route file**, and `app/layout.tsx` deliberately
carries **no `title.template`** — a sibling shipped every subpage with the brand appended by
a template *and* named in the route title, and only an HTTP check caught it.

Verified over HTTP against the dev server on 3109, not by reading the config:

| route | served `<title>` | brand occurrences |
|---|---|---|
| `/` | Helixa Garage Door Repair \| Warner Robins, GA | 1 |
| `/about` | About Helixa Garage Door Repair \| Warner Robins, GA | 1 |
| `/services` | Garage Door Services in Warner Robins, GA \| Helixa | 1 |
| `/contact` | Contact Helixa Garage Door Repair \| Warner Robins, GA | 1 |
| `/privacy` | Privacy Policy \| Helixa Garage Door Repair | 1 |

All five descriptions served, all distinct, all inside the 5-gram and trigram gates as
`(metadata)` rows.

---

## Facts

No fact was invented. Every unknown is a `TODO(fact):` string **inside `copy.ts`**, which
means it is rendered visibly by whatever component consumes it rather than sitting in a
comment:

| where | string |
|---|---|
| `site-footer` | `TODO(fact): licence number and issuing state board` |
| `home-services` | `TODO(fact): years in business and founding year (FN-03)` |
| `home-reviews` | `TODO(fact): review count and average rating (FN-06). Nothing is invented here and no review schema is emitted.` |
| `services-intro` | `TODO(fact): manufacturer or trade certifications (FN-04)` |
| `about-story` | `TODO(fact): years in business, founding year, technician count and any licence or insurance status (FN-01, FN-02, FN-03, FN-08)` |

Prices: none, anywhere. "Free estimate" appears and is allowed (D-12). No warranty term, no
response time, no review count, no credential, no team size.
