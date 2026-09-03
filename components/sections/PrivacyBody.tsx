// privacy-body — NOVEL end to end (D-16). No reference page exists for this route.
import { copy } from '@/content/copy';

const section = copy.routes['/privacy'].sections.find((s) => s.id === 'privacy-body')!;

export default function PrivacyBody() {
  return (
    <section data-section="privacy-body" className="py-12 lg:py-20" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="mx-auto max-w-[900px] px-4 lg:px-8">
        <h2 className="text-2xl font-extrabold lg:text-3xl">{section.heading}</h2>
        {section.body?.map((p) => (
          <p key={p} className="mt-4 text-base" style={{ color: 'var(--color-neutral-600)' }}>
            {p}
          </p>
        ))}
        <div className="mt-8 flex flex-col gap-8">
          {section.blocks?.map((b) => (
            <div key={b.heading}>
              <h3 className="text-lg font-bold">{b.heading}</h3>
              {b.body?.map((p) => (
                <p key={p} className="mt-2 text-base" style={{ color: 'var(--color-neutral-600)' }}>
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
