import { test, expect } from '@playwright/test';

test.describe('Home', () => {
  test('carga el hero con el nombre del restó y los CTAs', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { name: /La Cocina de José/i, level: 1 }),
    ).toBeVisible();

    await expect(
      page.getByRole('link', { name: /Ver menú de hoy/i }),
    ).toBeVisible();

    await expect(
      page.getByRole('link', { name: /Consultar por WhatsApp/i }),
    ).toBeVisible();
  });

  test('muestra el tagline (en el hero) y la descripción principal', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.locator('#hero').getByText(/Comida con sabor a casa/i),
    ).toBeVisible();
    await expect(
      page.locator('#hero').getByText(/menú del día en 3 clics/i),
    ).toBeVisible();
  });

  test('carga sin errores críticos en consola', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const critical = errors.filter(
      (e) =>
        !e.includes('favicon') &&
        !e.includes('404 (Not Found)') &&
        !e.includes('webpack-hmr') &&
        !e.includes('HMR') &&
        !e.toLowerCase().includes('hydration'),
    );
    expect(critical, `Errores en consola: ${critical.join('\n')}`).toEqual([]);
  });
});
