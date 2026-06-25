import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/layout/Hero';
import {
  MenuSection,
  MenuSectionFallback,
} from '@/components/menu/MenuSection';
import { CartDrawer } from '@/components/cart/CartDrawer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pb-20">
        <Hero />
        <Suspense fallback={<MenuSectionFallback />}>
          <MenuSection />
        </Suspense>
      </main>
      <CartDrawer />
    </>
  );
}
