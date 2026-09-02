import type { Metadata } from 'next';
import './globals.css';

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
