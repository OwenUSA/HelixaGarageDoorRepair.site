// about-approach — NOVEL, no reference band. Replaces the deleted D-02 city grid, standing
// where "Meet Our Teams" sat on the reference /about. Three rules, three cards.
import { copy } from '@/content/copy';

const section = copy.routes['/about'].sections.find((s) => s.id === 'about-approach')!;

export default function AboutApproach() {
  return (
    <section data-section="about-approach" className="py-12 lg:py-20" style={{ backgroundColor: 'var(--color-neutral-200)' }}>
      <div className="mx-auto max-w-(--container-max) px-4 lg:px-8">
        <h2 className="text-center text-2xl font-extrabold lg:text-3xl">{section.heading}</h2>
        <ol className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {section.blocks?.map((b, i) => (
            <li
              key={b.heading}
              className="rounded-sm p-6"
              style={{ backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-sm)' }}
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold"
                style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-surface)', borderRadius: 'var(--radius-full)' }}
              >
                {i + 1}
              </span>
              <h3 className="mt-4 text-base font-bold">{b.heading}</h3>
              {b.body?.map((p) => (
                <p key={p} className="mt-2 text-sm" style={{ color: 'var(--color-neutral-600)' }}>
                  {p}
                </p>
              ))}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
