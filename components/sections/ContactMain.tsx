// STUB: no submission target
// contact-main — ADAPTED, ref s03-contact-crosby-roofing-seamless. D-05: name, phone,
// service needed (select), preferred callback window, message. No backend, no email field.
// docs/behavior/06-form-field-states.md: uncontrolled inputs, blur-gated error styling,
// focus first invalid control on submit, swap to a callback panel on success.
'use client';

import { useRef, useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { copy } from '@/content/copy';
import { business } from '@/lib/business';

const section = copy.routes['/contact'].sections.find((s) => s.id === 'contact-main')!;

const SERVICES = [
  'Spring repair and replacement',
  'Opener repair and installation',
  'Cable, roller and track repair',
  'Panel replacement',
  'Off-track and misaligned door correction',
  'New residential door installation',
  'Commercial and roll-up doors',
  'Annual maintenance and tune-up',
];

const WINDOWS = ['Morning (7am - 11am)', 'Midday (11am - 3pm)', 'Afternoon (3pm - 7pm)', 'Any time'];

function Field({
  id,
  label,
  children,
  touched,
  error,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  touched: boolean;
  error: string | null;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-bold">
        {label}
      </label>
      {children}
      {touched && error ? (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-1.5 text-xs font-bold transition-opacity duration-[120ms] ease-out" style={{ color: 'var(--color-error)' }}>
          <AlertCircle size={14} aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function ContactMain() {
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const inputStyle: React.CSSProperties = {
    borderColor: 'var(--color-border-strong)',
    borderRadius: 'var(--radius-sm)',
    backgroundColor: 'var(--color-surface)',
  };

  const errorFor = (el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null): string | null => {
    if (!el) return null;
    if (el.validity.valid) return null;
    if (el.validity.valueMissing) return 'This field is required.';
    if (el.validity.patternMismatch) return 'That does not look like a phone number.';
    return 'Check this field.';
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setTouched((t) => ({ ...t, [e.target.id]: true }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      const firstInvalid = form.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(':invalid');
      const all: Record<string, boolean> = {};
      form.querySelectorAll('input,select,textarea').forEach((el) => {
        all[(el as HTMLElement).id] = true;
      });
      setTouched(all);
      firstInvalid?.focus();
      return;
    }
    setSubmitted(true);
    // eslint-disable-next-line no-console
    console.warn('STUB: no submission target — nothing was sent');
    requestAnimationFrame(() => successRef.current?.focus());
  };

  const err = (id: string) => (touched[id] && formRef.current ? errorFor(formRef.current.elements.namedItem(id) as HTMLInputElement) : null);

  return (
    <section data-section="contact-main" className="py-12 lg:py-20" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-10 px-4 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-2xl font-extrabold lg:text-3xl">{section.heading}</h2>
          {section.body?.slice(0, 2).map((p) => (
            <p key={p} className="mt-4 text-base" style={{ color: 'var(--color-neutral-600)' }}>
              {p}
            </p>
          ))}
          <div className="mt-6 flex flex-col gap-1 text-sm">
            <span className="font-bold">{business.name}</span>
            <span>{business.addressLine}</span>
            <span>{business.hoursLine}</span>
          </div>
          {section.ctas?.[0] ? (
            <a
              href={section.ctas[0].href}
              className="mt-6 inline-flex min-h-11 items-center rounded-full px-6 py-3 text-sm font-bold"
              style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-surface)', borderRadius: 'var(--radius-full)' }}
            >
              {section.ctas[0].label}
            </a>
          ) : null}
        </div>

        <div
          className="rounded-sm p-6"
          style={{ backgroundColor: 'var(--color-neutral-200)', borderRadius: 'var(--radius-sm)' }}
        >
          {submitted ? (
            <div ref={successRef} tabIndex={-1} role="status" className="flex flex-col items-start gap-3 transition-opacity duration-200 ease-out">
              <CheckCircle2 size={28} aria-hidden="true" style={{ color: 'var(--color-success)' }} />
              <h3 className="text-lg font-bold">We will call you back</h3>
              <p className="text-sm" style={{ color: 'var(--color-neutral-600)' }}>
                Thanks — we have your details. Somebody will call the number you gave us
                inside the window you chose. If it is urgent, call {business.phone} now.
              </p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
              <Field id="contact-name" label="Name" touched={!!touched['contact-name']} error={err('contact-name')}>
                <input
                  id="contact-name"
                  name="contact-name"
                  type="text"
                  required
                  autoComplete="name"
                  onBlur={onBlur}
                  data-touched={touched['contact-name'] || undefined}
                  aria-invalid={touched['contact-name'] && !!err('contact-name')}
                  aria-describedby={touched['contact-name'] && err('contact-name') ? 'contact-name-error' : undefined}
                  className="min-h-11 rounded-sm border px-3 py-2 text-base"
                  style={inputStyle}
                />
              </Field>

              <Field id="contact-phone" label="Phone" touched={!!touched['contact-phone']} error={err('contact-phone')}>
                <input
                  id="contact-phone"
                  name="contact-phone"
                  type="tel"
                  required
                  pattern="^[0-9()+\-.\s]{7,}$"
                  autoComplete="tel"
                  onBlur={onBlur}
                  data-touched={touched['contact-phone'] || undefined}
                  aria-invalid={touched['contact-phone'] && !!err('contact-phone')}
                  aria-describedby={touched['contact-phone'] && err('contact-phone') ? 'contact-phone-error' : undefined}
                  className="min-h-11 rounded-sm border px-3 py-2 text-base"
                  style={inputStyle}
                />
              </Field>

              <Field id="contact-service" label="Service needed" touched={!!touched['contact-service']} error={err('contact-service')}>
                <select
                  id="contact-service"
                  name="contact-service"
                  required
                  defaultValue=""
                  onBlur={onBlur}
                  data-touched={touched['contact-service'] || undefined}
                  aria-invalid={touched['contact-service'] && !!err('contact-service')}
                  aria-describedby={touched['contact-service'] && err('contact-service') ? 'contact-service-error' : undefined}
                  className="min-h-11 rounded-sm border px-3 py-2 text-base"
                  style={inputStyle}
                >
                  <option value="" disabled>
                    Choose one
                  </option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>

              <Field id="contact-window" label="Preferred callback window" touched={!!touched['contact-window']} error={err('contact-window')}>
                <select
                  id="contact-window"
                  name="contact-window"
                  required
                  defaultValue=""
                  onBlur={onBlur}
                  data-touched={touched['contact-window'] || undefined}
                  aria-invalid={touched['contact-window'] && !!err('contact-window')}
                  aria-describedby={touched['contact-window'] && err('contact-window') ? 'contact-window-error' : undefined}
                  className="min-h-11 rounded-sm border px-3 py-2 text-base"
                  style={inputStyle}
                >
                  <option value="" disabled>
                    Choose one
                  </option>
                  {WINDOWS.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </Field>

              <Field id="contact-message" label="What the door is doing" touched={!!touched['contact-message']} error={err('contact-message')}>
                <textarea
                  id="contact-message"
                  name="contact-message"
                  required
                  minLength={10}
                  rows={4}
                  onBlur={onBlur}
                  data-touched={touched['contact-message'] || undefined}
                  aria-invalid={touched['contact-message'] && !!err('contact-message')}
                  aria-describedby={touched['contact-message'] && err('contact-message') ? 'contact-message-error' : undefined}
                  className="rounded-sm border px-3 py-2 text-base"
                  style={inputStyle}
                />
              </Field>

              <button
                type="submit"
                className="scroll-mb-24 mt-2 flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-sm font-bold"
                style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-surface)', borderRadius: 'var(--radius-full)' }}
              >
                {section.fields?.[5] ?? 'Request a callback'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
