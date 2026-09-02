// home-reviews — ADAPTED, ref s04-client-reviews. Reference is a Splide slider of review
// cards under a Google/five-star lockup. D-13: no invented rating, no review count, no
// third-party review branding, no AggregateRating/Review schema. Review furniture dropped;
// cards render as a static grid of literal [TESTIMONIAL PLACEHOLDER] blocks.
import { copy } from '@/content/copy';

const section = copy.routes['/'].sections.find((s) => s.id === 'home-reviews')!;

export default function HomeReviews() {
  return (
    <section data-section="home-reviews" className="py-12 lg:py-20" style={{ backgroundColor: 'var(--color-neutral-200)' }}>
      <div className="mx-auto max-w-(--container-max) px-4 text-center lg:px-8">
        <h2 className="text-2xl font-extrabold lg:text-3xl">{section.heading}</h2>
        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {section.body?.map((quote, i) => (
            <li
              key={i}
              className="rounded-sm p-6 text-left"
              style={{ backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-sm)' }}
            >
              <p className="text-sm" style={{ color: 'var(--color-neutral-600)' }}>
                {quote}
              </p>
            </li>
          ))}
        </ul>
        {section.todo?.map((t) => (
          <p key={t} className="mt-6 text-xs font-bold" style={{ color: 'var(--color-warning)' }}>
            {t}
          </p>
        ))}
      </div>
    </section>
  );
}
