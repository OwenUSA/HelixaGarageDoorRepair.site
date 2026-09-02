// ROUTE STUB — content lands in Prompt 6+7. Do not add copy here.
// Metadata is READ FROM content/copy.ts (Prompt 3). Never hardcode a title or a
// description in a route file, and never let a title.template in layout.tsx append the
// brand as well — a sibling shipped every subpage with the brand name twice and only an
// HTTP check caught it. Verified over HTTP, not by reading this file.
import type { Metadata } from 'next';
import { copy } from '@/content/copy';

const page = copy.routes['/'];

export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
};

export default function HomePage() {
  return <main id="main" data-route="/" />;
}
