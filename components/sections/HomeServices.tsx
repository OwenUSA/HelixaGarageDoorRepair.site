// home-services — ADAPTED, ref s02-top-quality-roofing-services-georg. REORDERED to 3rd.
// Reference band: two-col (long-form text left, Gravity Forms estimate panel right), then a
// six-card icon grid below. The form column is banned by D-03 (it carries type=email on the
// reference) and becomes a call-now panel instead, per docs/sections.md.
import { Cpu, AlertTriangle, Zap, Waves, LayoutPanelTop, CalendarClock, Phone } from 'lucide-react';
import { copy } from '@/content/copy';
import { business } from '@/lib/business';

const section = copy.routes['/'].sections.find((s) => s.id === 'home-services')!;

const ICONS = [Cpu, AlertTriangle, Zap, Waves, LayoutPanelTop, CalendarClock];

export default function HomeServices() {
  const blocks = section.blocks ?? [];
  const diagnosis = blocks[0];
  const callPanel = blocks[1];
  const gridIntro = blocks[2];
  const symptomCards = blocks.slice(3, 9);

  return (
    <section data-section="home-services" className="py-12 lg:py-24" style={{ backgroundColor: 'var(--color-neutral-200)' }}>
      <div className="mx-auto max-w-(--container-max) px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold lg:text-3xl">{section.heading}</h2>
            {section.body?.map((p) => (
              <p key={p} className="mt-4 text-base" style={{ color: 'var(--color-neutral-600)' }}>
                {p}
              </p>
            ))}
            {diagnosis ? (
              <div className="mt-8">
                <h3 className="text-lg font-bold">{diagnosis.heading}</h3>
                {diagnosis.body?.map((p) => (
                  <p key={p} className="mt-3 text-base" style={{ color: 'var(--color-neutral-600)' }}>
                    {p}
                  </p>
                ))}
              </div>
            ) : null}
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

        {gridIntro ? (
          <div className="mt-16 max-w-[768px]">
            <h3 className="text-xl font-extrabold lg:text-2xl">{gridIntro.heading}</h3>
            {gridIntro.body?.map((p) => (
              <p key={p} className="mt-3 text-base" style={{ color: 'var(--color-neutral-600)' }}>
                {p}
              </p>
            ))}
          </div>
        ) : null}

        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {symptomCards.map((b, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <li key={b.heading}>
                <a
                  href="/services"
                  className="flex h-full flex-col gap-3 rounded-sm border p-6 transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
                  style={{ borderColor: 'var(--color-border)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)' }}
                >
                  <Icon size={32} aria-hidden="true" style={{ color: 'var(--color-accent-deep)' }} />
                  <h4 className="text-base font-bold">{b.heading}</h4>
                  {b.body?.map((p) => (
                    <p key={p} className="text-sm" style={{ color: 'var(--color-neutral-600)' }}>
                      {p}
                    </p>
                  ))}
                </a>
              </li>
            );
          })}
        </ul>

        {section.todo?.map((t) => (
          <p key={t} className="mt-6 text-xs font-bold" style={{ color: 'var(--color-warning)' }}>
            {t}
          </p>
        ))}
      </div>
    </section>
  );
}
