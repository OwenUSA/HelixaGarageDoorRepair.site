// lib/routes.ts — the five routes, declared ONCE (D-01). Nav, footer and sitemap all read
// this array. There is no Locations route and adding one is out of scope (D-02).
export const ROUTES = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
] as const;

export type RouteHref = (typeof ROUTES)[number]['href'];
