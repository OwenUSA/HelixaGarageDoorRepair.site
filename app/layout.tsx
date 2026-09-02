import type { Metadata } from 'next';
import './globals.css';

// NO title.template here, deliberately. Every route sets its FULL title from
// content/copy.ts. A template that appends the brand, on routes whose titles already name
// the brand, serves it twice on every subpage — and that is invisible in the source. The
// only title this file supplies is the fallback for a route that sets none.
export const metadata: Metadata = {
  title: 'Helixa Garage Door Repair',
  description: 'Garage door repair in Warner Robins, Georgia.',
};

// SHELL — owned by the lead (A-6). Frozen after Prompt 5. Header, footer and nav are
// built in Prompt 5; this is a bare scaffold so the routes render and the harness runs.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
