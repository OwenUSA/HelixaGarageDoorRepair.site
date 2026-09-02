// The sitemap MUST generate from lib/routes.ts (RESUME.md) so an entry can never drift
// from a real route -- five routes only, D-01, adding one is out of scope.
import type { MetadataRoute } from 'next';
import { ROUTES } from '@/lib/routes';
import { SITE_URL } from '@/lib/business';

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({
    url: `${SITE_URL}${r.href}`,
    lastModified: new Date(),
  }));
}
