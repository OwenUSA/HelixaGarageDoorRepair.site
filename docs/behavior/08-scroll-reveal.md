# 08 — Scroll reveal, and the no-motion baseline

## The finding this spec exists to record

The reference was probed in a live browser against the served local copy — not by grepping
for library names — at all four pages:

| probe | result |
|---|---|
| `window.gsap`, `ScrollTrigger`, `Lenis`, `LocomotiveScroll`, `AOS`, `WOW`, `Swiper` | all `undefined`, every page |
| `[data-aos]` elements | 0 |
| elements with `will-change: transform` or `opacity` | **0** |
| elements with a running `animation-name` | **0** |
| CSS `transition` declarations in the theme | **6 total** — `all .2s` ×4, `0.5s` ×2 |
| what is actually loaded | Bootstrap 5.1 bundle, Splide 3.1.9, jQuery 3.7.1 |
| the hero "carousel" | `div#heroSlides[data-bs-ride="carousel"]` containing **one** `.carousel-item` — it never advances, and its prev/next controls are inert |

**There is no scroll-linked motion anywhere on this reference.** No parallax, no scroll
trigger, no reveal-on-scroll, no smooth-scroll hijack, no pinned section, no scrubbed
timeline. What motion exists is time-driven and component-local: a one-slide carousel, a
testimonial slider, and hover/collapse transitions of 200–500ms.

## `framer-motion` is NOT justified

The dependency allowlist admits `framer-motion` **only if Prompt 1's profile finds real
choreography, and the profile must say so explicitly.** It says the opposite. Six CSS
transitions and zero running animations is not choreography; it is a stylesheet.

`framer-motion` must not be installed. Nothing in this build may import it. Every ratio in
specs 01–07 is expressible in one CSS `transition` declaration, which is what the reference
does and what we do.

Also still banned, for the reasons in the allowlist: **Lenis** and **Locomotive**. Scroll
hijacking breaks keyboard paging and mobile momentum, and on a site whose entire purpose is
getting a person to a phone number, the scroll must never be the thing that feels wrong.

## Mechanism — what we actually ship

**Nothing.** There is no scroll-reveal component on this site.

Sections are painted at full opacity from first paint. No `opacity: 0` initial state, no
`translateY(20px)` entrance, no `IntersectionObserver` adding an `is-visible` class.

This is a decision, not an omission, and it is recorded here so that a later builder does
not read the empty `components/` slot as an unfinished task. The clone target has no reveal
animation; adding one would be inventing design the reference does not have, in the one
category where invention is most tempting and least visible in a diff.

**Do NOT use, specifically:**

- `IntersectionObserver` + `opacity` transitions "because every site has them". They cost a
  guaranteed flash of invisible content on slow connections and on any browser where the
  observer callback is delayed.
- CSS `animation-timeline: view()`. Genuinely nice, genuinely unsupported widely enough, and
  genuinely not present in the reference.
- `content-visibility: auto` as a performance measure on the banded sections. It changes
  when layout happens, which changes what a screenshot at a given scroll position contains,
  which makes the capture non-deterministic. The harness measures those boxes.
- Any library from the banned list, in any wrapper.

## Ratio and why

**0ms. There is no reveal to time.**

The only defensible ratio for a reveal that the reference does not have is the one that
makes it indistinguishable from no reveal at all. The system's real ratios live in the other
seven specs and form one family:

| ratio | where | why |
|---|---|---|
| 0ms | focus rings (06), map (07), call bar appearance (03) | anything the user must reach immediately |
| 90ms | press states (03, 04) | inside the same finger-down |
| 120ms | form error text (06) | fast, but not accusatory |
| 160ms | accordion close (05) | content being discarded |
| 180ms | header shadow (02) | uninvited change, must not draw attention |
| 200ms | drawer, cards, accordion open, success panel (01, 04, 05, 06) | the reference theme's own `.2s` family — deliberate disclosure |
| 220ms | nav drawer (01) | largest moving surface on a phone |

Nothing on this site is slower than 220ms. The reference's two `0.5s` transitions belong to
the Splide slider and the carousel, neither of which we ship.

## Failure mode

- **A builder adds a reveal anyway**, because a hero that fades in "feels finished". It puts
  a hard-to-diagnose flash of blank content in front of the phone number, and it is invisible
  in a static screenshot diff — the harness screenshots after `settle()`, by which time the
  reveal has completed and the number reads normal.
- **`will-change` sprayed on section wrappers** as a performance habit. The reference has
  zero. Each one promotes a layer and on a long home page (12,717px at 390) that is real
  memory on a phone.
- **Reduced motion treated as "not applicable"** because there is no motion. Specs 01–07 all
  have motion and all need the media query. The reference theme itself ships **no**
  `prefers-reduced-motion` block at all — only Bootstrap does — so honouring D-19 across the
  site is entirely on us and cannot be inherited.
- **Scroll-behaviour smoothing added globally** (`html { scroll-behavior: smooth }`) for the
  FAQ and map anchors. It must be inside
  `@media (prefers-reduced-motion: no-preference)`, or it is vestibular motion the user
  explicitly asked not to have.

## Trigger

| trigger | behaviour |
|---|---|
| any scroll, any direction, any speed | nothing. No class is added, no observer fires, no style is written |
| **client-side route change** | nothing to reset, because nothing holds reveal state |
| `prefers-reduced-motion: reduce` | nothing to disable here; the media query's work is done in specs 01–07 |
| in-page anchor navigation | smooth scroll **only** under `prefers-reduced-motion: no-preference`; instant otherwise |

## Accessibility

- Zero scroll-linked motion is the accessible baseline, not a compromise of one. Nothing on
  this site can trigger a vestibular response from scrolling.
- No content is hidden pending an observer, so everything is present for a screen reader,
  for in-page find, and with JS disabled.
- `prefers-reduced-motion: reduce` is honoured in every other spec; this one has nothing to
  honour it with, which is the intended end state.

## Acceptance criteria, asserted against the rendered DOM and the repo

1. `framer-motion`, `gsap`, `lenis`, `locomotive-scroll`, `aos` and `wow.js` appear in
   neither `package.json` nor any lockfile entry, and are imported nowhere.
2. On every route, at every breakpoint, after load and before any scrolling:
   `document.querySelectorAll('*')` contains **zero** elements with computed `opacity: 0`
   that later become visible on scroll.
3. `document.getAnimations().length === 0` on every route after `settle()`.
4. Zero elements have a computed `will-change` other than `auto`.
5. Every `transition-duration` declared anywhere in `app/globals.css` and the components is
   in the ratio table above, and every one of them is reduced to `<= 0.01s` under
   `prefers-reduced-motion: reduce`.
6. `html { scroll-behavior: smooth }`, if present at all, appears only inside a
   `@media (prefers-reduced-motion: no-preference)` block.
