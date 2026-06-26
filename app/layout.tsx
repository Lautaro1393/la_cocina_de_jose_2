import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { DrawerInertController } from '@/components/cart/DrawerInertController';
import { Footer } from '@/components/layout/Footer';
import { buildFaqJsonLd, buildRestaurantJsonLd, getSiteUrl } from '@/lib/seo';
import { RESTAURANT } from '@/lib/constants';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${RESTAURANT.name} — Comida casera con sabor a casa`,
    template: `%s | ${RESTAURANT.name}`,
  },
  description:
    'Pedí el menú del día en 3 clics y te lo acercamos al mostrador. Milanesas, pizzas, pastas y todo lo que se cocina en casa de José.',
  applicationName: RESTAURANT.name,
  authors: [{ name: RESTAURANT.name }],
  generator: 'Next.js',
  keywords: [
    'comida casera',
    'restaurante',
    'milanesas',
    'pizzas',
    'pastas',
    'menú del día',
    'La Cocina de José',
  ],
  alternates: {
    canonical: '/',
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: false,
  },
  openGraph: {
    title: `${RESTAURANT.name} — Comida casera con sabor a casa`,
    description:
      'Pedí tu comida por WhatsApp en 3 clics. Milanesas, pizzas, pastas y guarniciones.',
    url: SITE_URL,
    siteName: RESTAURANT.name,
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: `${RESTAURANT.name} — Comida casera con sabor a casa`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${RESTAURANT.name} — Comida casera con sabor a casa`,
    description:
      'Pedí tu comida por WhatsApp en 3 clics. Milanesas, pizzas, pastas y guarniciones.',
    images: ['/api/og'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fdf6ec' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0a08' },
  ],
};

const restaurantJsonLd = buildRestaurantJsonLd();
const faqJsonLd = buildFaqJsonLd();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="antialiased">
        <a
          href="#menu"
          className="
            sr-only-focusable
            fixed left-4 top-4 z-[100]
            rounded-full bg-accent px-5 py-2.5
            text-sm font-semibold text-text-primary
            shadow-[0_8px_24px_rgba(177,66,47,0.35)]
            focus:outline-none focus-visible:ring-2 focus-visible:ring-text-primary
            focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base
          "
        >
          Saltar al menú
        </a>
        {children}
        <Footer />
        <DrawerInertController />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(restaurantJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </body>
    </html>
  );
}
