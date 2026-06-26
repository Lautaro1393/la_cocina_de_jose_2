import { test, expect } from '@playwright/test';

test.describe('SEO', () => {
  test('la home tiene los meta tags esenciales', async ({ page }) => {
    await page.goto('/');

    const title = await page.title();
    expect(title).toContain('La Cocina de José');

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute(
      'content',
      /Pedí el menú del día|comida casera/i,
    );

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /\/(|$)/);
  });

  test('Open Graph apunta a la URL y la OG image dinámica', async ({ page }) => {
    await page.goto('/');

    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /La Cocina de José/);

    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute('content', /\/api\/og/);

    const ogType = page.locator('meta[property="og:type"]');
    await expect(ogType).toHaveAttribute('content', 'website');

    const ogLocale = page.locator('meta[property="og:locale"]');
    await expect(ogLocale).toHaveAttribute('content', 'es_AR');
  });

  test('JSON-LD Restaurant tiene los datos del restó', async ({ page }) => {
    await page.goto('/');

    const scripts = await page.locator('script[type="application/ld+json"]').all();
    expect(scripts.length).toBeGreaterThanOrEqual(2);

    const all = await Promise.all(
      scripts.map((s) => s.textContent().then((t) => t ?? '')),
    );
    const restaurant = all
      .map((t) => {
        try {
          return JSON.parse(t);
        } catch {
          return null;
        }
      })
      .find((j) => j?.['@type'] === 'Restaurant');

    expect(restaurant).toBeTruthy();
    expect(restaurant.name).toBe('La Cocina de José');
    expect(restaurant.telephone).toBe('+54 11 6914-6371');
    expect(restaurant.address.streetAddress).toBe(
      'Av. Brig. Gral. Juan Manuel de Rosas 459',
    );
    expect(restaurant.address.addressCountry).toBe('AR');
    expect(Array.isArray(restaurant.openingHoursSpecification)).toBe(true);
    expect(restaurant.openingHoursSpecification.length).toBeGreaterThan(0);
    expect(restaurant.openingHoursSpecification[0].opens).toMatch(/\d{2}:\d{2}/);
  });

  test('JSON-LD FAQPage tiene preguntas sobre el pedido', async ({ page }) => {
    await page.goto('/');

    const scripts = await page.locator('script[type="application/ld+json"]').all();
    const all = await Promise.all(
      scripts.map((s) => s.textContent().then((t) => t ?? '')),
    );
    const faq = all
      .map((t) => {
        try {
          return JSON.parse(t);
        } catch {
          return null;
        }
      })
      .find((j) => j?.['@type'] === 'FAQPage');

    expect(faq).toBeTruthy();
    expect(Array.isArray(faq.mainEntity)).toBe(true);
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(2);
  });

  test('robots.txt permite el indexado', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.status()).toBe(200);
    const text = await res.text();
    expect(text).toMatch(/User-Agent:\s*\*/i);
    expect(text).toMatch(/Allow:\s*\//i);
  });

  test('sitemap.xml referencia la home', async ({ request }) => {
    const res = await request.get('/sitemap.xml');
    expect(res.status()).toBe(200);
    const text = await res.text();
    expect(text).toMatch(/<urlset/);
    expect(text).toContain('la-cocina-de-jose');
  });

  test('la OG image dinámica devuelve PNG/OG válido', async ({ request }) => {
    const res = await request.get('/api/og');
    expect(res.status()).toBe(200);
    const ct = res.headers()['content-type'] ?? '';
    expect(ct).toMatch(/image\/(png|jpeg|webp)/);
  });
});
