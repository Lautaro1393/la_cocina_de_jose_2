'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { menu } from '@/lib/menu';

export function CategoryTabs() {
  const [activeId, setActiveId] = useState<string>(menu[0]?.id ?? '');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections = menu
      .map((c) => document.getElementById(`cat-${c.id}`))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          )[0];
        if (visible?.target.id) {
          setActiveId(visible.target.id.replace('cat-', ''));
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((s) => observerRef.current?.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(`cat-${id}`);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 130;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div
      className="
        sticky top-16 z-30 w-full
        glass border-b border-border-subtle
        backdrop-blur-md
      "
    >
      <nav
        aria-label="Categorías del menú"
        className="no-scrollbar mx-auto flex max-w-5xl gap-2 overflow-x-auto px-5 py-3"
      >
        {menu.map((c) => {
          const active = activeId === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => handleClick(c.id)}
              className={clsx(
                'shrink-0 rounded-full px-4 py-2 text-sm font-medium',
                'transition-all duration-200 active:scale-[0.96]',
                active
                  ? 'bg-accent text-text-primary shadow-[0_4px_16px_rgba(177,66,47,0.35)]'
                  : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary',
              )}
              aria-current={active ? 'true' : undefined}
            >
              {c.title}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
