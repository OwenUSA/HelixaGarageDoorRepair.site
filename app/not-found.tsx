// Custom 404. NOVEL — no reference counterpart at all. Original copy, token-conformant.
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { business } from '@/lib/business';

export default function NotFound() {
  return (
    <main id="main" data-section="not-found" className="mx-auto flex max-w-(--container-max) flex-col items-start gap-6 px-4 py-24 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-wide" style={{ color: 'var(--color-accent-deep)' }}>
        404
      </p>
      <h1 className="text-3xl font-extrabold lg:text-4xl">That page isn&apos;t here</h1>
      <p className="max-w-prose text-base" style={{ color: 'var(--color-neutral-600)' }}>
        The page you were looking for has moved or never existed. If your garage door needs
        attention, calling is the fastest way to reach us.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="/"
          className="rounded-full px-6 py-3 text-sm font-bold"
          style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-surface)', borderRadius: 'var(--radius-full)' }}
        >
          Back to home
        </Link>
        <a
          href={business.phoneHref}
          className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold"
          style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-surface)', borderRadius: 'var(--radius-full)' }}
        >
          <Phone size={16} aria-hidden="true" />
          {business.phone}
        </a>
      </div>
    </main>
  );
}
