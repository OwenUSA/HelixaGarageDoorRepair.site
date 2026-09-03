// about-story — ADAPTED, ref s03-content-about-crosby-roofing-seamless-gu. Single-column
// long-form content, matching the reference's one-column body + sub-heading panels. The
// certification badge slot was removed (no certification we can evidence) rather than
// filled with a placeholder.
import { copy } from '@/content/copy';

const section = copy.routes['/about'].sections.find((s) => s.id === 'about-story')!;

export default function AboutStory() {
  return (
    <section data-section="about-story" className="py-12 lg:py-20" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="mx-auto max-w-[900px] px-4 lg:px-8">
        <h2 className="text-2xl font-extrabold lg:text-3xl">{section.heading}</h2>
        {section.body?.map((p) => (
          <p key={p} className="mt-4 text-base" style={{ color: 'var(--color-neutral-600)' }}>
            {p}
          </p>
        ))}
        {section.blocks?.map((b) => (
          <div key={b.heading} className="mt-10">
            <h3 className="text-xl font-extrabold">{b.heading}</h3>
            {b.body?.map((p) => (
              <p key={p} className="mt-3 text-base" style={{ color: 'var(--color-neutral-600)' }}>
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
