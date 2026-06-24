'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/store/cartStore';
import { formatARS } from '@/lib/format';
import type { CartLine } from '@/types/menu';

interface CartItemProps {
  line: CartLine;
}

export function CartItem({ line }: CartItemProps) {
  const inc = useCart((s) => s.inc);
  const dec = useCart((s) => s.dec);
  const remove = useCart((s) => s.remove);

  return (
    <li className="flex items-center gap-3 py-3">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white/5">
        {line.dish.image ? (
          <Image
            src={line.dish.image}
            alt={line.dish.name}
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl text-text-muted">
            <span aria-hidden="true">🥘</span>
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-text-primary">
          {line.dish.name}
        </p>
        <p className="text-xs text-text-muted">
          {formatARS(line.dish.price)} c/u
        </p>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => dec(line.dish.id)}
          aria-label={`Quitar una unidad de ${line.dish.name}`}
          className="
            inline-flex h-8 w-8 items-center justify-center rounded-full
            border border-border-subtle text-text-secondary
            transition-colors hover:bg-surface-elevated hover:text-text-primary
            active:scale-90
          "
        >
          <Minus className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        <span className="min-w-6 text-center text-sm font-semibold text-text-primary tabular-nums">
          {line.qty}
        </span>
        <button
          type="button"
          onClick={() => inc(line.dish.id)}
          aria-label={`Agregar una unidad de ${line.dish.name}`}
          className="
            inline-flex h-8 w-8 items-center justify-center rounded-full
            border border-border-subtle text-text-secondary
            transition-colors hover:bg-surface-elevated hover:text-text-primary
            active:scale-90
          "
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      <span className="w-20 text-right text-sm font-semibold tabular-nums text-text-primary">
        {formatARS(line.dish.price * line.qty)}
      </span>

      <button
        type="button"
        onClick={() => remove(line.dish.id)}
        aria-label={`Eliminar ${line.dish.name} del carrito`}
        className="
          inline-flex h-8 w-8 items-center justify-center rounded-full
          text-text-muted transition-colors
          hover:bg-danger/15 hover:text-danger
          active:scale-90
        "
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </button>
    </li>
  );
}
