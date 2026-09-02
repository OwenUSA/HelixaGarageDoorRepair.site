# 02 — Sticky header transition

## Mechanism

`position: sticky; top: 0` on the `<header>`, plus a `data-scrolled` attribute set by a
**passive** `scroll` listener that is throttled through `requestAnimationFrame` and only
writes when the boolean actually flips. The attribute drives a CSS transition on
`box-shadow` and `background-color` only.

**Do NOT use:**

- `position: fixed` with a spacer `<div>`. It duplicates the header height in two places
  and the spacer drifts the moment the header restacks — and this header is 114px at
  390/768 and 117px at 1440, so it *does* change.
- An `IntersectionObserver` on a zero-height sentinel *as the only mechanism*. It is the
  cheaper trigger and is fine, but it fires once per crossing and gives no state on mount —
  a page restored mid-scroll renders in the wrong state until the user moves.
- A `scroll` handler that writes `style.*` on every event. That is a layout write per frame
  on a phone.
- Animating `height`, `padding` or `font-size` to "shrink" the header. The reference does
  not shrink its header, and shrinking it would move the measured type scale and the
  section box geometry that `diff.mjs` scores — a purely decorative change that would break
  the structural gate on `site-header` at all three breakpoints.

## Ratio and why

**180ms, `ease-out`, on `box-shadow` and `background-color` only.** Shorter than the drawer
(01) because this is not a response to a deliberate action — nobody scrolls in order to
change the header. A transition the user did not request should be under about 200ms or it
draws attention to itself. `ease-out` because the change should arrive quickly and settle,
not accelerate into place.

Threshold: **8px of scroll**. Small enough that the shadow appears as soon as content is
genuinely underneath the header; large enough that a one-pixel rubber-band on iOS does not
flicker it. Both properties are compositor-cheap and neither triggers layout.

## Failure mode

- **Flicker at the threshold.** Writing the attribute on every scroll event, or using a
  threshold of 0, makes the shadow strobe as the page settles. Fix: only write when the
  computed boolean differs from the current attribute value.
- **Stale state after a client-side route change.** The header does not unmount on
  navigation. Next.js restores scroll to the top on a new route, but the `scroll` event may
  not fire, leaving `data-scrolled="true"` on a page scrolled to 0. Re-evaluate on
  `usePathname()` change, not only on `scroll`.
- **Sticky killed by an ancestor.** `position: sticky` silently does nothing if any
  ancestor has `overflow: hidden`, `overflow: clip` or a `transform`. This is the failure
  that looks like "the code did not run" and it is a CSS problem two levels up.
- **The header covers an anchor target.** In-page anchors (the FAQ, the map bypass) land
  under a sticky header. Fix once, globally: `scroll-margin-top` on every anchor target,
  equal to the header height.
- **Layout shift on first paint** if the shadow is part of the box model. It is not — a
  `box-shadow` does not participate in layout. Do not swap it for a `border-bottom`, which
  does.

## Trigger

| trigger | behaviour |
|---|---|
| `scroll` past 8px | `data-scrolled="true"` |
| `scroll` back within 8px | `data-scrolled="false"` |
| **client-side route change** | state recomputed from `window.scrollY` on the next frame |
| mount / hydration | state computed once from `window.scrollY`, so a restored scroll position renders correctly |
| resize | no recomputation needed — the threshold is not width-dependent |

## Accessibility

- The header keeps its `<header>` landmark and its DOM position; sticky positioning does
  not alter the reading order or the tab order.
- A "Skip to content" link is the first focusable element in the document and is visible on
  focus. With a sticky header it must render **below** the header when focused, or it hides
  under it.
- Focusing an element inside a sticky header must not scroll the page. Since the header is
  at `top: 0`, this comes free.
- Sticky headers eat vertical space at 400% zoom (WCAG 1.4.10 reflow). At 390 the header is
  114px tall, which is under the practical limit, but the mobile call bar (03) also
  occupies fixed space — the two together must not exceed roughly a quarter of the
  viewport height at 390.
- `prefers-reduced-motion: reduce` → transition duration `0.01ms`. The shadow still appears;
  it simply appears immediately. Position stickiness itself is not motion and is not
  disabled.

## Acceptance criteria, asserted against the rendered DOM

1. `getComputedStyle(header).position === 'sticky'` at all three breakpoints.
2. No ancestor of `header` has `overflow` of `hidden`/`clip` or a non-`none` `transform`.
3. After `window.scrollTo(0, 200)`, `header.dataset.scrolled === 'true'`; after
   `window.scrollTo(0, 0)`, it is `'false'`.
4. The first focusable element in the document is the skip link, and when focused its
   bounding box does not intersect the header's bounding box.
5. Under `prefers-reduced-motion: reduce`, `getComputedStyle(header).transitionDuration`
   is `<= 0.01s`.
