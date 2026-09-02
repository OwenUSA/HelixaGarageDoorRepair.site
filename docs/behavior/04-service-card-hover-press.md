# 04 — Service card hover and press

Applies to the six symptom cards in `home-services` and the six symptom blocks in
`services-grid`.

## Mechanism

The whole card is a `<a>` (or an `<article>` containing exactly one link, with the link's
`::after` stretched over the card by `position: absolute; inset: 0`). State is expressed in
CSS only: `:hover`, `:focus-visible`, `:active`, and `@media (hover: hover)` around
everything that is hover-only.

Transitioned properties: `box-shadow`, `border-color`, and `transform: translateY(-2px)`.
That is the whole list.

**Do NOT use:**

- A JS `onMouseEnter` state hook. Six cards × two grids × a state write per pointer move is
  work a `:hover` rule does for free, and it strands the state when the pointer leaves
  during a scroll.
- `onClick` on a `<div>` with `role="link"`. It breaks middle-click, "open in new tab",
  and the browser's own status bar preview.
- Animating `width`, `height`, `padding`, `margin` or `font-size`. Those are the fields
  `diff.mjs` scores as BLOCKING (A-12), so a hover that changes them changes what the
  comparator measures depending on where the mouse happens to be.
- Hover effects without a `@media (hover: hover)` guard. On touch, `:hover` sticks after a
  tap and the card stays lifted until you tap elsewhere.
- `transition: all`. The reference theme uses `all .2s` four times; we do not copy that,
  because `all` sweeps up any property that later becomes animatable and makes the
  transition list unauditable.

## Ratio and why

**Hover in: 200ms `ease-out`. Hover out: 200ms `ease-out`. Press: 90ms `ease-out`.**

200ms matches the reference theme's own `.2s` family, which is the ratio the whole
reference design system is built on — cloning the *timing* is part of cloning the design
system even when the pixels are ours. Hover is ambient feedback: fast enough to feel
attached to the pointer, slow enough not to strobe when the pointer crosses three cards on
the way somewhere else.

Press is 90ms because it must land inside the same finger-down that caused it. The lift is
**2px** — enough to read as elevation next to the shadow change, small enough that it never
looks like the grid is reflowing.

## Failure mode

- **Sticky hover on touch.** Without `@media (hover: hover)` the card stays in its hover
  state after a tap. On a phone the entire six-card grid ends up with one permanently lifted
  card.
- **Nested interactive elements.** If a card contains both a stretched link and a separate
  "Call" link, the stretched `::after` sits on top and swallows the call link. Either the
  inner link gets `position: relative; z-index: 1`, or the card is not a link at all. On
  this site the call CTA must never be the element that gets swallowed.
- **Focus ring clipped by `overflow: hidden`** on the card, which is usually there to clip a
  photo corner radius. The ring then renders half-visible. Fix with `outline-offset` inside
  the card, or clip the image rather than the card.
- **Hover state that is the only signal.** Keyboard users get nothing unless
  `:focus-visible` carries the same treatment. It must, and the focus ring is additional to
  it, not instead of it.
- **`translateY` creating a containing block.** A `transform` on the card makes it the
  containing block for any `position: fixed` descendant. Harmless here, but it is also what
  silently kills `position: sticky` on any ancestor chain (see spec 02).

## Trigger

| trigger | behaviour |
|---|---|
| pointer enters, on a device where `(hover: hover)` | 200ms lift + shadow + border-colour |
| pointer leaves | 200ms return |
| `:active` / pointer down | 90ms settle back to `translateY(0)` |
| keyboard focus (`:focus-visible`) | same visual treatment as hover, **plus** the focus ring |
| touch tap | no hover state at any point; press state only |
| **client-side route change** | all state is CSS-derived, so nothing persists; no cleanup needed |

## Accessibility

- The accessible name of each card is its symptom heading, which is a full sentence and
  reads correctly out of context in a links list — that is the reason the cards are headed
  by symptoms rather than by part names.
- `:focus-visible`, not `:focus`, so a mouse click does not paint a ring. The ring holds
  3:1 against both the card surface and the page background (D-19, and the Prompt 5
  focus-ring constraint, which is exempt from hue rotation).
- Cards are a `<ul>` of `<li>` so a screen reader announces "list, six items". A bare stack
  of `<div>`s gives no count and no position.
- The lift is `transform`, which is exempt from `prefers-reduced-motion` only if it is
  small; ours is not exempt by fiat. Under `reduce`, the `translateY` is dropped entirely
  and only the shadow and border change, at `0.01ms`.
- Target size: the whole card is the target, so 2.5.8 is satisfied with margin at every
  breakpoint. Do not shrink the hit area to the heading text.

## Acceptance criteria, asserted against the rendered DOM

1. Every card's interactive element is an `<a>` with a real `href`; zero elements with
   `role="link"` and no `href` exist on any route.
2. The hover rules are inside a `@media (hover: hover)` block — asserted by checking that
   at a touch-emulated context the card's computed `transform` is unchanged after a
   synthetic tap.
3. `:focus-visible` on a card produces a visible outline whose computed colour clears 3:1
   against both the card background and the page background.
4. Under `prefers-reduced-motion: reduce`, the card's computed `transition-duration` is
   `<= 0.01s` and its `transform` on hover is `none`.
5. No transitioned property on any card is in the BLOCKING comparator set (width, height,
   padding, margin, font-size, letter-spacing, line-height).
