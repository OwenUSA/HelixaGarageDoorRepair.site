// services-faq — NOVEL, no reference band. In-page FAQ, /services only. Native
// <details><summary> per docs/behavior/05-faq-accordion.md: independent panels, no
// single-open enforcement, chevron rotates 200ms, instant under reduced motion.
import { ChevronDown } from 'lucide-react';
import { copy } from '@/content/copy';

const section = copy.routes['/services'].sections.find((s) => s.id === 'services-faq')!;

export default function ServicesFaq() {
  return (
    <section data-section="services-faq" className="py-12 lg:py-20" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="mx-auto max-w-[900px] px-4 lg:px-8">
        <h2 className="text-2xl font-extrabold lg:text-3xl">{section.heading}</h2>
        <div className="mt-8 flex flex-col gap-3">
          {section.blocks?.map((b, i) => (
            <details
              key={b.heading}
              id={`faq-${i + 1}`}
              className="group rounded-sm border scroll-mt-24 [&_summary::-webkit-details-marker]:hidden"
              style={{ borderColor: 'var(--color-border)', borderRadius: 'var(--radius-sm)' }}
            >
              <summary className="cursor-pointer list-none px-5 py-4">
                <span className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-bold">{b.heading}</h3>
                  <ChevronDown
                    size={20}
                    aria-hidden="true"
                    className="shrink-0 transition-transform duration-200 group-open:rotate-180"
                  />
                </span>
              </summary>
              <div className="px-5 pb-4">
                {b.body?.map((p) => (
                  <p key={p} className="text-sm" style={{ color: 'var(--color-neutral-600)' }}>
                    {p}
                  </p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
