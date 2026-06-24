export const RESTAURANT = {
  name: 'La Cocina de José',
  tagline: 'Comida con sabor a casa',
  whatsappDisplay: '+54 11 6914-6371',
  address: 'Av. Siempre Viva 742, Buenos Aires',
  hours: [
    { day: 'Lunes a jueves', time: '11:00 — 15:00 / 19:30 — 23:30' },
    { day: 'Viernes y sábados', time: '11:00 — 01:00' },
    { day: 'Domingos', time: '11:00 — 16:00' },
  ],
} as const;
