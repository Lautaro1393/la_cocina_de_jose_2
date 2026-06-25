import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { RESTAURANT } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section
      id="hero"
      className="
        relative isolate flex min-h-[85vh] w-full items-end
        overflow-hidden
        sm:min-h-[78vh] md:min-h-[70vh]
      "
    >
      <Image
        src="/fotos/la_cocina_de_jose/pixlr-image-generator-290300b4-7034-4daf-8601-011a7c7d0133.webp"
        alt="Plato estrella de La Cocina de José"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="
          absolute inset-0 -z-10
          bg-gradient-to-b
          from-black/30 via-black/55 to-black/85
        "
      />

      <div className="mx-auto w-full max-w-5xl px-5 pb-12 pt-24 sm:pb-16 md:pb-20">
        <div className="max-w-2xl animate-fade-in">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent/90 sm:text-base">
            {RESTAURANT.tagline}
          </p>
          <h1 className="text-display text-5xl font-semibold leading-[1.05] text-text-primary sm:text-6xl md:text-7xl">
            {RESTAURANT.name}
          </h1>
          <p className="mt-5 max-w-md text-base text-text-secondary sm:text-lg">
            Pedí el menú del día en 3 clics y te lo acercamos al mostrador.
            Sin registros, sin apps, sin vueltas.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#menu">
              <Button variant="primary" className="px-7">
                Ver menú de hoy
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </Button>
            </a>
            <a
              href={`https://wa.me/5491169146371?text=${encodeURIComponent('Hola, quiero hacer una consulta.')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">Consultar por WhatsApp</Button>
            </a>
          </div>
        </div>
      </div>

      <a
        href="#menu"
        aria-label="Ir al menú"
        className="
          absolute bottom-4 left-1/2 hidden -translate-x-1/2
          text-text-muted transition-colors hover:text-text-secondary
          sm:flex
        "
      >
        <ChevronDown className="h-6 w-6 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
