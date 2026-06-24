'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Dish, CartLine } from '@/types/menu';

interface CartState {
  items: CartLine[];
  isOpen: boolean;
  add: (dish: Dish) => void;
  inc: (dishId: string) => void;
  dec: (dishId: string) => void;
  remove: (dishId: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  totalQty: () => number;
  totalPrice: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      add: (dish) =>
        set((s) => {
          const existing = s.items.find((l) => l.dish.id === dish.id);
          if (existing) {
            return {
              items: s.items.map((l) =>
                l.dish.id === dish.id ? { ...l, qty: l.qty + 1 } : l,
              ),
            };
          }
          return { items: [...s.items, { dish, qty: 1 }] };
        }),
      inc: (dishId) =>
        set((s) => ({
          items: s.items.map((l) =>
            l.dish.id === dishId ? { ...l, qty: l.qty + 1 } : l,
          ),
        })),
      dec: (dishId) =>
        set((s) => {
          const line = s.items.find((l) => l.dish.id === dishId);
          if (!line) return s;
          if (line.qty <= 1) {
            return { items: s.items.filter((l) => l.dish.id !== dishId) };
          }
          return {
            items: s.items.map((l) =>
              l.dish.id === dishId ? { ...l, qty: l.qty - 1 } : l,
            ),
          };
        }),
      remove: (dishId) =>
        set((s) => ({
          items: s.items.filter((l) => l.dish.id !== dishId),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      totalQty: () => get().items.reduce((acc, l) => acc + l.qty, 0),
      totalPrice: () =>
        get().items.reduce((acc, l) => acc + l.dish.price * l.qty, 0),
    }),
    {
      name: 'lcdj-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
