// home-hero — ADAPTED, ref s01-heroSlides. The reference is a Bootstrap carousel with
// exactly one slide (F-10); we render the same visual band statically, no carousel JS.
// Owned by the lead (A-6): hero + the two map sections are built personally, not dispatched.
import Image from 'next/image';
import { copy } from '@/content/copy';

const section = copy.routes['/'].sections.find((s) => s.id === 'home-hero')!;

export default function HomeHero() {
  const cta = section.ctas?.[0];
  return (
    <section
      data-section="home-hero"
      className="relative flex min-h-[380px] items-center overflow-hidden lg:min-h-[540px]"
      style={{ backgroundColor: 'var(--color-neutral-900)' }}
    >
      {/* backgroundColor lives on the SECTION (a real ancestor of the heading), not only
          on the sibling overlay below -- contrast.mjs cannot see a sibling <div>'s paint. */}
      <Image src="/placeholders/hero-image.svg" alt="" fill priority className="object-cover" style={{ opacity: 0.45 }} />
      <div className="absolute inset-0" style={{ backgroundColor: 'var(--color-neutral-900)', opacity: 0.4 }} />
      <div className="relative z-10 mx-auto w-full max-w-(--container-max) px-4 py-16 lg:px-8">
        <h1 className="max-w-[672px] text-3xl font-extrabold lg:text-5xl" style={{ color: 'var(--color-surface)' }}>
          {section.heading}
        </h1>
        <p className="mt-4 max-w-[576px] text-base font-bold lg:text-xl" style={{ color: 'var(--color-surface)' }}>
          {section.subheading}
        </p>
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
