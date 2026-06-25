/**
 * Migra el menu de lib/menu-fallback.ts a Sanity.
 *
 * - Crea/actualiza 5 documentos category (uno por categoria)
 * - Sube las 31 imagenes WebP a Sanity Assets
 * - Crea/actualiza 31 documentos dish con referencia a su categoria
 *
 * Idempotente: si lo corres dos veces, no duplica nada.
 *
 * Uso:
 *   pnpm tsx scripts/migrate-menu.ts
 */

import { readFile } from 'node:fs/promises';
import { join, basename } from 'node:path';
import { createClient, type SanityClient } from '@sanity/client';
import { fallbackMenu } from '../lib/menu-fallback';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-12-01';

if (!projectId || !dataset || !token) {
  console.error(
    '✗ Faltan variables de entorno. Asegurate de tener en .env.local:\n' +
      '  NEXT_PUBLIC_SANITY_PROJECT_ID\n' +
      '  NEXT_PUBLIC_SANITY_DATASET\n' +
      '  SANITY_API_WRITE_TOKEN',
  );
  process.exit(1);
}

const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const PUBLIC_DIR = join(process.cwd(), 'public');

function readImageAsBuffer(path: string): Promise<Buffer> {
  return readFile(path);
}

async function ensureCategory(
  category: (typeof fallbackMenu)[number],
  order: number,
) {
  const id = `category-${category.id}`;
  const doc = {
    _id: id,
    _type: 'category',
    title: category.title,
    slug: { _type: 'slug', current: category.id },
    order,
  };
  await client.createOrReplace(doc);
  return id;
}

async function ensureDish(
  dish: (typeof fallbackMenu)[number]['dishes'][number],
  order: number,
  categoryRef: string,
) {
  const docId = `dish-${dish.id}`;

  const existing = await client.fetch<{ image?: { asset?: { _ref: string } } } | null>(
    `*[_type == "dish" && _id == $id][0]{ image }`,
    { id: docId },
  );

  let imageRef: string;
  if (existing?.image?.asset?._ref) {
    imageRef = existing.image.asset._ref;
    console.log(`  ↻ dish "${dish.name}" ya tiene imagen, conservo la asset ref`);
  } else {
    if (!dish.image) {
      throw new Error(`Plato "${dish.name}" sin imagen, abortando`);
    }
    const localPath = join(PUBLIC_DIR, dish.image);
    const buffer = await readImageAsBuffer(localPath);
    const filename = basename(dish.image);
    const asset = await client.assets.upload('image', buffer, {
      filename,
      contentType: 'image/webp',
    });
    imageRef = asset._id;
    console.log(`  ↑ upload ${filename} (${(buffer.length / 1024).toFixed(0)} KB)`);
  }

  await client.createOrReplace({
    _id: docId,
    _type: 'dish',
    name: dish.name,
    description: dish.description,
    price: dish.price,
    available: dish.available,
    order,
    image: {
      _type: 'image',
      asset: { _type: 'reference', _ref: imageRef },
      alt: dish.name,
    },
    category: { _type: 'reference', _ref: categoryRef },
  });
  console.log(`  ✓ dish "${dish.name}" ($ ${dish.price})`);
}

async function main() {
  console.log(`→ Conectando a Sanity (${projectId}/${dataset})...`);
  console.log(`→ ${fallbackMenu.length} categorias, ${fallbackMenu.reduce((acc, c) => acc + c.dishes.length, 0)} platos\n`);

  for (let i = 0; i < fallbackMenu.length; i++) {
    const category = fallbackMenu[i]!;
    console.log(`[${i + 1}/${fallbackMenu.length}] ${category.title}`);
    const categoryRef = await ensureCategory(category, i);
    console.log(`  ✓ category "${category.title}" (${categoryRef})`);

    for (let j = 0; j < category.dishes.length; j++) {
      const dish = category.dishes[j]!;
      await ensureDish(dish, j, categoryRef);
    }
    console.log('');
  }

  console.log('✓ Migracion completa.');
  console.log(`→ Abrí https://${projectId}.sanity.studio/ para ver el contenido.`);
}

main().catch((err) => {
  console.error('✗ Error en la migracion:', err);
  process.exit(1);
});
