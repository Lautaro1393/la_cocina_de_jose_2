'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, RotateCw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-5">
      <div className="glass max-w-md rounded-2xl p-8 text-center">
        <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-danger/15 text-danger">
          <AlertTriangle className="h-6 w-6" aria-hidden="true" />
        </div>
        <h1 className="text-display text-2xl font-semibold text-text-primary">
          Algo se rompió en la cocina
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          Tuvimos un problema para cargar esta página. Probá de nuevo o volvé al menú.
        </p>
        {error.digest && (
          <p className="mt-3 text-[11px] text-text-muted">
            Código: {error.digest}
          </p>
        )}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button variant="outline" onClick={reset}>
            <RotateCw className="h-4 w-4" aria-hidden="true" />
            Reintentar
          </Button>
          <Link href="/">
            <Button variant="primary">Volver al menú</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
