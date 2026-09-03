// The sitemap MUST generate from lib/routes.ts (RESUME.md) so an entry can never drift
// from a real route -- five routes only, D-01, adding one is out of scope.
import type { MetadataRoute } from 'next';
import { ROUTES } from '@/lib/routes';
import { SITE_URL } from '@/lib/business';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((r) => ({
    // next.config.ts sets trailingSlash: true, so every real served URL (and every
    // canonical tag emitted by the route metadata) ends in "/" except the root, which
    // already is "/". Match that exactly here -- a sitemap entry that disagrees with the
    // canonical URL for the same page is exactly the kind of drift D-01 exists to prevent.
    url: new URL(r.href === '/' ? '/' : `${r.href}/`, SITE_URL).toString(),
    lastModified: now,
    changeFrequency: r.href === '/' ? ('weekly' as const) : ('monthly' as const),
    priority: r.href === '/' ? 1 : 0.7,
  }));
}

// output: "export" cannot infer this metadata route is static; say so explicitly.
export const dynamic = "force-static";
