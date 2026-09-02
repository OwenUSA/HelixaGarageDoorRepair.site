# 07 — Map lazy mount, and the bypass link

**The reference embeds no map on any of its four pages.** This component is a pure addition
required by D-08, which means there is nothing to clone and nothing to compare against — and
it is therefore the component most likely to be built from habit rather than from a spec.

Three sites in this programme shipped the map as a **keyboard trap**, in every case because
this spec existed and the bypass link was never built. That is why criterion 1 below is
written structurally rather than as prose: *the bypass anchor must be the map section's
literal `firstElementChild`*, which is a thing a test can assert and an implementer cannot
quietly skip.

## Mechanism

```
<section data-section="home-map">
  <a class="map-bypass" href="#after-home-map">Skip the map</a>   <-- FIRST ELEMENT CHILD
  ...heading, address, get-directions link...
  <div class="map-frame">   fixed aspect-ratio wrapper
    <iframe loading="lazy" title="..." src="https://www.google.com/maps?q=32.6130,-83.6241&z=13&output=embed"></iframe>
  </div>
  <span id="after-home-map" tabindex="-1"></span>
</section>
```

- **Keyless iframe, addressed by coordinates only** (D-07). The address is fictional and is
  never passed to a geocoder. It is rendered as text beside the map.
- `loading="lazy"` on the iframe. That is the whole lazy-mount mechanism.
- A **fixed aspect-ratio wrapper** (`aspect-ratio` plus `width: 100%`) so the frame reserves
  its space before the map loads and cannot shift layout.
- Two instances: `home-map` at `z=13` (below services, above the footer) and `contact-map`
  at `z=15` (beside the form). Both carry `data-section` ending in `-map`.
- A "Get directions" link to
  `https://www.google.com/maps/dir/?api=1&destination=32.6130,-83.6241`.

**Do NOT use:**

- An `IntersectionObserver` that swaps in the `<iframe>` on scroll. `loading="lazy"` does
  the same job natively, and the JS version renders nothing at all with JS disabled — the
  address text then loses its map without loses its heading.
- A click-to-load "privacy shim" over the frame. It adds a second interactive layer in front
  of an already awkward keyboard target for no benefit, since the privacy policy already
  discloses that the frame contacts Google.
- The Google Maps JavaScript API, any key, any `@react-google-maps` wrapper. D-18: no
  third-party keys.
- Passing the address string to the embed. It does not geocode — it is fictional — and
  passing it produces a map of somewhere else, confidently.
- `height: 0; padding-bottom: 56.25%` for the aspect ratio. Use `aspect-ratio`. The padding
  hack breaks the bypass link's `scroll-margin` arithmetic.
- Omitting `title` on the iframe. An untitled frame is announced as "frame" and is the
  reason the bypass link is needed in the first place.

## Ratio and why

**No transition at all — 0ms — on the map itself.** There is no fade-in, no skeleton
crossfade, no reveal. The frame's box is reserved by `aspect-ratio` from first paint and the
tiles arrive when they arrive; animating that arrival would be animating a third party's
network latency, which is jitter dressed as design.

The bypass link is `position: absolute` and visually hidden until `:focus-visible`, at which
point it appears with **no transition** — same reasoning as the form's focus ring (06): a
skip link that fades in lags behind fast Tab-through and is the one control that must never
feel slow.

## Failure mode

- **Keyboard trap.** This is the real one. An embedded Google Maps frame contains its own
  focusable controls (pan, zoom, terms, "view larger map"). A keyboard user tabbing down the
  page enters the frame and must Tab through all of it to get out. On `/contact` the frame
  sits *beside the form*, so the trap lands between a user and the submit button. The bypass
  link is the mitigation and it only works if it comes **before** the frame in DOM order.
- **The bypass link exists but points nowhere focusable.** `href="#after-home-map"` moves
  the document position but not the focus unless the target is focusable. Target must carry
  `tabindex="-1"`.
- **The bypass link is not the first child.** If the heading or the address precedes it, a
  user tabbing in from the previous section reaches the heading's links first, and on
  `/contact` the "Get directions" link — which opens a new tab — is hit before the escape
  hatch. Hence criterion 1.
- **Layout shift.** Without the aspect-ratio wrapper the iframe defaults to 150px tall and
  then jumps. This moves `box.h` for the whole band and would be scored as a structural
  divergence on a NOVEL section that has no reference to diverge from.
- **`loading="lazy"` on an above-the-fold frame** does nothing useful. `home-map` is well
  below the fold; `contact-map` at 390 is also below the fold because the form stacks above
  it. Verify at 390 rather than assuming.
- **Third-party content read as ours.** The frame's contents are Google's. Nothing inside it
  is measured, diffed, or contrast-audited — `contrast.mjs` reports `UNMEASURABLE` for it,
  which is correct and must not be "fixed".

## Trigger

| trigger | behaviour |
|---|---|
| section scrolls near the viewport | browser fetches the iframe (native lazy loading); no JS involved |
| `Tab` reaching the section | the bypass link receives focus first and becomes visible |
| `Enter` on the bypass link | focus moves to the `tabindex="-1"` sentinel after the frame; the frame is skipped entirely |
| `Enter` on "Get directions" | opens Google Maps directions to the coordinates in a new tab (`rel="noopener"`) |
| **client-side route change** to `/contact` | `contact-map` mounts fresh; the iframe is requested only once it is near the viewport. The `home-map` frame is unmounted with its section and is re-requested on return — this is accepted, not worked around with a cached global |
| JS disabled | everything above still works; there is no JS in this component |

## Accessibility

- `title` on every iframe, distinct per instance: "Map of the Helixa Garage Door Repair
  service area" (home) and "Map showing the Helixa Garage Door Repair location" (contact).
- The bypass link is the section's first element child, visually hidden until focused, and
  its target sentinel carries `tabindex="-1"`.
- The address is rendered as **text** next to the map, so the information the map carries is
  available without entering the frame at all. This is the substantive accessibility fix;
  the bypass link is the escape hatch.
- "Get directions" is a normal link with `rel="noopener noreferrer"` and a name that makes
  sense out of context.
- The section is not announced as an application or a region with a role it does not have.
- `prefers-reduced-motion` has nothing to disable here, which is the point.
- WCAG 2.5.8 on the bypass link and the directions link: 44×44 minimum at 390.

## Acceptance criteria, asserted against the rendered DOM

1. **`document.querySelector('[data-section$="-map"]').firstElementChild` is an `<a>` whose
   `href` starts with `#`.** Asserted for `home-map` and `contact-map` independently. This
   is a structural assertion precisely so it cannot be satisfied by prose.
2. The element identified by that `href` exists and has `tabIndex === -1`.
3. Every `[data-section$="-map"] iframe` has a non-empty `title`, `loading="lazy"`, and a
   `src` beginning `https://www.google.com/maps?q=32.6130,-83.6241`.
4. No iframe `src` on the site contains the string `Cindermill` — the fictional address is
   never passed to a geocoder.
5. The map wrapper has a computed `aspect-ratio` that is not `auto`, and the section's
   height is identical before and after the iframe finishes loading (zero CLS from this
   band).
6. `home-map` uses `z=13`; `contact-map` uses `z=15`.
7. A "Get directions" anchor exists on both, pointing at
   `https://www.google.com/maps/dir/?api=1&destination=32.6130,-83.6241`.
