# docs/profile.md — reference profile

**Reference:** `https://www.crosbyroofing.com/` — Crosby Roofing & Seamless Gutters,
Macon / Augusta / Columbus GA and Columbia SC.
**Profiled from the SAVED COPY only** (A-15), never the live site.

Identity was verified, not assumed. The saved `<title>` is an SEO string
(*"Best Roofing Company in Macon GA, Augusta GA, Columbus, GA, and Columbia SC"*) that does
not contain the words "Crosby Roofing", so the check that matters is `og:site_name`, which
reads **"Crosby Roofing and Seamless Gutters"** on all four pages, plus a `crosbyroofing.com`
canonical on each.

| | |
|---|---|
| stack | WordPress, bespoke theme — `Seoteric-Framework` (parent) + `CrosbyRoofing` (child), on **Bootstrap 5.1** |
| page builder | **none.** Zero Divi / Elementor / Fusion / WPBakery / Bricks / Oxygen / Gutenberg-block markers in the saved HTML |
| plugins visible in layout | Gravity Forms 2.10.5, GDPR Cookie Compliance 5.0.16, Responsive Lightbox 2.7.8, Font Awesome kit `080b110fc3` |
| carousel / slider | Bootstrap carousel (`div#heroSlides[data-bs-ride=carousel]`, **one** `.carousel-item`) and Splide 3.1.9 (`#testimonialsSlider`) |
| rendering | fully static server-rendered HTML. No client-side content fetch. Gravity Forms submits over AJAX; reCAPTCHA v2 loads on form pages |
| trackers | GTM, `gtag` UA-91779702-1, GA4 G-MYXZ35N5KG, Google Ads AW-17102913715, GDPR cookie bar. **We ship none of it** (D-15) |
| auth / geo | none. No login, no geo gate, no A/B split, no personalisation |

---

## Serving the saved copy — and the one thing that had to be fixed first

```bash
node ../_shared/harness/src/serve-reference.mjs   # pages,  127.0.0.1:3209
node scripts/serve-ref-assets.mjs                 # assets, 127.0.0.1:3309
```

**Both are required.** The saved HTML on its own renders in **Times New Roman with no
Bootstrap grid**: headless Chromium answers every cross-origin request to the reference's
CDN with `ERR_BLOCKED_BY_ORB` (while `curl` gets a clean `200 text/css`, `ACAO: *`), and the
protocol-relative `//cdn.jsdelivr.net` links resolve to `http://` from a local `http` origin
and fail as well. Nothing in the capture *looks* wrong — the pages load, the sections
segment, the numbers are plausible — and every one of them is fiction.

So `scripts/mirror-reference.mjs` was run **once**, while the reference was still reachable:
it downloads every asset the four saved pages reference (**180 files, 16 MB**) into
`reference/assets/`, rewrites `url()` inside the mirrored CSS to point at the local asset
server, and rewrites `reference/raw/*.html` to load from `127.0.0.1:3309`. Pristine,
untouched originals are preserved at `reference/pristine/`. After this the reference is
fully offline-reproducible and the live site is never contacted again.

Three defects were hit inside that mirror and are worth carrying forward, because each one
failed **silently with a 200**:

1. **Subresource Integrity must be stripped.** Rewriting `url()` inside the mirrored
   stylesheets changes their bytes, so the `sha384` in the saved `<link>` no longer matches
   and Chromium drops the sheet — no console error, no failed request, just Times New Roman.
2. **The querystring suffix breaks the MIME type.** Mirrored files are named
   `style.css__q3f76…` to keep `?ver=` variants apart, so `path.extname()` returns
   `.css__q3f76…`, the asset server served `application/octet-stream`, and Chromium refused
   the stylesheet under strict MIME checking — again with a `200` and zero failed requests.
   `serve-ref-assets.mjs` strips the `__q…` suffix before the MIME lookup.
3. **A bare host URL becomes a file.** `//cdn.jsdelivr.net` from a `dns-prefetch` has
   pathname `/` and was written as a *file* named `cdn.jsdelivr.net`, after which every real
   asset under that host failed to `mkdir` with `ENOTDIR`. Skipped now.

**Port note.** The asset server sits on **3309** (`devPort + 200`), not the obvious 3210 —
3210 was already held by a **sibling site's** reference server, which answered `200` with a
completely different company's markup. That is the same class of failure
`serve-reference.mjs` hard-fails on, and it is why it hard-fails.

