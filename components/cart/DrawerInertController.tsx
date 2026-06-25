'use client';

import { useEffect } from 'react';
import { useCart } from '@/store/cartStore';

/**
 * Aplica `inert` (y `aria-hidden`) al <main> cuando el carrito está abierto
 * para que los lectores de pantalla y la navegación por teclado no escapen
 * del drawer modal.
 */
export function DrawerInertController() {
  const isOpen = useCart((s) => s.isOpen);

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;
    if (isOpen) {
      main.setAttribute('inert', '');
      main.setAttribute('aria-hidden', 'true');
    } else {
      main.removeAttribute('inert');
      main.removeAttribute('aria-hidden');
    }
    return () => {
      main.removeAttribute('inert');
      main.removeAttribute('aria-hidden');
    };
  }, [isOpen]);

  return null;
}
