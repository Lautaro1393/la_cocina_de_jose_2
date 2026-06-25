// PostCSS config del Studio. Vite camina hacia arriba buscando configs y
// encuentra el del root (@tailwindcss/postcss) que no es compatible con
// su loader. Este config local lo frena.
//
// Si en el futuro el Studio necesita PostCSS real, expandir acá.
const config = {
  plugins: [],
};

export default config;
