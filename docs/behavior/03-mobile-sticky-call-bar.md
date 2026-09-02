# 03 — Mobile sticky call bar

D-04. The reference has no counterpart; this is a pure addition, and on a phone-driven
business with no email anywhere (D-03) it is the primary conversion surface on the site.

## Mechanism

A `position: fixed; bottom: 0; left: 0; right: 0` bar containing exactly one
`<a href="tel:+14785550137">` and the hours line. Rendered **only below 768** via a CSS
media query — not by a JS width check, so it is correct on first paint and cannot flash.

Two things must be handled or the bar breaks the page:

- `padding-bottom: env(safe-area-inset-bottom)` so it clears the iOS home indicator.
- A matching `padding-block-end` on `<body>` at the same breakpoint, equal to the bar
  height, so the bar never covers the last line of the footer. Reserve the space; do not
  overlay it.

**Do NOT use:**

- A JS `matchMedia` render gate. It produces a server/client mismatch on the most important
  element on the site.
- Hide-on-scroll-down / show-on-scroll-up. It is fashionable and it is wrong here: the bar
  exists precisely so the number is reachable at any scroll position without thought, and
  hiding it makes the user hunt for the one thing they came for.
- An entrance animation on mount. It arrives at the same time as the page and animating it
  reads as an ad.
- `position: sticky`. A sticky element cannot pin to the viewport bottom independent of its
  container's scroll extent; this needs `fixed`.

## Ratio and why

**No transition on appearance at all — 0ms.** This is the deliberate choice, not an
omission. The bar is present from first paint at widths below 768 and it never moves. The
only transition it carries is the press state, **90ms `ease-out` on `background-color`**,
which is the shortest ratio anywhere in this system because it must feel like the surface
responded under the finger rather than like something animated afterwards.

Height: **56px** plus safe-area inset. That gives the tel link a 44px minimum touch target
(WCAG 2.5.8) with real padding around it, and it stays inside the reflow budget when added
to the 114px sticky header at 390.

## Failure mode

- **It covers the footer's last line.** Fixed positioning removes the bar from flow, so
  without the body padding the footer's final row is unreachable. This is the defect that
  ships most often, because it is invisible at 1440 where the bar does not render.
- **It covers the form's submit button** on `/contact` when the on-screen keyboard is up.
  The visual viewport shrinks; the fixed bar re-pins to the *new* bottom and sits on the
  submit control. Mitigation is the body padding plus `scroll-margin-bottom` on the submit
  button so focusing it scrolls it clear.
- **Two call CTAs both claim to be the primary.** The header CTA and this bar are both
  `tel:` links. `rendertruth.mjs` ranks CTA salience by **chroma dominance**, so if the bar
  is painted more saturated than the header CTA that is fine — but nothing else on the page
  may out-saturate either of them. Keep both on the same primary token.
- **It survives a route change with a stale hours string.** It does not — the copy is
  static — but the bar must not unmount and remount on navigation, or it flashes on every
  route change. Render it in the layout, not in the pages.
- **A `min-height` that is inert.** `a[href^="tel:"] { min-height: 44px; }` (A-14) does
  nothing on a purely inline box. The bar's tel link must be `display: flex` for the rule
  to bite. This exact defect recurred three times in a sibling's shell.

## Trigger

| trigger | behaviour |
|---|---|
| viewport width < 768 | bar is rendered and pinned; body reserves its height |
| viewport width >= 768 | bar is not rendered; body reserves nothing |
| tap / press on the link | 90ms background change, then the OS dialler takes over |
| **client-side route change** | no change whatsoever — the bar lives in the layout and does not remount |
| on-screen keyboard opens | bar re-pins to the visual viewport bottom; focused form controls scroll clear via `scroll-margin-bottom` |

## Accessibility

- A real `<a href="tel:...">`, not a button with an onClick. It must work with JS disabled
  and must offer "copy link" in the context menu.
- Accessible name is the full number, spoken as digits: `aria-label="Call 4 7 8, 5 5 5,
  0 1 3 7"` is **not** used — screen readers handle `tel:` link text acceptably and the
  spaced-digit trick breaks braille output. The visible text is the accessible name.
- Minimum target 44×44 CSS px, satisfied by the 56px bar height and the `display: flex` on
  the link.
- Contrast: the bar is a foreground/background pair *actually in use*, so it is in the
  Prompt 5 `pairsInUse` list and must clear WCAG AA at 4.5:1. It is also the element whose
  chroma must not be beaten by any other action on the page.
- Focus ring is visible against **both** the bar background and the page behind it (3:1 on
  each) — a ring tuned only to the page background disappears on the bar.
- The bar is the **last** element in DOM order so it does not interrupt the tab path
  through the page. It is reachable by keyboard at the end, and by the header CTA at the
  start; there is no keyboard trap either way.
- `prefers-reduced-motion: reduce` → the 90ms press transition drops to `0.01ms`. There is
  no other motion to disable.

## Acceptance criteria, asserted against the rendered DOM

1. At 390, `document.querySelector('[data-section="mobile-call-bar"]')` exists and
   `getComputedStyle(it).position === 'fixed'`.
2. At 1440 that element does not exist in the DOM (media-query removal, not
   `visibility: hidden`).
3. At 390, the bar's `getBoundingClientRect()` does not overlap the footer's last focusable
   element after scrolling to the document bottom.
4. The tel link's rendered box is at least 44×44 CSS px at 390, and its computed `display`
   is not `inline`.
5. No element on any route has a higher OKLCH chroma than the call CTA
   (`rendertruth.mjs` CTA-salience check, 0 findings).
