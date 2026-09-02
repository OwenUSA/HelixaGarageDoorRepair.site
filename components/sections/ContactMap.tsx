// contact-map — NOVEL, no reference band (D-08 requires it here, zoom ~15, beside the form
// in spirit though stacked below it in our flow). Owned by the lead (A-6).
import { copy } from '@/content/copy';
import BusinessMap from '@/components/BusinessMap';

const section = copy.routes['/contact'].sections.find((s) => s.id === 'contact-map')!;

export default function ContactMap() {
  return (
    <section data-section="contact-map" className="py-12 lg:py-20" style={{ backgroundColor: 'var(--color-neutral-200)' }}>
      <div className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-10 px-4 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <h2 className="text-2xl font-extrabold lg:text-3xl">{section.heading}</h2>
          {section.body?.map((p) => (
            <p key={p} className="mt-3 text-base" style={{ color: 'var(--color-neutral-600)' }}>
              {p}
            </p>
          ))}
        </div>
        <BusinessMap zoom={15} aspect="4 / 3" />
      </div>
    </section>
  );
}
