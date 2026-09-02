'use client';

// SiteHeader — shared shell, owned by the lead (A-6). Frozen after this prompt: no section
// agent touches this file. Ref band s00, 117px @1440 (docs/sections.md). Locations dropdown
// removed per D-02; nav is our five routes only (lib/routes.ts is the single source, so an
// entry here cannot drift from a real route).
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import { ROUTES } from '@/lib/routes';
import { business } from '@/lib/business';

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header
      data-section="site-header"
      className="sticky top-0 z-40 border-b"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:px-4 focus:py-2"
        style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-surface)' }}
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-[72px] max-w-(--container-max) items-center justify-between gap-4 px-4 lg:h-[86px] lg:px-8">
        <Link href="/" className="flex min-h-11 shrink-0 items-center gap-2" aria-label={business.name}>
          <span
            className="font-display text-xl font-extrabold tracking-tight lg:text-2xl"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
          >
            {business.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {ROUTES.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="text-sm font-bold"
              style={{ color: 'var(--color-neutral-900)' }}
            >
              {r.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={business.phoneHref}
            className="hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold lg:flex"
            style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-surface)', borderRadius: 'var(--radius-full)' }}
          >
            <Phone size={16} aria-hidden="true" />
            {business.phone}
          </a>

          <button
            type="button"
            aria-controls="mobile-nav-drawer"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border lg:hidden"
            style={{ borderColor: 'var(--color-border-strong)', flexShrink: 0 }}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav-drawer"
        data-drawer
        hidden={!open}
        className="border-t px-4 pb-6 pt-2 lg:hidden"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
      >
        <nav aria-label="Primary mobile" className="flex flex-col gap-1">
          {ROUTES.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              onClick={() => setOpen(false)}
              className="rounded-sm px-2 py-3 text-base font-bold"
              style={{ color: 'var(--color-neutral-900)' }}
            >
              {r.label}
            </Link>
          ))}
          <a
            href={business.phoneHref}
            className="mt-2 flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold"
            style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-surface)', borderRadius: 'var(--radius-full)' }}
          >
            <Phone size={16} aria-hidden="true" />
            {business.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
