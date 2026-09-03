// The sitemap MUST generate from lib/routes.ts (RESUME.md) so an entry can never drift
// from a real route -- five routes only, D-01, adding one is out of scope.
import type { MetadataRoute } from 'next';
import { ROUTES } from '@/lib/routes';
import { SITE_URL } from '@/lib/business';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((r) => ({
    url: new URL(r.href, SITE_URL).toString(),
    lastModified: now,
    changeFrequency: r.href === '/' ? ('weekly' as const) : ('monthly' as const),
    priority: r.href === '/' ? 1 : 0.7,
  }));
}

// output: "export" cannot infer this metadata route is static; say so explicitly.
export const dynamic = "force-static";
