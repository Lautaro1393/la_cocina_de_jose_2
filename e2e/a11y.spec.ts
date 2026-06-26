import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accesibilidad', () => {
  test('la home no tiene violaciones de axe (wcag2a, wcag2aa)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Esperar a que los dish cards con imagenes terminen de renderizar
    await page.waitForTimeout(800);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    if (results.violations.length > 0) {
      console.log(
        'Violaciones:',
        JSON.stringify(
          results.violations.map((v) => ({
            id: v.id,
            impact: v.impact,
            help: v.help,
            nodes: v.nodes.length,
          })),
          null,
          2,
        ),
      );
    }
    expect(results.violations).toEqual([]);
  });

  test('el skip link salta al menú con teclado', async ({ page }) => {
    await page.goto('/');

    await page.keyboard.press('Tab');
    const skipLink = page.getByRole('link', { name: /Saltar al menú/i });
    await expect(skipLink).toBeFocused();

    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);

    const url = page.url();
    expect(url).toMatch(/#menu$/);
  });

  test('el footer no genera violaciones de axe', async ({ page }) => {
    await page.goto('/');
    await page.locator('footer').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const results = await new AxeBuilder({ page })
      .include('footer')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('el cart drawer tiene role=dialog y aria-modal', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    const cartBtn = page.getByRole('button', { name: /^Carrito(, \d+ \w+)?( vacío)?$/ });
    await cartBtn.click();

    const dialog = page.getByRole('dialog', { name: /Carrito de pedido/i });
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  test('el cart drawer no tiene violaciones de axe', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.getByRole('button', { name: /^Carrito(, \d+ \w+)?( vacío)?$/ }).click();
    await page.waitForTimeout(500);

    const results = await new AxeBuilder({ page })
      .include('[role="dialog"]')
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    if (results.violations.length > 0) {
      console.log('Drawer violations:', JSON.stringify(results.violations, null, 2));
    }
    expect(results.violations).toEqual([]);
  });
});
