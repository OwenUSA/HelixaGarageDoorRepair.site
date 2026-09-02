// home-map — NOVEL, no reference band (D-08 requires it). Owned by the lead (A-6), built
// personally alongside the hero. Zoom ~13, below the services/reviews content per
// docs/sections.md ordering.
import { copy } from '@/content/copy';
import BusinessMap from '@/components/BusinessMap';

const section = copy.routes['/'].sections.find((s) => s.id === 'home-map')!;

export default function HomeMap() {
  return (
    <section data-section="home-map" className="py-12 lg:py-20" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-10 px-4 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <h2 className="text-2xl font-extrabold lg:text-3xl">{section.heading}</h2>
          {section.body?.map((p) => (
            <p key={p} className="mt-3 text-base" style={{ color: 'var(--color-neutral-600)' }}>
              {p}
            </p>
          ))}
        </div>
        <BusinessMap zoom={13} aspect="4 / 3" />
      </div>
    </section>
  );
}
