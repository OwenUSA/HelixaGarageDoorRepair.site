# 05 — FAQ accordion

`services-faq`, `/services` only, in-page. NOVEL: the reference has no FAQ anywhere, so
there is no counterpart to clone and this is measured by token conformance.

## Mechanism

Native `<details><summary>` — one per question, six in total, all independent (no
single-open enforcement). The disclosure triangle is removed
(`summary::-webkit-details-marker { display: none }` plus `list-style: none`) and replaced
with a `lucide-react` chevron rotated by CSS on `[open]`.

Height animation uses `interpolate-size: allow-keywords` / `height: 0 -> auto` where the
browser supports it, and **degrades to an instant open** where it does not. The content is
never height-clamped by JS.

**Do NOT use:**

- A `useState` accordion built from `<div>`s with `role="button"`. It reimplements keyboard
  handling, `aria-expanded`, and in-page find, and gets at least one of them wrong.
- Single-open ("only one panel at a time") behaviour. It hides the answer the user just
  read the moment they open the next one, and on a technical FAQ people compare two answers.
- `max-height` transitions with a guessed ceiling. The answers here run 200–260 characters
  and wrap differently at every breakpoint; a guess is wrong at one of them and the easing
  is visibly wrong at all of them.
- A JS-measured `scrollHeight` animation. It forces a synchronous layout on every open and
  breaks when a web font finishes loading mid-transition.
- `hidden` / `display: none` on the answer. It removes the text from in-page find (Ctrl+F),
  which is how people actually use an FAQ.

## Ratio and why

**200ms `ease-out` on open, 160ms `ease-in` on close, chevron rotation 200ms.**

200ms open matches the card and drawer family (the reference theme's `.2s`), so every
deliberate disclosure on the site shares one timing. Close is slightly faster because a
closing panel is removing content the user has finished with — there is nothing to track
during the transition, and a slow close delays the next question arriving under the cursor.
`ease-in` on close, `ease-out` on open, so both ends move quickly where the user's attention
is not.

The chevron rotates **180 degrees** over the same 200ms so the marker and the panel finish
together. A marker that finishes first reads as a broken animation.

## Failure mode

- **The answer is unfindable by Ctrl+F.** If the panel is `display: none` when closed, the
  browser cannot find the text. `<details>` handles this correctly in modern browsers
  (auto-expanding on find); a hand-rolled accordion does not.
- **Layout shift when a panel opens near the bottom.** The page grows under the reader.
  Acceptable and expected — but if the sticky header (02) is not accounted for with
  `scroll-margin-top`, deep-linking to `#question-3` lands the summary under the header.
- **The chevron is the only affordance.** Removing the native marker and forgetting the
  replacement leaves six headings that look like plain text.
- **`summary` styled with `display: flex` in older Safari** collapses the disclosure
  behaviour entirely. Use `display: flex` on an inner wrapper, not on `summary` itself.
- **Reduced motion ignored.** `<details>` height animation is real motion. Under `reduce`
  it must be instant, not merely faster.
- **An `<h3>` wrapping the `<summary>` instead of the other way round.** The heading must
  be *inside* the summary (`<summary><h3>…</h3></summary>`) or the accessible heading
  structure and the button semantics fight each other.

## Trigger

| trigger | behaviour |
|---|---|
| click / `Enter` / `Space` on the summary | toggles that panel only; others are untouched |
| in-page find matching hidden answer text | browser auto-expands the panel (native behaviour, do not defeat it) |
| deep link to `#faq-<n>` on load | that panel is open on first paint; `scroll-margin-top` clears the sticky header |
| **client-side route change** away and back | all panels return to closed — state is DOM-local and the section unmounts. This is intended; a remembered open set is a surprise, not a convenience |
| `prefers-reduced-motion: reduce` | opens and closes instantly, chevron rotation instant |

## Accessibility

- `<summary>` is natively a button with `aria-expanded` managed by the browser. Do not add
  `role="button"` or a manual `aria-expanded` — both make it worse.
- Question text is an `<h3>` inside the summary, so the six questions appear in the heading
  outline and a screen reader user can jump between them.
- Focus ring on `summary` holds 3:1 against the panel background and the page background.
- Full keyboard path: Tab reaches each summary in DOM order; `Enter` or `Space` toggles;
  Tab from an open summary moves into the answer's links (there are none today) and then to
  the next summary.
- Answers are plain prose with no interactive content, so there is no focus-management
  problem on close — nothing focusable is ever hidden mid-focus. If a link is ever added
  inside an answer, closing the panel while focus is inside it must move focus back to the
  summary.
- The FAQ contains no response-time, pricing, warranty or credential claims (CONSTANTS),
  so nothing in it needs a `TODO(fact)` chip.

## Acceptance criteria, asserted against the rendered DOM

1. `document.querySelectorAll('[data-section="services-faq"] details').length === 6`.
2. Every `details` contains exactly one `summary`, and every `summary` contains exactly one
   `h3`.
3. Opening panel 2 leaves panel 1's `open` property unchanged (independent panels).
4. No element inside the section has `role="button"` or a hand-written `aria-expanded`.
5. Under `prefers-reduced-motion: reduce`, the computed `transition-duration` on the panel
   wrapper and on the chevron is `<= 0.01s`.
6. `getComputedStyle(summary).display !== 'flex'`.
