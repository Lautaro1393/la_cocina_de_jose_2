# Design: Arquitectura y UI/UX

## 1. Stack Tecnológico
- **Frontend:** Next.js (App Router) + React.
- **Estilos:** Tailwind CSS (ideal para maquetado rápido y responsive).
- **Backend/CMS:** Sanity.io (Capa gratuita, perfecto para gestión de imágenes on-the-fly).
- **Estado del Carrito:** Zustand o React Context (Zustand recomendado por menor boilerplate).
- **APIs Externas:** Google Places API (para extraer reseñas y rating).

## 2. Estructura de la Interfaz (Single Page)
- **Sticky Header:** Logo minimalista a la izquierda, ícono de carrito a la derecha con un *badge* de cantidad.
- **Hero Section:** Foto del frente del local o un plato estrella de fondo, título "La Cocina de José" y un botón CTA grande: "Ver Menú de Hoy".
- **Sección Menú (Sanity):** 
  - Grid de 1 columna para celulares. 
  - Tarjetas limpias: Imagen superior, título, precio destacado y botón grande de "Agregar +".
- **Sección Reseñas:** 3 tarjetas horizontales estáticas (o scroll horizontal) con las estrellas y comentarios reales de Google.
- **Footer:** Mapa embebido, dirección en texto (copiable), horarios detallados y botón directo a WhatsApp por consultas generales.

## 3. Modelo de Datos (Sanity Schema)
Esquema `dailyMenu`:
- `name` (String) - Ej: "Milanesa Napolitana con fritas"
- `price` (Number) - Ej: 8500
- `image` (Image) - Con *hotspot* habilitado en Sanity para recortes automáticos.
- `isAvailable` (Boolean) - Toggle rápido para ocultar el plato si se quedan sin stock en el local.

## 4. Lógica de WhatsApp (Generador de URL)
El carrito recopilará los datos y construirá la URL utilizando `encodeURIComponent`.
**Formato de salida esperado:**
`https://wa.me/54911XXXXXXXX?text=Hola%20soy%20[Nombre]%20y%20quiero%20ordenar:%0A-%20[Cant]%20[Plato]%0A-%20[Cant]%20[Plato]%0APago%20en%20[Efectivo/Transferencia]%20y%20retiro%20en%20el%20local.`