/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './templates/**/*.html', // Caminho para seus templates do Django
    './static/js/**/*.js',   // Caminho para seus arquivos JS (se houver)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
