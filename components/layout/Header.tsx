import Link from 'next/link';
import { UtensilsCrossed } from 'lucide-react';
import { CartButton } from '@/components/cart/CartButton';
import { RESTAURANT } from '@/lib/constants';

export function Header() {
  return (
    <header
      className="
        sticky top-0 z-40 w-full
        glass border-b border-border-subtle
      "
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 text-accent">
            <UtensilsCrossed className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-display text-lg font-semibold tracking-tight">
            {RESTAURANT.name}
          </span>
        </Link>
        <CartButton />
      </div>
    </header>
  );
}
