# 01 — Mobile nav drawer

## Mechanism

A `<button aria-expanded aria-controls="site-nav">` toggling a single boolean in the header
client component. The drawer is a `<nav id="site-nav">` that is **always in the DOM** and is
shown or hidden by a CSS class on the header root. Height animates via `grid-template-rows:
0fr -> 1fr` on a wrapper, which animates without a measured pixel height and without a
layout thrash on open.

**Do NOT use:**

- `display: none` / `hidden` toggling as the only mechanism — it cannot transition, and it
  removes the links from the a11y tree in a way that breaks the `aria-controls` relationship
  the toggle advertises.
- Bootstrap's `collapse` JS. The reference uses it (`button.navbar-toggler[data-bs-toggle=
  collapse]` → `#navbarText`) but we ship no Bootstrap and no jQuery.
- A portal or `position: fixed` full-screen overlay. The reference drawer is an in-flow
  push-down panel; a full-screen overlay changes the scroll behaviour of the whole page and
  is a different interaction pattern wearing the same icon.
- `max-height` with a guessed large value. It makes the easing wrong (the visible part of
  the transition finishes early) and the guess breaks when a nav item wraps.

## Ratio and why

**220ms, `cubic-bezier(0.2, 0, 0, 1)`.** The reference theme's own transitions are
`all .2s` (four of them) and `0.5s` (two); 220ms sits on that shorter family, which is the
one used for state toggles rather than for the hero fade. A drawer is a direct response to a
tap, so it must read as *caused by* the tap: below about 150ms it flashes and the user
cannot see where the panel came from, above about 300ms it feels like a page transition and
people tap the toggle a second time.

Closing uses the same duration. Asymmetric close (faster out) is a common trick and it is
wrong here — the drawer covers the CTA, so a fast close reads as a dismissal the user did
not ask for.

## Failure mode

- **The drawer is left open across a client-side route change.** Next.js App Router does not
  unmount the layout on navigation, so the boolean survives and the user lands on `/about`
  with the menu still covering it. Close on `usePathname()` change.
- **Body scroll leaks.** If the drawer ever becomes taller than the viewport, the page
  behind it scrolls under the finger. Because ours is an in-flow push-down panel, the page
  is *supposed* to scroll — so do **not** add a scroll lock. Locking scroll on an in-flow
  panel traps the user below the fold.
- **The toggle appears at 1440.** The reference collapses at `navbar-expand-lg` (992), so
  the toggler is live at **both 390 and 768** and gone at 1440. Getting that boundary wrong
  is invisible in a screenshot at 1440 and breaks two of the three measured breakpoints.
- **`aria-expanded` not updated**, leaving a screen reader announcing "collapsed" over an
  open menu. This is the single most common defect in this component and it is silent.

## Trigger

| trigger | behaviour |
|---|---|
| tap / click / `Enter` / `Space` on the toggle | toggles open state |
| `Escape` while open | closes, focus returns to the toggle |
| **client-side route change** (`usePathname()` changes) | closes immediately, no transition |
| viewport crosses 992px upward | state resets to closed so the desktop bar is never rendered from an "open" state |
| tap on any link inside the drawer | closes after navigation is initiated |

## Accessibility

- Toggle is a real `<button type="button">` with `aria-expanded` and `aria-controls`
  pointing at the drawer's `id`. Accessible name is "Menu"; the icon is
  `aria-hidden="true"`.
- The drawer is **not** a modal dialog: no `role="dialog"`, no focus trap, no
  `aria-modal`. It is an in-flow disclosure, and announcing it as a dialog would be a lie to
  the screen reader.
- Tab order is DOM order: toggle → drawer links → call CTA → page content. Nothing is
  removed from the tab order while visible.
- `Escape` closes and returns focus to the toggle.
- Every link and the toggle satisfy WCAG 2.5.8: minimum 44×44 CSS px at 390. Tel links get
  this from the site-wide `a[href^="tel:"] { min-height: 44px; }` rule (A-14); nav links get
  it from their own padding.
- `prefers-reduced-motion: reduce` → the grid-rows transition duration drops to `0.01ms`.
  The drawer still opens and closes; it simply does not animate. The reference theme ships
  no reduced-motion block of its own, so honouring D-19 is entirely on us.

## Acceptance criteria, asserted against the rendered DOM

1. At 390 and 768 the toggle exists and matches `header button[aria-controls]`; at 1440 it
   is not rendered.
2. `toggle.getAttribute('aria-expanded')` is `"false"` before the first click and `"true"`
   after it.
3. After a client-side navigation to `/about`, `aria-expanded` is `"false"`.
4. `Escape` while open moves `document.activeElement` back to the toggle.
5. With `prefers-reduced-motion: reduce` emulated, the computed `transition-duration` on the
   animating wrapper is `<= 0.01s`.
