// lib/business.ts — THE single source of truth for business facts. FACTS ONLY.
//
// Every fact here is DERIVED from `content/copy.ts`'s `nap` object. Nothing is retyped.
// That is the whole point of the file: a sibling site shipped two forms of its hours
// string — the values agreed, but one was a typed literal beside a derived one, and two
// forms that agree today are the precondition for a drift tomorrow. If a fact can be
// computed from `nap`, it is computed; if it cannot be, it does not belong here.
//
// The parsers below THROW rather than fall back. A silent fallback would turn a copy edit
// into wrong structured data, which is exactly the failure that has no visible symptom.

import { nap } from '@/content/copy';

// EVERY VALUE BELOW IS FICTIONAL AND DELIBERATE (CONSTANTS in CLAUDE.md).
// The address does not exist and is never passed to a geocoder (D-07); the phone is in the
// 555-01XX reserved range and cannot ring anyone. All of it is listed in docs/PRE-LAUNCH.md
// as must-replace-before-public.

const ADDRESS_RE = /^(.+),\s*(.+),\s*([A-Z]{2})\s*(\d{5})$/;
const HOURS_RE = /(\d{1,2}):(\d{2})\s*(AM|PM)\s*to\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i;

function parseAddress(s: string) {
  const m = ADDRESS_RE.exec(s);
  if (!m) throw new Error(`business.ts: nap.address does not parse: ${s}`);
  return { street: m[1], locality: m[2], region: m[3], postalCode: m[4] };
}

function to24(h: string, mm: string, ap: string): string {
  let n = Number(h) % 12;
  if (/pm/i.test(ap)) n += 12;
  return `${String(n).padStart(2, '0')}:${mm}`;
}

function parseHours(s: string) {
  const m = HOURS_RE.exec(s);
  if (!m) throw new Error(`business.ts: nap.hours does not parse: ${s}`);
  return { opens: to24(m[1], m[2], m[3]), closes: to24(m[4], m[5], m[6]) };
}

function parseCoords(s: string) {
  const [lat, lng] = s.split(',').map((v) => Number(v.trim()));
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    throw new Error(`business.ts: nap.mapCoords does not parse: ${s}`);
  }
  return { lat, lng };
}

export const address = parseAddress(nap.address);
export const hours = parseHours(nap.hours);
export const coords = parseCoords(nap.mapCoords);

/** Local-only base. D-18: no deploy, no domain. Listed in docs/PRE-LAUNCH.md. */
export const SITE_URL = 'http://localhost:3109';

/** All seven days, one block, no split hours (D-06). Never "24/7", never after-hours. */
export const OPEN_DAYS = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
] as const;

/** Coordinates only — the fictional address is NEVER handed to a geocoder (D-07). */
export const mapEmbedSrc = (zoom: number) =>
  `https://www.google.com/maps?q=${coords.lat},${coords.lng}&z=${zoom}&output=embed`;

export const directionsHref =
  `https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}`;

export const business = {
  name: nap.business,
  tagline: nap.tagline,
  phone: nap.phone,
  phoneHref: nap.phoneHref,
  addressLine: nap.address,
  hoursLine: nap.hours,
  serviceArea: nap.serviceArea,
  address,
  hours,
  coords,
} as const;

export default business;
