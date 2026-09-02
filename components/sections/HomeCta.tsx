// home-cta — ADAPTED, ref s06-more-than-just-roofing. Closing call band with a background
// placeholder image and dark overlay. Note: this is a solid/gradient band with a heading —
// the h1..h6 { color } shell rule is beaten with an inline style directly on the heading
// element (docs/RESUME.md carry-forward note), not a wrapping className alone.
import Image from 'next/image';
import { copy } from '@/content/copy';

const section = copy.routes['/'].sections.find((s) => s.id === 'home-cta')!;

export default function HomeCta() {
  const cta = section.ctas?.[0];
  return (
    <section data-section="home-cta" className="relative overflow-hidden py-14 lg:py-20" style={{ backgroundColor: 'var(--color-primary)' }}>
      {/* backgroundColor lives on the SECTION (a real ancestor of the heading), not only
          on the sibling overlay below -- contrast.mjs cannot see a sibling <div>'s paint. */}
      <Image src="/placeholders/home-cta-image.svg" alt="" fill className="object-cover" style={{ opacity: 0.3 }} />
      <div className="absolute inset-0" style={{ backgroundColor: 'var(--color-primary)', opacity: 0.7 }} />
      <div className="relative z-10 mx-auto max-w-(--container-max) px-4 text-center lg:px-8">
        <h2 className="text-2xl font-extrabold lg:text-3xl" style={{ color: 'var(--color-surface)' }}>
          {section.heading}
        </h2>
        {section.body?.map((p) => (
          <p key={p} className="mx-auto mt-4 max-w-[672px] text-base" style={{ color: 'var(--color-surface)' }}>
            {p}
          </p>
        ))}
        {cta ? (
          <a
            href={cta.href}
            className="mt-8 inline-flex min-h-11 items-center rounded-full px-7 py-3 text-sm font-bold"
            style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-surface)', borderRadius: 'var(--radius-full)' }}
          >
            {cta.label}
          </a>
        ) : null}
      </div>
    </section>
  );
}
