// lib/schema.ts — LocalBusiness JSON-LD, derived entirely from lib/business.ts.
// D-13 is load-bearing here: NO AggregateRating and NO Review markup, ever — fabricated
// review schema is a legal problem, not a content gap. Every field below is either a
// CONSTANT (fictional and deliberate, per CLAUDE.md) or a real structural fact about the
// page itself (its own URL). Nothing here is guessed.
import { SITE_URL, business, address, coords, hours, OPEN_DAYS } from '@/lib/business';

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: business.name,
  description: business.tagline,
  url: SITE_URL,
  telephone: business.phone,
  image: `${SITE_URL}/placeholders/logo-header.svg`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: address.street,
    addressLocality: address.locality,
    addressRegion: address.region,
    postalCode: address.postalCode,
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: coords.lat,
    longitude: coords.lng,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: OPEN_DAYS,
    opens: hours.opens,
    closes: hours.closes,
  },
  areaServed: business.serviceArea,
} as const;
