'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/store/cartStore';
import clsx from 'clsx';

export function CartButton() {
  const totalQty = useCart((s) => s.items.reduce((acc, l) => acc + l.qty, 0));
  const open = useCart((s) => s.open);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (totalQty === 0) return;
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 500);
    return () => clearTimeout(t);
  }, [totalQty]);

  return (
    <button
      type="button"
      onClick={open}
      aria-label={`Carrito con ${totalQty} ${totalQty === 1 ? 'producto' : 'productos'}`}
      className={clsx(
        'relative inline-flex h-11 w-11 items-center justify-center rounded-full',
        'glass text-text-primary',
        'transition-all duration-200 active:scale-[0.94]',
        'hover:bg-surface-elevated',
      )}
    >
      <ShoppingCart className="h-5 w-5" aria-hidden="true" />
      {totalQty > 0 && (
        <span
          className={clsx(
            'absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center',
            'rounded-full bg-accent px-1.5 text-[11px] font-semibold leading-none text-text-primary',
            'ring-2 ring-bg-base',
            pulse && 'animate-pulse-once',
          )}
        >
          {totalQty}
        </span>
      )}
    </button>
  );
}
