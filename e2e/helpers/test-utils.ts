import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

const HEADER_CART_LABEL = /^Carrito(, \d+ \w+)?( vacío)?$/;

export async function openCart(page: Page) {
  await page.getByRole('button', { name: HEADER_CART_LABEL }).click();
  await expect(
    page.getByRole('dialog', { name: /Carrito de pedido/i }),
  ).toBeVisible();
}

export async function closeCart(page: Page) {
  await page.getByRole('button', { name: /Cerrar carrito/i }).click();
  // El drawer tiene transition, esperamos a que termine la animacion
  await page.waitForTimeout(500);
  // Cuando esta cerrado, tiene translate-x-full (offscreen).
  // El aria-modal sigue, pero el aside no esta visible.
  await expect(
    page.locator('aside[aria-label="Carrito de pedido"]'),
  ).toHaveClass(/translate-x-full/);
}

export async function addDishToCart(page: Page, dishName: string) {
  await page
    .getByRole('button', {
      name: new RegExp(`^Agregar ${dishName} al carrito$`, 'i'),
    })
    .first()
    .click();
  await page.waitForTimeout(150);
}

export async function expectCartCount(page: Page, expected: number) {
  const btn = page.getByRole('button', { name: HEADER_CART_LABEL });
  const sr = await btn.evaluate(
    (el) => el.querySelector('.sr-only')?.textContent ?? '',
  );
  const m = sr.match(/(\d+)/);
  const actual = m ? parseInt(m[1]!, 10) : 0;
  expect(
    actual,
    `Cart count expected ${expected}, got ${actual}. sr-only: "${sr}"`,
  ).toBe(expected);
}
