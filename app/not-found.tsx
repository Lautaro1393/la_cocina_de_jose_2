import Link from 'next/link';
import { Soup, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-5">
      <div className="glass max-w-md rounded-2xl p-8 text-center">
        <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/20 text-accent">
          <Soup className="h-6 w-6" aria-hidden="true" />
        </div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent/80">
          404
        </p>
        <h1 className="mt-2 text-display text-2xl font-semibold text-text-primary">
          Esta página no está en el menú
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          No encontramos lo que buscabas. Volvé a la carta para ver qué hay hoy.
        </p>
        <div className="mt-6 flex items-center justify-center">
          <Link href="/">
            <Button variant="primary">
              <Home className="h-4 w-4" aria-hidden="true" />
              Ir al menú
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
