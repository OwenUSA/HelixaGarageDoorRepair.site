// BusinessMap — shared shell component, owned by the lead (A-6). Frozen after this prompt.
// D-07: embedded by COORDINATES only, never the fictional address string -- the address is
// never handed to a geocoder. D-08: required on home (zoom ~13) and /contact (zoom ~15).
// Fixed aspect-ratio wrapper so a slow iframe load cannot shift layout; loading="lazy" and
// an explicit title, both per D-08.
import { mapEmbedSrc, directionsHref, business } from '@/lib/business';

export default function BusinessMap({
  zoom,
  aspect = '16 / 9',
  className = '',
}: {
  zoom: number;
  aspect?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div
        className="w-full overflow-hidden rounded-sm border"
        style={{ aspectRatio: aspect, borderColor: 'var(--color-border)', borderRadius: 'var(--radius-sm)' }}
      >
        <iframe
          src={mapEmbedSrc(zoom)}
          title={`Map showing the approximate location of ${business.name}`}
          loading="lazy"
          className="h-full w-full border-0"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a href={directionsHref} className="mt-2 flex min-h-11 items-center text-sm font-bold underline" style={{ color: 'var(--color-accent-deep)' }}>
        Get directions
      </a>
    </div>
  );
}
