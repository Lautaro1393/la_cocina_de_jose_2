# La Cocina de José

Landing page transaccional mobile-first para un local de comida. El objetivo es reducir la fricción entre ver el menú y hacer el pedido: **cero registros, cero apps, todo termina en un mensaje pre-armado de WhatsApp**.

**Producción:** https://lacocinadejose.vercel.app

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4** (configuración via `@theme` en `app/globals.css`)
- **Zustand** con `persist` middleware (carrito en `localStorage`)
- **lucide-react** para iconos
- **next/font** con Fraunces (display) + Inter (UI)

## Estructura

```
app/
  layout.tsx       Root layout, fonts, metadata
  page.tsx         Landing (Header + Hero + MenuSection + CartDrawer)
  globals.css      Design tokens, glass utilities, animaciones
components/
  layout/          Header, Hero
  menu/            MenuSection, CategoryBlock, DishCard, CategoryTabs
  cart/            CartButton, CartDrawer, CartItem, CheckoutForm
  ui/              Button, PriceTag
lib/
  menu.ts          Mock data (5 categorías, 31 platos)
  format.ts        formatARS() + buildWhatsAppUrl()
  whatsapp.ts      getWhatsAppNumber()
  constants.ts     RESTAURANT info
store/
  cartStore.ts     Zustand store
types/
  menu.ts          Dish, Category, CartLine, CheckoutInfo
public/
  fotos/           Assets del restaurante
```

## Comandos

```bash
pnpm install          # instalar deps
pnpm dev              # http://localhost:3000
pnpm build            # build de producción
pnpm start            # servir el build
pnpm lint             # eslint
```

## Variables de entorno

`.env.local` (no commitear):

```
NEXT_PUBLIC_WA_NUMBER=5491169146371
```

Para producción, el número se inyecta en el build. Editar `lib/whatsapp.ts` o pasar la env var correspondiente.

## Flujo del pedido

1. Cliente navega las categorías y suma platos al carrito (botón `+` en cada `DishCard`).
2. El badge del header muestra la cantidad acumulada.
3. Click en el ícono del carrito → abre `CartDrawer` (sheet lateral).
4. En el drawer: revisar líneas, ajustar cantidades, ver total.
5. "Finalizar pedido" → `CheckoutForm` con nombre, método de pago, aclaraciones.
6. Submit → arma la URL `https://wa.me/...` y la abre en nueva pestaña con el texto estructurado.

## Pendiente (backlog)

- Integración con **Sanity** (esquema `dailyMenu` ya definido en `Design.md`).
- Sección de **reseñas** de Google.
- **Footer** completo con mapa, horarios reales, link a Google Maps.
- **PWA manifest** + service worker.
- Deploy a **Vercel** con env vars.
- Accesibilidad profunda (focus trap real en el drawer, skip links).
- Tests con **Vitest** + **Testing Library**.

