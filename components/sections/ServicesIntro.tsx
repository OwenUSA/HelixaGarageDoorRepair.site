// services-intro — ADAPTED, ref s03-residential-roofing. Two-col: intro text + thumbnail
// row left, Gravity Form column right. The form is banned by D-03 (type=email on the
// reference) and becomes a call-now panel, matching home-services's pattern.
import Image from 'next/image';
import { Phone } from 'lucide-react';
import { copy } from '@/content/copy';
import { business } from '@/lib/business';

const section = copy.routes['/services'].sections.find((s) => s.id === 'services-intro')!;
const THUMBS = ['services-thumb-1', 'services-thumb-2', 'services-thumb-3', 'services-thumb-4', 'services-thumb-5'];

export default function ServicesIntro() {
  const callPanel = section.blocks?.[0];
  return (
    <section data-section="services-intro" className="py-12 lg:py-20" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="mx-auto max-w-(--container-max) px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold lg:text-3xl">{section.heading}</h2>
            {section.body?.map((p) => (
              <p key={p} className="mt-4 text-base" style={{ color: 'var(--color-neutral-600)' }}>
                {p}
              </p>
            ))}
            <ul className="mt-6 flex flex-wrap gap-3">
              {THUMBS.map((t, i) => (
                <li key={t}>
                  <Image
                    src={`/placeholders/${t}.svg`}
                    alt={`Garage door repair job example ${i + 1} in Warner Robins, GA`}
                    width={90}
                    height={90}
                  />
                </li>
              ))}
            </ul>
            {section.todo?.map((t) => (
              <p key={t} className="mt-6 text-xs font-bold" style={{ color: 'var(--color-warning)' }}>
                {t}
              </p>
            ))}
          </div>

          {callPanel ? (
            <div
              className="flex flex-col gap-4 self-start rounded-sm p-6"
              style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-surface)', borderRadius: 'var(--radius-sm)' }}
            >
              <h3 className="text-xl font-extrabold">{callPanel.heading}</h3>
              {callPanel.body?.map((p) => (
                <p key={p} className="text-sm">
                  {p}
                </p>
              ))}
              {callPanel.cta ? (
                <a
                  href={callPanel.cta.href}
                  className="mt-2 flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold"
                  style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-accent-deep)', borderRadius: 'var(--radius-full)' }}
                >
                  <Phone size={16} aria-hidden="true" />
                  {callPanel.cta.label}
                </a>
              ) : null}
              <p className="text-xs" style={{ color: 'var(--color-surface)' }}>
                {business.hoursLine}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
