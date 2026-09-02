import type { Metadata } from 'next';
import { Source_Sans_3, Raleway } from 'next/font/google';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import MobileCallBar from '@/components/MobileCallBar';

// F-02 (docs/known-divergence.md) — the reference paints body copy in the commercial
// ff-tisa-sans-web-pro (FontFont/Monotype, via Adobe Fonts). Substitute: Source Sans 3, a
// humanist sans of the same genre and near-identical x-height ratio. The resulting
// text-metric delta is the fleet's only genuine font-substitution floor and is NEVER
// iterated against (D-11).
//
// Raleway is SIL OFL and loaded directly -- heading metrics converge, no floor (F-02).
const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-source-sans',
  display: 'swap',
});
const raleway = Raleway({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-raleway',
  display: 'swap',
});

// NO title.template here, deliberately. Every route sets its FULL title from
// content/copy.ts. A template that appends the brand, on routes whose titles already name
// the brand, serves it twice on every subpage — and that is invisible in the source. The
// only title this file supplies is the fallback for a route that sets none.
export const metadata: Metadata = {
  title: 'Helixa Garage Door Repair',
  description: 'Garage door repair in Warner Robins, Georgia.',
};

// SHELL — owned by the lead (A-6). Frozen after Prompt 5: header, footer, nav, the NAP
// block, <BusinessMap> and this file are not touched by a section-builder agent. A shared
// change comes back to the lead and is made once, here.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${raleway.variable}`}>
      <body className="pb-14 lg:pb-0">
        <SiteHeader />
        {children}
        <SiteFooter />
        <MobileCallBar />
      </body>
    </html>
  );
}
