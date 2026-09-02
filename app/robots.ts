// D-18: local-only, no deploy, no domain. This file exists so the metadata surface is
// complete and consistent with `lib/business.ts`'s SITE_URL, not because the site is
// public. Generated, not hand-maintained, so it can never list a route lib/routes.ts
// doesn't have.
import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/business';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