**One live dependency remains, and it is bounded.** The Font Awesome kit script
`use.fontawesome.com/080b110fc3.js` is an Adobe-Fonts (Typekit) loader that injects the
`raleway` and `ff-tisa-sans-web-pro` faces at runtime; those font payloads are fetched from
`use.typekit.net` and cannot be pre-mirrored because their URLs are constructed in JS. If
that host ever goes away the reference falls back to a generic sans and its **text metrics**
shift. Layout, grid, spacing and colour are unaffected, and the body face is a permanent
floor anyway (below), so the exposure is limited to heading metrics.

---

## Page geometry — height and section count at 390 / 768 / 1440

Section counts are the harness's own segmentation (`sectionCandidates` +
`chromeSelectors`), including header and footer.

| ref page | our route | 390 h | 768 h | 1440 h | sections | 390÷1440 |
|---|---|---|---|---|---|---|
| `/` | `/` | 12717 | 9574 | 7836 | 8 / 8 / 8 | 1.62× |
| `/about/` | `/about` | 5936 | 4687 | 4223 | 6 / 6 / 6 | 1.41× |
| `/residential-roofing/` | `/services` | 5864 | 3960 | 2895 | 7 / 7 / 7 | 2.03× |
| `/contact-us/` | `/contact` | 3010 | 1485 | 1376 | 5 / 5 / 5 | 2.19× |

Header is 114px at 390/768 and 117px at 1440. Footer is **909 / 399 / 250** — it restacks
twice and is the single most breakpoint-sensitive band on the site.

**Section IDs are byte-identical at all three widths on all four pages.** That was checked,
not assumed: the overlay trap (an absolutely-positioned band sorting to a different ordinal
at a narrow width and shifting every id after it) is live on this reference in the form of
`<aside#moove_gdpr_cookie_info_bar>`, the GDPR plugin's `position: fixed` cookie bar. It is
excluded by segmenting on `body > div, body > section` — an `<aside>` matches neither.

## Breakpoints in the reference CSS

| source | breakpoints |
|---|---|
| Bootstrap 5.1 | 576, 768, 992, 1200, 1400 (`min-` and `max-…98` forms of each) |
| `Seoteric-Framework` + `CrosbyRoofing` | 500, 599, 767, 991, 1400 (all `max-width`) |
| other | `prefers-reduced-motion: reduce` / `no-preference`, `print` |

`BP_SET` stays **390 / 768 / 1440**, exactly three, per CONSTANTS. **Skipped, deliberately:**
500, 576, 599, 767, 992, 1200, 1400.

768 is the load-bearing one and stays for the reason A-9 gives: it sits above the
`max-width: 767.98px` phone band and below `navbar-expand-lg` (992), so it is the only
measured width where the Bootstrap grid is in its desktop form *while the nav is still
collapsed to a toggler*. It is also where `/contact` finishes restacking — that page is
2.19× taller at 390 than at 1440, and 1485 of its 1512px of shrinkage has already happened
by 768.

## Motion — `framer-motion` is NOT justified

Checked in a live browser against the served copy, not by grepping for library names:

| probe | result |
|---|---|
| `window.gsap`, `ScrollTrigger`, `Lenis`, `LocomotiveScroll`, `AOS`, `WOW`, `Swiper` | all `undefined` on all four pages |
| `[data-aos]` elements | 0 |
| elements with `will-change: transform\|opacity` | **0** |
| elements with a running `animation-name` | **0** |
| CSS `transition` declarations in the theme | 6 total — `all .2s` ×4, `0.5s` ×2 |
| what *is* loaded | Bootstrap 5.1 bundle (collapse, 4 dropdowns, 1 carousel), Splide 3.1.9 (`#testimonialsSlider`), jQuery 3.7.1 |

**There is no scroll-linked motion anywhere on this reference — no parallax, no scroll
trigger, no reveal-on-scroll, no smooth-scroll hijack.** What motion exists is
time-driven and component-local: a Bootstrap carousel that contains exactly **one** slide
(so it never actually advances), a Splide testimonial slider, and hover/collapse
transitions of 200–500ms.

**Conclusion: `framer-motion` is not justified and must not be installed.** CSS transitions
of 200–500ms plus `prefers-reduced-motion` cover the entire motion surface. Note the theme
itself ships **no** `prefers-reduced-motion` block — only Bootstrap does — so honouring
D-19 is on us.

## Fonts — one real floor, and no phantoms

`@font-face` rules were enumerated **and** `document.fonts` was read after `ready`, because
a face with rules and no loaded file must never be booked as a substitution floor.

