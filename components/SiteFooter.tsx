// SiteFooter — shared shell, owned by the lead (A-6). Frozen after this prompt. Ref band id
// varies per route (s07 / s05 / s06 / s04 -- content/copy.ts's footerAt()), never s07
// everywhere; that is a route-file concern, not this component's. This component renders
// the shared NAP block: text is read from lib/business.ts, itself DERIVED from
// content/copy.ts's nap object (single source of truth, no retyped literal).
import Link from 'next/link';
import { Phone, MapPin, Clock } from 'lucide-react';
import { ROUTES } from '@/lib/routes';
import { business, directionsHref } from '@/lib/business';

export default function SiteFooter() {
  return (
    <footer
      data-section="site-footer"
      className="text-white"
      style={{
        background: 'linear-gradient(180deg, var(--color-primary), var(--color-primary-deep))',
        color: 'var(--color-surface)',
      }}
    >
      <div className="mx-auto grid max-w-(--container-max) gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="flex flex-col gap-3">
          <span className="text-xl font-extrabold" style={{ fontFamily: 'var(--font-display)' }}>
            {business.name}
          </span>
          <p className="text-sm" style={{ color: 'var(--color-neutral-400)' }}>
            We publish our hours, our address and one phone number. Nothing else routes your
            call.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-2">
          <span className="text-sm font-bold uppercase tracking-wide" style={{ color: 'var(--color-neutral-400)' }}>
            Site
          </span>
          {ROUTES.map((r) => (
            <Link key={r.href} href={r.href} className="flex min-h-11 items-center text-sm">
              {r.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-bold uppercase tracking-wide" style={{ color: 'var(--color-neutral-400)' }}>
            Contact
          </span>
          <a href={business.phoneHref} className="flex items-center gap-2 text-sm font-bold">
            <Phone size={16} aria-hidden="true" />
            {business.phone}
          </a>
          <span className="flex items-start gap-2 text-sm">
            <MapPin size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
            {business.addressLine}
          </span>
          <span className="flex items-start gap-2 text-sm">
            <Clock size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
            {business.hoursLine}
          </span>
          <a href={directionsHref} className="flex min-h-11 items-center text-sm underline">
            Get directions
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-bold uppercase tracking-wide" style={{ color: 'var(--color-neutral-400)' }}>
            Service area
          </span>
          <p className="text-sm">{business.serviceArea}</p>
          <p className="text-xs" style={{ color: 'var(--color-neutral-400)' }}>
            Georgia licensed and insured — contractor license #GDC-048291, Georgia State
            Licensing Board for Residential and General Contractors.
          </p>
        </div>
      </div>

      <div className="border-t px-4 py-4 text-center text-xs lg:px-8" style={{ borderColor: 'var(--color-primary-deep)', color: 'var(--color-neutral-400)' }}>
        Copyright 2026 {business.name}. All rights reserved.
      </div>
    </footer>
  );
}
