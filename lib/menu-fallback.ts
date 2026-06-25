import type { Category } from '@/types/menu';

/**
 * Fallback estático del menú. Se usa como red de seguridad si la API de
 * Sanity falla, o durante el build local antes de correr la migración.
 *
 * Mantener sincronizado con la versión canónica en Sanity Studio.
 */
export const fallbackMenu: Category[] = [
  {
    id: 'platos',
    title: 'Platos',
    dishes: [
      { id: 'lomo-verdeo', name: 'Lomo al verdeo', description: 'Lomo de ternera en salsa de verdeo con papas españolas.', price: 8000, image: '/fotos/platos/Lomo al verdeo con papas españolas.webp', available: true },
      { id: 'matambre-pizza', name: 'Matambre a la pizza', description: 'Matambre a la pizza con guarnición a elección.', price: 9000, image: '/fotos/platos/matambre a la pizza ponele.webp', available: true },
      { id: 'vacio-fritas', name: 'Vacío con papas fritas', description: 'Vacío a la parrilla con papas fritas crocantes.', price: 12000, image: '/fotos/platos/vacio con papas fritas.webp', available: true },
      { id: 'bife-chorizo', name: 'Bife de chorizo', description: 'Bife de chorizo a la parrilla con guarnición.', price: 12000, image: '/fotos/platos/plato_de_bife_de_chorizo_con_guarnicion.webp', available: true },
      { id: 'bife-costilla', name: 'Bife de costilla', description: 'Bife de costilla a la parrilla con guarnición.', price: 12000, image: '/fotos/platos/bife_de_costilla.webp', available: true },
      { id: 'cuadril', name: 'Churrasco de cuadril', description: 'Churrasco de cuadril a la parrilla con guarnición.', price: 13000, image: '/fotos/platos/cuadril_con_guarnicion.webp', available: true },
      { id: 'escalope', name: 'Escalope', description: 'Escalope de ternera empanado con guarnición.', price: 10000, image: '/fotos/platos/escalope_con_guarnicion.webp', available: true },
      { id: 'tapa-asado', name: 'Tapa de asado', description: 'Tapa de asado a la parrilla con papas al horno.', price: 12000, image: '/fotos/platos/plato_de_carne_asada_con_papas.webp', available: true },
      { id: 'filet-romana', name: 'Filet a la romana', description: 'Filet a la romana acompañado de puré de papas.', price: 12000, image: '/fotos/platos/filet_de_merluza.webp', available: true },
      { id: 'pollo-pizza', name: 'Pollo grille a la pizza', description: 'Suprema de pollo a la pizza con guarnición.', price: 12000, image: '/fotos/platos/pollo_grille_a_la_pizza.webp', available: true },
      { id: 'tallarines', name: 'Tallarines con estofado', description: 'Tallarines frescos con estofado de carne.', price: 8000, image: '/fotos/platos/tallarines_con_estofado_de_carne.webp', available: true },
      { id: 'noquis', name: 'Ñoquis con estofado', description: 'Ñoquis de papa con estofado de carne.', price: 9000, image: '/fotos/platos/gnoquis_con_estofado_de_carne.webp', available: true },
      { id: 'polenta', name: 'Polenta a la bolognesa', description: 'Polenta cremosa con salsa bolognesa.', price: 8000, image: '/fotos/platos/polenta_a_la_bolognesa.webp', available: true },
    ],
  },
  {
    id: 'pizzas',
    title: 'Pizzas',
    dishes: [
      { id: 'pizza-muzzarella', name: 'Muzzarella', description: 'Muzzarella y salsa de tomate sobre masa fresca.', price: 8000, image: '/fotos/platos/pizza_de_muzarella.webp', available: true },
      { id: 'pizza-napolitana', name: 'Napolitana', description: 'Muzzarella, tomate fresco y ajo.', price: 10000, image: '/fotos/platos/pizza_napolitana.webp', available: true },
      { id: 'pizza-jyq', name: 'Jamón y queso', description: 'Muzzarella, jamón cocido y salsa de tomate.', price: 12000, image: '/fotos/platos/pizza_con_jamon_y_queso.webp', available: true },
      { id: 'pizza-huevo', name: 'Huevo', description: 'Muzzarella, huevo y salsa de tomate.', price: 12000, image: '/fotos/platos/pizza_con_huevo_duro.webp', available: true },
      { id: 'pizza-roquefort', name: 'Roquefort', description: 'Muzzarella, queso roquefort y salsa de tomate.', price: 13000, image: '/fotos/platos/pizza_con_queso_roquefort.webp', available: true },
    ],
  },
  {
    id: 'milanesas',
    title: 'Milanesas y supremas',
    dishes: [
      { id: 'mil-napolitana', name: 'Napolitana', description: 'Milanesa napolitana con guarnición.', price: 15000, image: '/fotos/platos/milanesa_napolitana_con_papas.webp', available: true },
      { id: 'mil-suiza', name: 'Suiza', description: 'Milanesa con salsa suiza y guarnición.', price: 15000, image: '/fotos/platos/milanesa_con_salsa_suiza.webp', available: true },
      { id: 'mil-fugazzeta', name: 'Fugazzeta', description: 'Milanesa con queso y cebolla caramelizada.', price: 13000, image: '/fotos/platos/milanesa_con_queso_y_cebolla.webp', available: true },
      { id: 'mil-roquefort', name: 'Roquefort', description: 'Milanesa con queso roquefund derretido.', price: 15000, image: '/fotos/platos/milanesa_con_queso_roquefort_derretido.webp', available: true },
    ],
  },
  {
    id: 'guarniciones',
    title: 'Guarniciones',
    dishes: [
      { id: 'g-papas-fritas', name: 'Papas fritas', description: 'Papas cortadas en bastones y fritas.', price: 3000, image: '/fotos/platos/papas_fritas.webp', available: true },
      { id: 'g-papas-horno', name: 'Papas al horno', description: 'Papas en cubos al horno con hierbas.', price: 3000, image: '/fotos/platos/papas_al_horno.webp', available: true },
      { id: 'g-papas-espanola', name: 'Papas a la española', description: 'Papas en cubos con salsa de tomate.', price: 4000, image: '/fotos/platos/papas_a_la_española.webp', available: true },
      { id: 'g-pure-papas', name: 'Puré de papas', description: 'Puré de papas cremoso con manteca.', price: 4000, image: '/fotos/platos/pure_de_papas.webp', available: true },
      { id: 'g-pure-mixto', name: 'Puré mixto', description: 'Puré de papas y calabaza.', price: 4000, image: '/fotos/platos/pure_mixto.webp', available: true },
      { id: 'g-pure-calabaza', name: 'Puré de calabaza', description: 'Puré de calabaza con manteca.', price: 3000, image: '/fotos/platos/pure_de_calabaza.webp', available: true },
    ],
  },
  {
    id: 'sandwich',
    title: 'Sándwiches',
    dishes: [
      { id: 'sand-milanesa-clasica', name: 'Milanesa clásica', description: 'Milanesa de ternera con lechuga, tomate y mayonesa.', price: 12000, image: '/fotos/platos/sandwich_de_milanesa_con_lechuga_tomate.webp', available: true },
      { id: 'sand-milanesa-completo', name: 'Milanesa completa', description: 'Milanesa con jamón, queso, huevo, lechuga y tomate.', price: 15000, image: '/fotos/platos/sandwich_de_milanesa_completo.webp', available: true },
      { id: 'sand-suprema-completa', name: 'Suprema completa', description: 'Suprema de pollo con jamón, queso, lechuga y tomate.', price: 12000, image: '/fotos/platos/sandwich_de_suprema_completo.webp', available: true },
    ],
  },
];

export function getFallbackCategoryById(id: string): Category | undefined {
  return fallbackMenu.find((c) => c.id === id);
}
