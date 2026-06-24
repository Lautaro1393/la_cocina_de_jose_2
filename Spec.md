# Spec: La Cocina de José (Revamp)

## 1. Objetivo del Proyecto
Desarrollar una landing page transaccional, 100% mobile-first para "La Cocina de José". El objetivo principal es reducir la fricción entre que el cliente ve el menú del día y hace el pedido. Cero registros, cero descargas de apps; todo termina en un mensaje estructurado de WhatsApp.

## 2. Casos de Uso (User Journey)
1. El cliente accede a la web desde su smartphone.
2. Encuentra la información vital en el primer pantallazo (Estado Abierto/Cerrado, Dirección, Horarios).
3. Visualiza el "Menú del Día" con fotos reales y precios actualizados.
4. Agrega los platos deseados a un carrito flotante.
5. Procede al checkout: ingresa su nombre, método de pago y formato de entrega (retiro en local).
6. Es redirigido a WhatsApp con un mensaje pre-armado listo para enviar.

## 3. Features Principales (MVP)
- **UI Mobile-First:** Interfaz optimizada para pulgares. Carga ultrarrápida.
- **Sin Autenticación:** Prohibido pedir login.
- **Información del Local:** Dirección (con link directo a la app de Google Maps), teléfono, WhatsApp y horarios de atención.
- **Menú Dinámico (CMS):** Alimentado por Sanity.io para que la administración suba platos, fotos y precios desde el celular en 3 clics.
- **Carrito de Compras (Local):** Memoria de sesión simple para sumar/restar platos. 
- **Generador de Pedidos (WhatsApp Checkout):** Conversión del carrito a un string de texto formateado mediante la API de wa.me.
- **Social Proof:** Integración de reseñas destacadas de Google Maps para dar confianza.