| family | @font-face rules | loaded? | used on | verdict |
|---|---|---|---|---|
| `ff-tisa-sans-web-pro` | 0 in CSS — injected by the Typekit kit at runtime | **yes**, 400 + 700 | body copy: 170 / 82 / 90 / 66 elements per page | **FF Tisa Sans Pro is commercial** (FontFont/Monotype, via Adobe Fonts). Substitute per D-11 → **permanent floor** |
| `raleway` | 0 in CSS — same kit | **yes**, 700 + 800 (400 never loads) | headings: 52 / 14 / 15 / 7 elements | Raleway is **open (SIL OFL)**. Load it directly via `next/font/google` → **no floor** |
| `Nunito` | 2, from the GDPR cookie plugin | loaded on some pages, used by **4** elements — all inside the cookie bar | we ship no cookie bar (D-15) → **not a floor, do not substitute** |
| `gform-icons-theme` | 1, from Gravity Forms | **never loads**, 0 usages | phantom. No form of ours uses it → **not a floor** |
| `FontAwesome` | via kit | loaded | icons | icon font; replaced by `lucide-react` |

The trap that caught two sibling sites is live here in both directions: `Nunito` and
`gform-icons-theme` have real `@font-face` rules and would look like legitimate floors,
while `raleway` and `ff-tisa-sans-web-pro` have **no `@font-face` rule anywhere in the CSS**
and would look like phantoms — and they are the two faces that actually paint the page.
Neither `document.fonts.check()` nor a CSS grep settles it alone: `document.fonts.check()`
returns `true` for a family that does not exist at all. What settles it is canvas text
measurement against a known-bogus family:

```
40px "Handgloves WM"    bogus-family 274   ff-tisa-sans-web-pro 290   sans-serif 293
```

**One substitution floor, and only one: `ff-tisa-sans-web-pro`.** Proposed open equivalent
is **Source Sans 3** — a humanist sans of the same genre and near-identical x-height ratio.
The resulting text-metric delta is permanent and is never iterated against (D-11).

## Type scale, as measured

| | `/` | subpages |
|---|---|---|
| `h1` | raleway 56px / 700 | raleway 40px / 800 |
| body | `ff-tisa-sans-web-pro` 400 | same |

## State inventory

| state | where | notes |
|---|---|---|
| nav collapse | `button.navbar-toggler[data-bs-toggle=collapse]` → `#navbarText` | `navbar-expand-lg`, so the toggler is live below 992 — at **both** 390 and 768 |
| nav dropdowns | 4 `.dropdown-menu`, incl. a Locations dropdown | Locations is DELETED (D-02) |
| hero carousel | `#heroSlides[data-bs-ride=carousel]`, prev/next controls | **one** slide; controls are inert |
| testimonial slider | Splide `#testimonialsSlider`, home only | |
| cookie bar | `aside#moove_gdpr_cookie_info_bar`, `position: fixed`, dismissible | we ship none (D-15) |
| lightbox | Responsive Lightbox on gallery images | |
| forms | Gravity Forms — 1 on `/`, `/residential-roofing/`, `/contact-us/` | **each contains `input[type=email]`** → all removed per D-03; ours is the D-05 callback form |

## What must be scrubbed from the clone

| | reference count (`/`, `/about`, `/services`, `/contact`) | rule |
|---|---|---|
| `/locations/` links | 8, 11, 6, 5 | D-02 — bands, nav item, footer column, sitemap, anchors, `areaServed` |
| `input[type=email]` | 1, 0, 1, 1 | D-03 — no email in any form |
| `mailto:` | 0, 0, 0, 0 | already clean on the reference |
| trackers | GTM + GA4 + Ads + reCAPTCHA + GDPR bar | D-15 — none |

## Images

25 / 5 / 11 / 6 images per page, **all resolved** once lazy attributes are forced into `src`
before measuring — the lazy-placeholder trap does not bite here because the theme uses plain
`srcset` with no `data-src` shim, but the forcing pass is kept in the capture regardless
since it costs nothing and the failure is silent.

## Files this profile produced

```
reference/pristine/*.html     untouched originals, never modified
reference/raw/*.html          same pages, asset URLs rewritten to 127.0.0.1:3309
reference/assets/**           180 mirrored files, 16 MB
scripts/mirror-reference.mjs  run once; do not re-run against the live site
scripts/serve-ref-assets.mjs  static server for the mirror, port 3309
```

All three `reference/` subdirectories are gitignored — it is someone else's markup — and
**must not be deleted**. They are the only thing standing between this site and the
permanent `BLOCKED/no-reference` state two of its siblings are stuck in.
