export const RESTAURANT = {
  name: 'La Cocina de José',
  tagline: 'Comida con sabor a casa',
  whatsappDisplay: '+54 11 6914-6371',
  whatsappRaw: '5491169146371',
  address: {
    line1: 'Av. Brig. Gral. Juan Manuel de Rosas 459',
    line2: 'Lomas del Mirador, B1752',
    locality: 'Provincia de Buenos Aires',
    full: 'Av. Brig. Gral. Juan Manuel de Rosas 459, B1752 Lomas del Mirador, Provincia de Buenos Aires, Argentina',
  },
  googleMapsUrl: 'https://maps.app.goo.gl/p36WtFbdBpv3zMyv9',
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Av.+Brig.+Gral.+Juan+Manuel+de+Rosas+459,+Lomas+del+Mirador&output=embed',
  hours: [{ day: 'Lunes a viernes', time: '09:00 — 15:30' }],
  studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
} as const;
