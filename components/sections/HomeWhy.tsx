// home-why — ADAPTED, ref s03-why-choose-crosby-roofing-for-your. REORDERED to 2nd (the
// proposition leads the page). Reference band: centred heading, a certification badge, then
// a card grid (4 + 3). We keep the card-grid shape; the certification badge slot was removed
// (no certification we can evidence) rather than filled with a placeholder.
import { copy } from '@/content/copy';

const section = copy.routes['/'].sections.find((s) => s.id === 'home-why')!;

export default function HomeWhy() {
  return (
    <section data-section="home-why" className="py-12 lg:py-24" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="mx-auto max-w-(--container-max) px-4 lg:px-8">
        <h2 className="text-center text-2xl font-extrabold lg:text-3xl">{section.heading}</h2>
        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {section.blocks?.map((b) => (
            <li
              key={b.heading}
              className="rounded-sm border p-6"
              style={{ borderColor: 'var(--color-border)', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-sm)' }}
            >
              <h3 className="text-base font-bold">{b.heading}</h3>
              {b.body?.map((p) => (
                <p key={p} className="mt-2 text-sm" style={{ color: 'var(--color-neutral-600)' }}>
                  {p}
                </p>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
