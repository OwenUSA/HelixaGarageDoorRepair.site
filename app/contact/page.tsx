// ROUTE STUB — content lands in Prompt 6+7. Do not add copy here.
// Metadata is READ FROM content/copy.ts (Prompt 3). Never hardcode a title or a
// description in a route file, and never let a title.template in layout.tsx append the
// brand as well — a sibling shipped every subpage with the brand name twice and only an
// HTTP check caught it. Verified over HTTP, not by reading this file.
import type { Metadata } from 'next';
import { copy } from '@/content/copy';
import { SITE_URL, business } from '@/lib/business';
import PageBanner from '@/components/sections/PageBanner';
import ContactMain from '@/components/sections/ContactMain';
import ContactMap from '@/components/sections/ContactMap';

const page = copy.routes['/contact'];
const banner = page.sections.find((s) => s.id === 'contact-banner')!;
const ogImage = `${SITE_URL}/placeholders/contact-banner-image.svg`;

export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: page.meta.title,
    description: page.meta.description,
    url: '/contact',
    siteName: business.name,
    type: 'website',
    images: [{ url: ogImage }],
  },
  twitter: {
    card: 'summary_large_image',
    title: page.meta.title,
    description: page.meta.description,
    images: [ogImage],
  },
};

export default function ContactPage() {
  return (
    <main id="main" data-route="/contact">
      <PageBanner
        id="contact-banner"
        heading={banner.heading!}
        subheading={banner.subheading}
        image="/placeholders/contact-banner-image.svg"
      />
      <ContactMain />
      <ContactMap />
    </main>
  );
}
