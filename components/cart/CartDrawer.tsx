'use client';

import { useEffect, useState } from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PriceTag } from '@/components/ui/PriceTag';
import { useCart } from '@/store/cartStore';
import { CartItem } from './CartItem';
import { CheckoutForm } from './CheckoutForm';
import clsx from 'clsx';

export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const items = useCart((s) => s.items);
  const totalPrice = useCart((s) =>
    s.items.reduce((acc, l) => acc + l.dish.price * l.qty, 0),
  );
  const [view, setView] = useState<'cart' | 'checkout'>('cart');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') close();
      };
      window.addEventListener('keydown', onKey);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', onKey);
      };
    }
    document.body.style.overflow = '';
  }, [isOpen, close, mounted]);

  useEffect(() => {
    if (!isOpen) setView('cart');
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden={!isOpen}
      className={clsx(
        'fixed inset-0 z-50 transition-opacity duration-300',
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <div
        onClick={close}
        aria-hidden="true"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de pedido"
        className={clsx(
          'absolute right-0 top-0 flex h-full w-full flex-col md:max-w-md',
          'glass-elevated border-l border-border-subtle',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <header className="flex shrink-0 items-center justify-between border-b border-border-subtle px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-accent" aria-hidden="true" />
            <h2 className="text-display text-xl font-semibold text-text-primary">
              {view === 'cart' ? 'Tu pedido' : 'Casi listo'}
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar carrito"
            className="
              inline-flex h-9 w-9 items-center justify-center rounded-full
              text-text-secondary transition-colors
              hover:bg-surface-elevated hover:text-text-primary
              active:scale-90
            "
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5">
          {view === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
                  <span className="text-5xl" aria-hidden="true">🥘</span>
                  <p className="text-display text-lg font-medium text-text-primary">
                    Tu carrito está vacío
                  </p>
                  <p className="max-w-xs text-sm text-text-secondary">
                    Sumá platos del menú y los preparamos para retirar en el local.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-border-subtle">
                  {items.map((line) => (
                    <CartItem key={line.dish.id} line={line} />
                  ))}
                </ul>
              )}
            </>
          )}

          {view === 'checkout' && (
            <div className="py-5">
              <CheckoutForm />
            </div>
          )}
        </div>

        {items.length > 0 && view === 'cart' && (
          <footer className="shrink-0 border-t border-border-subtle px-5 py-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm uppercase tracking-wider text-text-muted">
                Total
              </span>
              <PriceTag value={totalPrice} size="lg" />
            </div>
            <Button
              type="button"
              variant="primary"
              className="h-12 w-full text-base"
              onClick={() => setView('checkout')}
            >
              Finalizar pedido
            </Button>
          </footer>
        )}
      </aside>
    </div>
  );
}
