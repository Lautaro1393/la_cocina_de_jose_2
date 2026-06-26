import { test, expect } from '@playwright/test';
import { addDishToCart, openCart } from './helpers/test-utils';

test.describe('Checkout → WhatsApp', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await addDishToCart(page, 'Lomo al verdeo');
    await openCart(page);
  });

  test('el drawer tiene el botón "Finalizar pedido"', async ({ page }) => {
    const dialog = page.locator('aside[aria-label="Carrito de pedido"]');
    await expect(
      dialog.getByRole('button', { name: /Finalizar pedido/i }),
    ).toBeVisible();
  });

  test('avanzar al checkout muestra el form de datos', async ({ page }) => {
    const dialog = page.locator('aside[aria-label="Carrito de pedido"]');
    await dialog.getByRole('button', { name: /Finalizar pedido/i }).click();

    await expect(
      page.getByRole('heading', { name: /Casi listo/i }),
    ).toBeVisible();
    await expect(page.getByLabel(/Tu nombre/i)).toBeVisible();
    await expect(
      page.getByRole('button', { name: /Enviar pedido por WhatsApp/i }),
    ).toBeVisible();
  });

  test('submit con nombre vacío muestra error', async ({ page }) => {
    const dialog = page.locator('aside[aria-label="Carrito de pedido"]');
    await dialog.getByRole('button', { name: /Finalizar pedido/i }).click();

    await page.getByRole('button', { name: /Enviar pedido por WhatsApp/i }).click();

    await expect(page.getByText(/Decinos tu nombre/i)).toBeVisible();
  });

  test('submit completo abre WhatsApp con el número correcto y el mensaje pre-armado', async ({
    page,
    context,
  }) => {
    const [newPage] = await Promise.all([
      context.waitForEvent('page', { timeout: 10_000 }),
      (async () => {
        const dialog = page.locator('aside[aria-label="Carrito de pedido"]');
        await dialog.getByRole('button', { name: /Finalizar pedido/i }).click();
        await page.getByLabel(/Tu nombre/i).fill('Lautaro Test');
        await page
          .getByRole('button', { name: /Enviar pedido por WhatsApp/i })
          .click();
      })(),
    ]);

    const url = newPage.url();
    expect(url).toMatch(/wa\.me|whatsapp\.com/);
    expect(url).toMatch(/phone=5491169146371/);

    const u = new URL(url);
    const text = decodeURIComponent(u.searchParams.get('text') ?? '');
    expect(text).toContain('Lautaro Test');
    expect(text).toContain('Lomo al verdeo');
    expect(text).toContain('Total:');
    expect(text).toContain('Pago en Efectivo');
  });

  test('cambiar método de pago refleja en el mensaje', async ({ page, context }) => {
    const [newPage] = await Promise.all([
      context.waitForEvent('page', { timeout: 10_000 }),
      (async () => {
        const dialog = page.locator('aside[aria-label="Carrito de pedido"]');
        await dialog.getByRole('button', { name: /Finalizar pedido/i }).click();
        await page.getByLabel(/Tu nombre/i).fill('Test');
        await page.getByLabel(/Método de pago/i).selectOption('Transferencia');
        await page
          .getByRole('button', { name: /Enviar pedido por WhatsApp/i })
          .click();
      })(),
    ]);

    const text = decodeURIComponent(
      new URL(newPage.url()).searchParams.get('text') ?? '',
    );
    expect(text).toContain('Pago en Transferencia');
  });

  test('las notas se incluyen en el mensaje', async ({ page, context }) => {
    const [newPage] = await Promise.all([
      context.waitForEvent('page', { timeout: 10_000 }),
      (async () => {
        const dialog = page.locator('aside[aria-label="Carrito de pedido"]');
        await dialog.getByRole('button', { name: /Finalizar pedido/i }).click();
        await page.getByLabel(/Tu nombre/i).fill('Test');
        await page
          .getByLabel(/Aclaraciones/i)
          .fill('Sin sal por favor');
        await page
          .getByRole('button', { name: /Enviar pedido por WhatsApp/i })
          .click();
      })(),
    ]);

    const text = decodeURIComponent(
      new URL(newPage.url()).searchParams.get('text') ?? '',
    );
    expect(text).toContain('Sin sal por favor');
    expect(text).toContain('Aclaraciones:');
  });
});
