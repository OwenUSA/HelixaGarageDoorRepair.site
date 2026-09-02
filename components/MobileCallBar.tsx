// MobileCallBar — NOVEL, no reference counterpart (docs/sections.md: / | ~ |
// mobile-call-bar | NOVEL). D-04 requires a sticky mobile tel: bar. Shared shell, owned by
// the lead (A-6). Hidden at lg and above, where the header's own call CTA is visible.
import { Phone } from 'lucide-react';
import { business } from '@/lib/business';

export default function MobileCallBar() {
  return (
    <a
      href={business.phoneHref}
      data-section="mobile-call-bar"
      className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center gap-2 py-3 text-base font-bold lg:hidden"
      style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-surface)' }}
    >
      <Phone size={18} aria-hidden="true" />
      Call {business.phone}
    </a>
  );
}
