'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/store/cartStore';
import { buildWhatsAppUrl } from '@/lib/format';
import type { PaymentMethod } from '@/types/menu';

export function CheckoutForm() {
  const items = useCart((s) => s.items);
  const [name, setName] = useState('');
  const [payment, setPayment] = useState<PaymentMethod>('Efectivo');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError('Decinos tu nombre para identificar el pedido.');
      return;
    }
    setError(null);
    const url = buildWhatsAppUrl(items, {
      name: name.trim(),
      payment,
      notes: notes.trim() || undefined,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      aria-label="Datos para enviar el pedido"
    >
      <div className="space-y-1.5">
        <label
          htmlFor="checkout-name"
          className="text-xs font-medium uppercase tracking-wider text-text-muted"
        >
          Tu nombre
        </label>
        <input
          id="checkout-name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Lautaro"
          className="
            w-full rounded-xl border border-border-subtle bg-white/5 px-4 py-3
            text-base text-text-primary placeholder:text-text-muted
            transition-colors
            focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40
          "
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="checkout-payment"
          className="text-xs font-medium uppercase tracking-wider text-text-muted"
        >
          Método de pago
        </label>
        <select
          id="checkout-payment"
          value={payment}
          onChange={(e) => setPayment(e.target.value as PaymentMethod)}
          className="
            w-full appearance-none rounded-xl border border-border-subtle bg-white/5 px-4 py-3
            text-base text-text-primary
            transition-colors
            focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40
          "
        >
          <option value="Efectivo">Efectivo</option>
          <option value="Transferencia">Transferencia</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="checkout-notes"
          className="text-xs font-medium uppercase tracking-wider text-text-muted"
        >
          Aclaraciones (opcional)
        </label>
        <textarea
          id="checkout-notes"
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ej: sin cebolla, retirar a las 21 hs…"
          className="
            w-full resize-none rounded-xl border border-border-subtle bg-white/5 px-4 py-3
            text-base text-text-primary placeholder:text-text-muted
            transition-colors
            focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40
          "
        />
      </div>

      {error && (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        className="h-12 w-full text-base"
        disabled={items.length === 0}
      >
        <MessageCircle className="h-4 w-4" />
        Enviar pedido por WhatsApp
      </Button>
    </form>
  );
}
