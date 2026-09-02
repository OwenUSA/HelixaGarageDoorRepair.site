
---

## TAKE — the only things actually acquired

No reference *file* is taken. What is taken is open-licensed and fetched from its own
upstream, never from the reference's CDN.

| item | source | licence | verified in one step | used for |
|---|---|---|---|---|
| **Raleway** (700, 800) | `next/font/google` | SIL OFL 1.1 | Google Fonts licence page states OFL | headings — the reference's own heading face, so heading metrics **converge**; not a floor |
| **Source Sans 3** (400, 600, 700) | `next/font/google` | SIL OFL 1.1 | Google Fonts licence page states OFL | body copy — substitute for the reference's commercial `ff-tisa-sans-web-pro` per D-11. **Permanent floor F-02** |
| **lucide-react** | npm, allowlisted | ISC | package `license` field | every icon on the site |

**Not taken, and why each looked like it should be:**

- `FontAwesome` kit `080b110fc3` — the reference's icon font, delivered by an Adobe Fonts
  loader. Replaced wholesale by `lucide-react`. No icon font ships.
- `Nunito` — has two real `@font-face` rules, which makes it look like a legitimate
  substitution floor. It paints exactly four elements, all inside the GDPR cookie bar we do
  not ship (D-15). Booking it would permanently excuse text that should converge.
- `gform-icons-theme` — one real `@font-face` rule, never loads, zero usages. Phantom.
- `ff-tisa-sans-web-pro` and `raleway` have **no `@font-face` rule anywhere in the reference
  CSS** and yet paint the whole page — injected at runtime by the kit script.
  `document.fonts.check()` returns `true` for families that do not exist, so it settles
  nothing; canvas advance-width measurement against a known-bogus family settled it. Full
  working in `docs/profile.md`.

## Logo

There is no logo file and none is invented.

| | |
|---|---|
| header slot | `logo-header`, 175×88 at all three breakpoints, `object-fit: contain` |
| footer slot | `logo-footer`, 200×101 at all three breakpoints, reversed |
| what ships now | a **wordmark set in the display font** (Raleway 800) reading *Helixa Garage Door Repair*, plus a placeholder SVG at slot geometry |
| what is missing | `TODO(fact): logo asset` — FN-13 in `docs/facts-needed.md` |
| prompt | written in `docs/asset-prompts.md` at Prompt 11 (OVERRIDE 2): wordmark + icon lockup, display font and applied palette hues named explicitly |

## Badges — dimensioned, never invented

`badge-cert-inline` (300×71, `home-why`) and `badge-cert-panel` (300×124, `about-story` and
`contact-main`) are manufacturer-certification lockups on the reference. We hold the slot at
its exact dimensions and fill it with a visible `TODO(fact):` chip — **FN-04** — per D-14.
No certification, licence number, bond, insurance status, BBB rating, founding year or team
size is invented anywhere on this site.

## Video

None. The reference ships no `<video>`, no `<source type="video/*">` and no poster image on
any of its four pages.

## Status

Every REPLACE slot is at **placeholder** until the terminal hand-back (OVERRIDE 3). That is
floor **F-05** in `docs/known-divergence.md`, not a defect, and no iteration is spent on it.
