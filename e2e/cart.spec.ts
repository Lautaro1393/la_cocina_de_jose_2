import { test, expect } from '@playwright/test';
import {
  addDishToCart,
  openCart,
  closeCart,
  expectCartCount,
} from './helpers/test-utils';

test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('agregar 1 plato aumenta el badge a 1', async ({ page }) => {
    await addDishToCart(page, 'Lomo al verdeo');
    await expectCartCount(page, 1);
  });

  test('agregar 2 platos distintos suma 2 en el badge', async ({ page }) => {
    await addDishToCart(page, 'Lomo al verdeo');
    await addDishToCart(page, 'Muzzarella');
    await expectCartCount(page, 2);
  });

  test('agregar el mismo plato 3 veces suma 3 en el badge', async ({ page }) => {
    await addDishToCart(page, 'Muzzarella');
    await addDishToCart(page, 'Muzzarella');
    await addDishToCart(page, 'Muzzarella');
    await expectCartCount(page, 3);
  });

  test('abrir el drawer muestra los items agregados', async ({ page }) => {
    await addDishToCart(page, 'Lomo al verdeo');
    await addDishToCart(page, 'Muzzarella');
    await openCart(page);

    const dialog = page.getByRole('dialog', { name: /Carrito de pedido/i });
    await expect(dialog).toContainText('Lomo al verdeo');
    await expect(dialog).toContainText('Muzzarella');
  });

  test('el botón + del item aumenta la cantidad', async ({ page }) => {
    await addDishToCart(page, 'Lomo al verdeo');
    await openCart(page);

    const plus = page.getByRole('button', {
      name: /Agregar una unidad de Lomo al verdeo/i,
    });
    await plus.click();
    await expectCartCount(page, 2);
  });

  test('el botón − del item disminuye la cantidad', async ({ page }) => {
    await addDishToCart(page, 'Lomo al verdeo');
    await addDishToCart(page, 'Lomo al verdeo');
    await openCart(page);

    const minus = page.getByRole('button', {
      name: /Quitar una unidad de Lomo al verdeo/i,
    });
    await minus.click();
    await expectCartCount(page, 1);
  });

  test('la papelera elimina el item del drawer', async ({ page }) => {
    await addDishToCart(page, 'Lomo al verdeo');
    await addDishToCart(page, 'Muzzarella');
    await openCart(page);

    const remove = page.getByRole('button', {
      name: /Eliminar Lomo al verdeo del carrito/i,
    });
    await remove.click();

    const dialog = page.getByRole('dialog', { name: /Carrito de pedido/i });
    await expect(dialog).not.toContainText('Lomo al verdeo');
    await expect(dialog).toContainText('Muzzarella');
  });

  test('cerrar con Escape esconde el drawer', async ({ page }) => {
    await addDishToCart(page, 'Lomo al verdeo');
    await openCart(page);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
    await expect(
      page.locator('aside[aria-label="Carrito de pedido"]'),
    ).toHaveClass(/translate-x-full/);
  });

  test('cerrar con el botón X esconde el drawer', async ({ page }) => {
    await addDishToCart(page, 'Lomo al verdeo');
    await openCart(page);
    await closeCart(page);
  });
});
