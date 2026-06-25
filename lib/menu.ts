import { unstable_cache as cache } from 'next/cache';
import { sanity, urlFor } from './sanity';
import { fallbackMenu } from './menu-fallback';
import type { Category } from '@/types/menu';

interface SanityDish {
  _id: string;
  name: string;
  description?: string;
  price: number;
  image: { asset: { _ref: string } };
  available: boolean;
}

interface SanityCategory {
  _id: string;
  title: string;
  /** Alias GROQ: `"slug":slug.current` aplana el slug object a string */
  slug: string;
  order: number;
  dishes: SanityDish[];
}

const MENU_QUERY = `*[_type == "category"] | order(order asc) {
  _id,
  title,
  "slug": slug.current,
  order,
  "dishes": *[_type == "dish" && references(^._id) && available == true] | order(order asc) {
    _id, name, description, price, available, image
  }
}`;

function toCategories(raw: SanityCategory[]): Category[] {
  return raw.map((cat) => ({
    id: cat.slug as Category['id'],
    title: cat.title,
    dishes: (cat.dishes ?? []).map((dish) => ({
      id: dish._id,
      name: dish.name,
      description: dish.description ?? '',
      price: dish.price,
      image: urlFor(dish.image).width(640).url(),
      available: dish.available,
    })),
  }));
}

/**
 * Cached por 1 hora. Si Sanity falla, devuelve el fallback local
 * para que la pagina nunca se rompa.
 */
export const getMenu = cache(
  async (): Promise<Category[]> => {
    try {
      const raw = await sanity.fetch<SanityCategory[]>(MENU_QUERY);
      if (!raw || raw.length === 0) {
        console.warn('[menu] Sanity devolvio vacio, usando fallback');
        return fallbackMenu;
      }
      return toCategories(raw);
    } catch (err) {
      console.error('[menu] Fallo Sanity, usando fallback:', err);
      return fallbackMenu;
    }
  },
  ['menu'],
  { revalidate: 3600, tags: ['menu'] },
);

export function getCategoryById(
  categories: Category[],
  id: string,
): Category | undefined {
  return categories.find((c) => c.id === id);
}
