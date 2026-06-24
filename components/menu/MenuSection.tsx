import { menu } from '@/lib/menu';
import { CategoryBlock } from './CategoryBlock';
import { CategoryTabs } from './CategoryTabs';

export function MenuSection() {
  return (
    <div id="menu" className="scroll-mt-16">
      <div className="mx-auto max-w-5xl px-5 pt-8">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-display text-3xl font-semibold text-text-primary sm:text-4xl">
            Menú del día
          </h2>
          <span className="text-xs uppercase tracking-wider text-text-muted">
            {new Intl.DateTimeFormat('es-AR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())}
          </span>
        </div>
      </div>
      <CategoryTabs />
      <div className="mx-auto max-w-5xl space-y-12 px-5 py-8 sm:space-y-14 sm:py-10">
        {menu.map((category) => (
          <CategoryBlock key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
