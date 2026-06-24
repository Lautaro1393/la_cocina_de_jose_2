import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';

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

export const metadata: Metadata = {
  title: 'La Cocina de José — Comida casera con sabor a casa',
  description:
    'Hacé tu pedido en 3 clics y te lo llevamos al mostrador. Milanesas, pizzas, pastas y todo lo que se cocina en casa de José.',
  applicationName: 'La Cocina de José',
  authors: [{ name: 'La Cocina de José' }],
  openGraph: {
    title: 'La Cocina de José',
    description: 'Pedí tu comida por WhatsApp en 3 clics.',
    locale: 'es_AR',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f0a08',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
