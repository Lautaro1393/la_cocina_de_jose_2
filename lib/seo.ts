import { fallbackMenu } from './menu-fallback';
import { RESTAURANT } from './constants';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://la-cocina-de-jose.vercel.app';

function parseHours(time: string): { opens: string; closes: string } {
  const [start, end] = time.split(/\s*[—–-]\s*/);
  return { opens: start?.trim() ?? '11:00', closes: end?.trim() ?? '23:00' };
}

export function getSiteUrl(): string {
  return SITE_URL;
}

export function buildRestaurantJsonLd() {
  const openingHoursSpecification = RESTAURANT.hours.map((entry) => {
    const { opens, closes } = parseHours(entry.time);
    return {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: entry.day,
      opens,
      closes,
    };
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: RESTAURANT.name,
    description:
      'Comida casera argentina: milanesas, pizzas, pastas y guarniciones. Pedí por WhatsApp y retirá en el local.',
    image: `${SITE_URL}/fotos/la_cocina_de_jose/collage.webp`,
    url: SITE_URL,
    telephone: RESTAURANT.whatsappDisplay,
    servesCuisine: ['Argentina', 'Casera', 'Italiana'],
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: RESTAURANT.address.line1,
      addressLocality: RESTAURANT.address.line2.split(',')[0]?.trim(),
      postalCode: RESTAURANT.address.line2.match(/\d{4,}/)?.[0],
      addressRegion: RESTAURANT.address.locality,
      addressCountry: 'AR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -34.6474199,
      longitude: -58.5652227,
    },
    hasMap: RESTAURANT.googleMapsUrl,
    openingHoursSpecification,
    hasMenu: {
      '@type': 'Menu',
      name: 'Menú del día',
      hasMenuSection: fallbackMenu.map((category) => ({
        '@type': 'MenuSection',
        name: category.title,
        hasMenuItem: category.dishes
          .filter((d) => d.available)
          .map((dish) => ({
            '@type': 'MenuItem',
            name: dish.name,
            description: dish.description,
            offers: {
              '@type': 'Offer',
              price: dish.price,
              priceCurrency: 'ARS',
              availability: 'https://schema.org/InStock',
            },
          })),
      })),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
    },
  };
}

export function buildFaqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cómo hago un pedido?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Elegís los platos del menú, los sumás al carrito y tocás "Finalizar pedido". Te llevamos a WhatsApp con el mensaje listo para enviar a ${RESTAURANT.whatsappDisplay}.`,
        },
      },
      {
        '@type': 'Question',
        name: '¿Hacen deliveries?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Por ahora sólo retiro en el local. Estamos trabajando para sumar envío a domicilio pronto.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuáles son los medios de pago?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Efectivo y transferencia bancaria.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Puedo pedir si no estoy cerca?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El retiro se hace en el local. Consultanos por WhatsApp si necesitás una solución especial.',
        },
      },
    ],
  };
}
