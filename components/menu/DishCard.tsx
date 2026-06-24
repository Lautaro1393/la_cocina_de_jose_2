'use client';

import Image from 'next/image';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PriceTag } from '@/components/ui/PriceTag';
import { useCart } from '@/store/cartStore';
import type { Dish } from '@/types/menu';

interface DishCardProps {
  dish: Dish;
}

export function DishCard({ dish }: DishCardProps) {
  const add = useCart((s) => s.add);

  return (
    <article
      className="
        group flex flex-col overflow-hidden rounded-2xl
        glass
        transition-all duration-300
        hover:-translate-y-0.5 hover:bg-surface-elevated
      "
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/5">
        {dish.image ? (
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-5xl text-text-muted">
            <span aria-hidden="true">🥘</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <h3 className="text-display text-lg font-semibold leading-tight text-text-primary">
          {dish.name}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-text-secondary">
          {dish.description}
        </p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <PriceTag value={dish.price} size="md" />
          <Button
            variant="icon"
            onClick={() => add(dish)}
            aria-label={`Agregar ${dish.name} al carrito`}
            className="bg-accent text-text-primary hover:bg-accent-hover"
          >
            <Plus className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </article>
  );
}
