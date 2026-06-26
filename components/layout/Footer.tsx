import { MapPin, MessageCircle, Clock, UtensilsCrossed } from 'lucide-react';
import { MapEmbed } from './MapEmbed';
import { RESTAURANT } from '@/lib/constants';

export function Footer() {
  const whatsappHref = `https://wa.me/${RESTAURANT.whatsappRaw}`;
  const mapTitle = `Ubicación de ${RESTAURANT.name} en Google Maps`;

  return (
    <footer
      className="mt-16 border-t border-border-subtle bg-surface backdrop-blur-md"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Información del local
      </h2>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent"
              >
                <UtensilsCrossed className="h-4 w-4" strokeWidth={2.25} />
              </span>
              <span className="font-display text-xl font-semibold text-text-primary">
                {RESTAURANT.name}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-text-secondary">
              {RESTAURANT.tagline}
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                <span>Dirección</span>
              </div>
              <address className="not-italic text-sm leading-relaxed text-text-secondary">
                {RESTAURANT.address.line1}
                <br />
                {RESTAURANT.address.line2}
                <br />
                {RESTAURANT.address.locality}
              </address>
              <a
                href={RESTAURANT.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-hover focus:outline-none focus-visible:underline focus-visible:underline-offset-4 focus-visible:decoration-accent"
              >
                Cómo llegar
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                <MessageCircle
                  className="h-4 w-4 text-accent"
                  aria-hidden="true"
                />
                <span>Pedidos por WhatsApp</span>
              </div>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-text-primary transition-colors hover:text-accent focus:outline-none focus-visible:underline focus-visible:underline-offset-4 focus-visible:decoration-accent"
              >
                {RESTAURANT.whatsappDisplay}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
              <Clock className="h-4 w-4 text-accent" aria-hidden="true" />
              <span>Horarios de atención</span>
            </div>
            <ul
              aria-label="Horarios de atención"
              className="space-y-1.5 text-sm text-text-secondary"
            >
              {RESTAURANT.hours.map((entry) => (
                <li
                  key={entry.day}
                  className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <span className="text-text-secondary">{entry.day}</span>
                  <span className="font-medium text-text-primary">
                    {entry.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 sm:mt-12">
          <MapEmbed
            src={RESTAURANT.mapEmbedUrl}
            title={mapTitle}
            mapsUrl={RESTAURANT.googleMapsUrl}
          />
          <p className="mt-2 text-xs text-text-muted">
            {RESTAURANT.address.full}
          </p>
        </div>
      </div>

      <div className="border-t border-border-subtle">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-text-muted sm:flex-row sm:px-6">
          <p>
            © {new Date().getFullYear()} {RESTAURANT.name}. Hecho con ❤ en
            Buenos Aires.
          </p>
          {RESTAURANT.studioUrl ? (
            <a
              href={RESTAURANT.studioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-text-secondary transition-colors hover:text-text-primary focus:outline-none focus-visible:underline focus-visible:underline-offset-4"
            >
              Administrar menú
              <span aria-hidden="true">→</span>
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
