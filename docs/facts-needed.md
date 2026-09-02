# docs/facts-needed.md — every `TODO(fact)`

Anything not in CONSTANTS is never guessed (D-17). Each item below is emitted inline as
`TODO(fact): <what is needed>` and listed here. This file is appended to, never rewritten.

## Known now, from the reference profile

The reference carries all of these and our clone must hold a correctly-dimensioned
placeholder where they sit, not an invented value (D-14).

| id | fact needed | where it lands | reference has |
|---|---|---|---|
| FN-01 | licence number(s) and issuing state board | footer, `/about` | yes |
| FN-02 | bonded / insured status | trust badge row | yes |
| FN-03 | years in business / founding year | `/about` opening, badge row | yes |
| FN-04 | manufacturer or trade certifications | badge row | yes |
| FN-05 | BBB rating or accreditation status | badge row | yes |
| FN-06 | review count and average rating | reviews band | yes — **and we ship no `AggregateRating`/`Review` JSON-LD at all** (D-13) |
| FN-07 | named customer testimonials | reviews band | yes — ours are `[TESTIMONIAL PLACEHOLDER]` blocks (D-13) |
| FN-08 | team size / technician count | `/about` | yes |
| FN-09 | warranty terms | services, FAQ | yes |
| FN-10 | typical response time | — | **do not add.** Proposition is transparency, not speed |
| FN-11 | prices, "starting at" figures | — | **do not add** (D-12). "Free estimate" is allowed |
| FN-12 | service radius in miles | footer | only the `SERVICE_AREA` sentence ships (D-02) |
| FN-13 | real logo artwork | header, footer | placeholder until the Prompt 11 hand-back |

## Fictional-but-fixed — must be replaced before public

These are **not** `TODO(fact)`; they are ground truth for the build and are listed again in
`docs/PRE-LAUNCH.md` as must-replace-before-public.

| fact | value |
|---|---|
| business | Helixa Garage Door Repair |
| tagline | You see the worn part before you hear the price. |
| phone | (478) 555-0137 — reserved 555-01XX range, cannot ring anyone |
| address | 4402 Cindermill Way, Warner Robins, GA 31088 — **does not exist** |
| map coords | 32.6130,-83.6241 — real Warner Robins coordinates; the map is embedded by coordinates only (D-07) |
| hours | 7 days, 7:00 AM – 7:00 PM, single block |
| service area | Serving Warner Robins and the middle Georgia corridor. |


---

## Appended at Prompt 2+3+4 — where each one is now rendered

This file is appended to, never rewritten. Every string below lives in `content/copy.ts`,
which means the consuming component renders it **visibly** (D-17). None of them is a code
comment, and none of them is a guess.

| id | rendered string in `content/copy.ts` | section |
|---|---|---|
| FN-01 | `TODO(fact): licence number and issuing state board` | `site-footer` (all five routes) |
| FN-01, FN-02, FN-03, FN-08 | `TODO(fact): years in business, founding year, technician count and any licence or insurance status (FN-01, FN-02, FN-03, FN-08). None of it is invented here, and this page will not claim a credential we cannot evidence.` | `about-story` |
| FN-03 | `TODO(fact): years in business and founding year (FN-03)` | `home-services` |
| FN-04 | `TODO(fact): manufacturer or trade certifications (FN-04)` | `services-intro` |
| FN-06, FN-07 | `TODO(fact): review count and average rating (FN-06). Nothing is invented here and no review schema is emitted.` | `home-reviews`, alongside two literal `[TESTIMONIAL PLACEHOLDER]` blocks at review length |
| FN-13 | slot held at 175x88 (header) and 200x101 (footer); a Raleway 800 wordmark ships until the hand-back | `assets/INVENTORY.md`, Logo section |

**Badge slots are dimensioned, not filled.** `badge-cert-inline` (300x71, `home-why`) and
`badge-cert-panel` (300x124, `about-story` and `contact-main`) hold the exact geometry of
the reference's manufacturer-certification lockups and carry a visible `TODO(fact):` chip
rather than an invented credential (D-14).

**Still marked DO NOT ADD:** FN-10 (response time — the proposition is transparency, not
speed) and FN-11 (prices — D-12; "free estimate" is permitted and is the only commercial
phrase on the site).

**Nothing was added to this list at Prompt 2+3+4 that was not already known at Prompt 1.**
The copy pass produced no new unknown, because every place one would have arisen was written
as a `TODO(fact)` instead of a sentence.
