// ROUTE STUB — content lands in Prompt 6+7. Do not add copy here.
// Metadata is READ FROM content/copy.ts (Prompt 3). Never hardcode a title or a
// description in a route file, and never let a title.template in layout.tsx append the
// brand as well — a sibling shipped every subpage with the brand name twice and only an
// HTTP check caught it. Verified over HTTP, not by reading this file.
import type { Metadata } from 'next';
import { copy } from '@/content/copy';
import { SITE_URL, business } from '@/lib/business';
import PageBanner from '@/components/sections/PageBanner';
import ServicesIntro from '@/components/sections/ServicesIntro';
import ServicesGrid from '@/components/sections/ServicesGrid';
import ServicesFaq from '@/components/sections/ServicesFaq';
import ServicesCta from '@/components/sections/ServicesCta';

const page = copy.routes['/services'];
const banner = page.sections.find((s) => s.id === 'services-banner')!;
const ogImage = `${SITE_URL}/placeholders/services-banner-image.svg`;

export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
  alternates: { canonical: '/services' },
  openGraph: {
    title: page.meta.title,
    description: page.meta.description,
    url: '/services',
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

export default function ServicesPage() {
  return (
    <main id="main" data-route="/services">
      <PageBanner
        id="services-banner"
        heading={banner.heading!}
        subheading={banner.subheading}
        image="/placeholders/services-banner-image.svg"
      />
      <ServicesIntro />
      <ServicesGrid />
      <ServicesFaq />
      <ServicesCta />
    </main>
  );
}
