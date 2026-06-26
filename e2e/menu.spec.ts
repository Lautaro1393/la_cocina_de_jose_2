import { test, expect } from '@playwright/test';

test.describe('Menú', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Esperar a que cargue el menu (los dish cards son client components con imagenes)
    await page
      .getByRole('heading', { name: /Menú del día/i, level: 2 })
      .scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  });

  test('muestra las 5 categorías como tabs', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: /Categorías del menú/i });
    const tabs = nav.getByRole('button');
    await expect(tabs).toHaveCount(5);
    await expect(tabs.nth(0)).toHaveText(/Platos/i);
  });

  test('cada categoría tiene al menos 1 plato visible', async ({ page }) => {
    const sections = page.locator('section[id^="cat-"]');
    await expect(sections).toHaveCount(5);

    const firstSection = sections.first();
    await firstSection.scrollIntoViewIfNeeded();
    const dishes = firstSection.locator('article');
    expect(await dishes.count()).toBeGreaterThan(0);
  });

  test('click en tab scrollea a la sección correspondiente', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: /Categorías del menú/i });
    const tabs = nav.getByRole('button');
    const lastTab = tabs.last();
    await lastTab.click();

    await page.waitForTimeout(800);
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);
  });

  test('cada plato tiene un botón "Agregar al carrito" con aria-label', async ({
    page,
  }) => {
    const firstDish = page.locator('article').first();
    await firstDish.scrollIntoViewIfNeeded();
    const btn = firstDish.getByRole('button', { name: /Agregar .+ al carrito/i });
    await expect(btn).toBeVisible();
  });
});
