import { DishCard } from './DishCard';
import type { Category } from '@/types/menu';

interface CategoryBlockProps {
  category: Category;
}

export function CategoryBlock({ category }: CategoryBlockProps) {
  return (
    <section
      id={`cat-${category.id}`}
      className="scroll-mt-32"
      aria-labelledby={`cat-${category.id}-title`}
    >
      <div className="mb-4 flex items-end justify-between gap-3">
        <h2
          id={`cat-${category.id}-title`}
          className="text-display text-2xl font-semibold text-text-primary sm:text-3xl"
        >
          {category.title}
        </h2>
        <span className="text-xs text-text-muted">
          {category.dishes.length} {category.dishes.length === 1 ? 'plato' : 'platos'}
        </span>
      </div>
      <div
        className="
          grid grid-cols-1 gap-4
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {category.dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </section>
  );
}
