// services-grid — ADAPTED, ref s04-residential-roofing-services-we-of. Reference: a photo
// beside a heading, then a stack of sub-headed paragraphs (one per service). Regrouped by
// symptom per docs/sections.md: six symptom headings, the eight CONSTANTS services
// distributed across them, each appearing exactly once.
import Image from 'next/image';
import { copy } from '@/content/copy';

const section = copy.routes['/services'].sections.find((s) => s.id === 'services-grid')!;

export default function ServicesGrid() {
  return (
    <section data-section="services-grid" className="py-12 lg:py-20" style={{ backgroundColor: 'var(--color-neutral-200)' }}>
      <div className="mx-auto max-w-(--container-max) px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[306px_1fr] lg:items-start">
          <Image src="/placeholders/services-card-image.svg" alt="" width={306} height={204} className="w-full" />
          <h2 className="text-2xl font-extrabold lg:text-3xl">{section.heading}</h2>
        </div>

        <ol className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {section.blocks?.map((b) => (
            <li key={b.heading}>
              <h3 className="text-lg font-bold">{b.heading}</h3>
              {b.body?.map((p) => (
                <p key={p} className="mt-2 text-sm" style={{ color: 'var(--color-neutral-600)' }}>
                  {p}
                </p>
              ))}
              <ul className="mt-3 flex flex-wrap gap-2">
                {b.items?.map((it) => (
                  <li
                    key={it}
                    className="rounded-full px-3 py-1 text-xs font-bold"
                    style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-accent-deep)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)' }}
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
