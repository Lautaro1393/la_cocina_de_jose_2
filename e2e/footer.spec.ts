import { test, expect } from '@playwright/test';

async function scrollToFooter(page: import('@playwright/test').Page) {
  await page.locator('footer').scrollIntoViewIfNeeded();
  // Asegurar que la sección superior del footer está en el viewport
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    const f = document.querySelector('footer');
    if (f) f.scrollIntoView({ block: 'start', behavior: 'auto' });
  });
  await page.waitForTimeout(300);
}

test.describe('Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await scrollToFooter(page);
  });

  test('muestra los 3 bloques (Identidad, Contacto, Horarios)', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer.getByText(/Dirección/i).first()).toBeVisible();
    await expect(footer.getByText(/Pedidos por WhatsApp/i)).toBeVisible();
    await expect(footer.getByText(/Horarios de atención/i)).toBeVisible();
  });

  test('muestra la dirección real del restó', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer.locator('address')).toContainText(
      /Av\. Brig\. Gral\. Juan Manuel de Rosas 459/i,
    );
    await expect(footer.locator('address')).toContainText(/Lomas del Mirador/i);
  });

  test('muestra el horario correcto', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer.getByText(/Lunes a viernes/i).first()).toBeVisible();
    await expect(footer.getByText(/09:00\s*—\s*15:30/i).first()).toBeVisible();
  });

  test('link Cómo llegar apunta al shortlink de Google Maps', async ({ page }) => {
    const link = page.getByRole('link', { name: /Cómo llegar/i });
    await expect(link).toBeVisible();
    const href = await link.getAttribute('href');
    expect(href).toBe('https://maps.app.goo.gl/p36WtFbdBpv3zMyv9');
  });

  test('link de WhatsApp apunta a wa.me con el número correcto', async ({ page }) => {
    const link = page
      .getByRole('link', { name: /\+54 11 6914-6371/i })
      .first();
    const href = await link.getAttribute('href');
    expect(href).toBe('https://wa.me/5491169146371');
    expect(link).toHaveAttribute('target', '_blank');
  });

  test('iframe del mapa tiene el src y title correctos', async ({ page }) => {
    const iframe = page.locator('footer iframe').first();
    await expect(iframe).toBeVisible();
    const src = await iframe.getAttribute('src');
    expect(src).toContain('google.com/maps');
    expect(src).toContain('output=embed');
    const title = await iframe.getAttribute('title');
    expect(title).toMatch(/Ubicación.*La Cocina de José/);
  });

  test('botón "Abrir en Maps" del iframe apunta al shortlink', async ({ page }) => {
    const btn = page.locator('footer').getByRole('link', { name: /Abrir en Maps/i });
    const href = await btn.getAttribute('href');
    expect(href).toBe('https://maps.app.goo.gl/p36WtFbdBpv3zMyv9');
  });
});
