// PageBanner — shared band pattern for about-banner / services-banner / contact-banner /
// privacy-banner. Full-bleed placeholder image, dark overlay, white heading (+ optional
// subheading) anchored bottom-left, matching the reference's page-banner band.
// NOT part of the frozen shell (it is a section-level pattern, not header/footer/nav/map),
// but shared across four ADAPTED/NOVEL rows so it lives once here rather than four times.
import Image from 'next/image';

export default function PageBanner({
  id,
  heading,
  subheading,
  image,
  heightClass = 'h-[203px] md:h-[133px] lg:h-[250px]',
}: {
  id: string;
  heading: string;
  subheading?: string;
  image: string;
  heightClass?: string;
}) {
  return (
    <section
      data-section={id}
      className={`relative flex items-end overflow-hidden ${heightClass}`}
      style={{ backgroundColor: 'var(--color-neutral-900)' }}
    >
      <Image src={image} alt="" fill priority className="object-cover" style={{ opacity: 0.45 }} />
      {/* Solid backgroundColor lives on the SECTION itself (a real ancestor of the
          heading below), not only on this decorative sibling overlay -- contrast.mjs
          resolves ancestor CSS backgrounds and cannot see a sibling <div>'s paint, so a
          overlay-only approach reported the page's own near-white background under white
          text (F-14-class defect, caught by the render-truth/contrast BLOCKING gates). */}
      <div className="absolute inset-0" style={{ backgroundColor: 'var(--color-neutral-900)', opacity: 0.4 }} />
      <div className="relative z-10 mx-auto w-full max-w-(--container-max) px-4 pb-6 lg:px-8 lg:pb-8">
        <h1 className="text-2xl font-extrabold lg:text-4xl" style={{ color: 'var(--color-surface)' }}>
          {heading}
        </h1>
        {subheading ? (
          <p className="mt-2 text-base font-bold lg:text-lg" style={{ color: 'var(--color-surface)' }}>
            {subheading}
          </p>
        ) : null}
      </div>
    </section>
  );
}
