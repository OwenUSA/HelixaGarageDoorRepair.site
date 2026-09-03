// Generated, not hand-maintained, so it can never disagree with lib/business.ts's
// SITE_URL or list a route lib/routes.ts doesn't have.
import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/business';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

// output: "export" cannot infer this metadata route is static; say so explicitly.
export const dynamic = "force-static";
