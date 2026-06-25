import { getMenu } from '@/lib/menu';
import { CategoryBlock } from './CategoryBlock';
import { CategoryTabs } from './CategoryTabs';
import { MenuDateBadge } from './MenuDateBadge';
import { MenuSkeleton } from './MenuSkeleton';

export async function MenuSection() {
  const menu = await getMenu();

  return (
    <div id="menu" tabIndex={-1} className="scroll-mt-16 focus:outline-none">
      <div className="mx-auto max-w-5xl px-5 pt-8">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-display text-3xl font-semibold text-text-primary sm:text-4xl">
            Menú del día
          </h2>
          <MenuDateBadge />
        </div>
      </div>
      <CategoryTabs categories={menu} />
      <div className="mx-auto max-w-5xl space-y-12 px-5 py-8 sm:space-y-14 sm:py-10">
        {menu.map((category) => (
          <CategoryBlock key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}

export function MenuSectionFallback() {
  return (
    <div id="menu" tabIndex={-1} className="scroll-mt-16 focus:outline-none">
      <div className="mx-auto max-w-5xl px-5 pt-8">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-display text-3xl font-semibold text-text-primary sm:text-4xl">
            Menú del día
          </h2>
          <MenuDateBadge />
        </div>
      </div>
      <MenuSkeleton />
    </div>
  );
}
