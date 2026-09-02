# 06 — Form field focus, error and success states

`contact-main` only. D-05: name, phone, service needed (select), preferred callback window,
message. **No backend, no email field, no submission target.** The component carries
`// STUB: no submission target` as its first line.

## Mechanism

Uncontrolled inputs with the browser's own constraint validation (`required`, `type="tel"`,
`pattern`, `minlength`) plus a thin `useState` layer that holds *only* the per-field
"has been blurred at least once" flag and the submit outcome. Validation messages are
rendered by us into a `<p id="<field>-error" role="alert">`, wired with
`aria-describedby` and `aria-invalid`.

On submit: `preventDefault()`, run `form.checkValidity()`, focus the first invalid control,
and on success swap the form for a "we will call you back" panel and
`console.warn('STUB: no submission target — nothing was sent')`.

**Do NOT use:**

- `react-hook-form` or `zod`. Explicitly banned in the allowlist: five fields, no backend,
  and the browser already implements constraint validation.
- `<input type="email">` **anywhere**. Banned by D-03 and swept for before every done
  report. The reference's Gravity Form has one on three of its four pages; ours has none.
- Native `:invalid` styling as the only error signal. `:invalid` matches an empty required
  field on **first paint**, so the form renders pre-scolded. Gate every error style behind
  the "has been blurred" flag (`[data-touched="true"]:invalid`).
- Validation on every keystroke. It fights the user while they are still typing a phone
  number. Validate on blur, then re-validate on input **only once the field is already in
  an error state**.
- Colour as the only error signal. Fails WCAG 1.4.1 and is unreadable to a third of the
  people who most need the phone number.
- A `<div role="alert">` that exists but is empty on mount and gets filled later — some
  screen readers will not announce into a live region that was empty at registration time
  in every engine. Render the region only when there is a message, or accept the known
  variance and test it.

## Ratio and why

**Focus ring: 0ms. Error appearance: 120ms `ease-out`. Success panel swap: 200ms
`ease-out`.**

The focus ring is instantaneous by design — a transitioned focus ring lags behind fast
Tab-through and makes keyboard navigation feel broken. This is the one place in the system
where the ratio is deliberately zero.

Error text is 120ms: fast, because it is a correction the user is waiting for, but not zero,
because an instantly-appearing red line under a field the user has just left reads as an
accusation. 120ms is enough to register as "this appeared because I moved on".

The success swap is 200ms, matching the disclosure family — it is the same class of event as
opening a panel.

Semantic colours (error, success, focus ring) are **exempt from the Prompt 5 hue rotation**
and keep conventional hues. A randomly-green error state is a bug, not a palette.

## Failure mode

- **The form looks like it worked.** It has no submission target. The success panel must
  say what actually happens — that we will call back on the number given — and the console
  warning must fire so nobody wires this to a real deployment by accident. This is the
  single most important failure mode on this page.
- **Errors announced but not reachable.** If the first invalid control is not focused on
  submit, a screen-reader user hears "3 errors" with no way to find them.
- **The mobile call bar covers the submit button** when the on-screen keyboard is open (see
  spec 03). `scroll-margin-bottom` on the submit control.
- **`aria-describedby` pointing at an id that does not exist** while the field is valid.
  Harmless in most engines, silently drops the hint in others. Only set it when the error
  node is rendered.
- **The select has no default-invalid option**, so "service needed" silently submits the
  first service. The first `<option>` must be a disabled, selected, empty-valued prompt.
- **Autofill.** `autocomplete="name"`, `autocomplete="tel"` — without them the browser
  offers nothing on the one field where typing on a phone is most annoying.
- **A `type="submit"` inside a form with no `action`** navigates on Enter if
  `preventDefault` is missed. Keyboard-only users hit this first.

## Trigger

| trigger | behaviour |
|---|---|
| `focus` on any control | focus ring appears with no transition |
| `blur` on a control | `data-touched="true"`; validity evaluated; error text appears over 120ms if invalid |
| `input` on a control **already in error** | re-validated live; error clears as soon as it is satisfied |
| `input` on a control not yet blurred | nothing — no styling, no message |
| `submit` with invalid fields | `preventDefault`, first invalid control focused and scrolled into view clear of the sticky header and the call bar |
| `submit` with all fields valid | `preventDefault`, form replaced by the callback panel, `console.warn` stub notice |
| **client-side route change** away and back | the component unmounts; all state and all entered values are gone. There is no draft persistence and none is implied to the user |

## Accessibility

- Every control has a real `<label for>`. No placeholder-as-label anywhere.
- `aria-invalid="true"` and `aria-describedby="<field>-error"` are set together, only while
  the error is rendered.
- Error text is prefixed with an icon **and** words — never colour alone.
- The submit button is a `<button type="submit">` with a text label, minimum 44×44 at 390.
- The callback panel that replaces the form receives focus on appearance
  (`tabIndex={-1}` + `.focus()`), otherwise focus is orphaned on a removed button.
- The whole form is keyboard-operable with no custom key handling: the select is a native
  `<select>`, the callback window is a native `<select>`, the message is a `<textarea>`.
- Contrast: error and success text, the focus ring, and every field border are
  foreground/background pairs *actually in use* and are all in Prompt 5's `pairsInUse`.
  Borders and large text clear 3:1; body-size error text clears 4.5:1.
- `prefers-reduced-motion: reduce` → the 120ms and 200ms transitions become `0.01ms`. The
  focus ring is already 0ms and is unaffected.

## Acceptance criteria, asserted against the rendered DOM

1. `document.querySelectorAll('input[type="email"]').length === 0` on every route, and the
   repository-wide email sweep is clean.
2. Every `input`, `select` and `textarea` in `[data-section="contact-main"]` has a
   `<label>` whose `for` matches its `id`.
3. On first paint, no control has `aria-invalid="true"` and no `[role="alert"]` node
   exists.
4. After blurring an empty required field, that control has `aria-invalid="true"` and an
   `aria-describedby` pointing at a node that exists and has non-empty text.
5. Submitting an invalid form leaves `document.activeElement` equal to the first invalid
   control, and the URL is unchanged.
6. The component source's first line contains `STUB: no submission target`.
7. The first `<option>` of each `<select>` is `disabled` and has `value=""`.
