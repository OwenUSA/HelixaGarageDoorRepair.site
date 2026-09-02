// ROUTE STUB — content lands in Prompt 6+7. Do not add copy here.
// Metadata is READ FROM content/copy.ts (Prompt 3). Never hardcode a title or a
// description in a route file, and never let a title.template in layout.tsx append the
// brand as well — a sibling shipped every subpage with the brand name twice and only an
// HTTP check caught it. Verified over HTTP, not by reading this file.
import type { Metadata } from 'next';
import { copy } from '@/content/copy';
import PrivacyBody from '@/components/sections/PrivacyBody';

const page = copy.routes['/privacy'];
const banner = page.sections.find((s) => s.id === 'privacy-banner')!;

export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
};

export default function PrivacyPage() {
  return (
    <main id="main" data-route="/privacy">
      <section
        data-section="privacy-banner"
        className="py-12 lg:py-16"
        style={{ background: 'linear-gradient(180deg, var(--color-primary), var(--color-primary-deep))' }}
      >
        <div className="mx-auto max-w-(--container-max) px-4 lg:px-8">
          <h1 className="text-2xl font-extrabold lg:text-4xl" style={{ color: 'var(--color-surface)' }}>
            {banner.heading}
          </h1>
          {banner.subheading ? (
            <p className="mt-2 text-base font-bold" style={{ color: 'var(--color-surface)' }}>
              {banner.subheading}
            </p>
          ) : null}
        </div>
      </section>
      <PrivacyBody />
    </main>
  );
}
